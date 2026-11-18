import { useCallback, useEffect, useRef } from 'react';
import { Alert, AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { inAppUpdates } from '../services/inAppUpdates';
import { useT } from './useT';

type Translate = ReturnType<typeof useT>['T'];

// Module-level so remounts (e.g. fast refresh, provider changes) never prompt twice in one session.
let checkedThisSession = false;
// One flow at a time: a download started at launch shouldn't be restarted from Settings.
let flowInProgress = false;
// Set when a download finished while the app was backgrounded (an Alert can't show then).
// Persisted so it also survives the process being killed before the user returns.
const PENDING_RESTART_KEY = 'inapp_update_pending_restart';

/**
 * "Update Now / Later" → background download → "Restart Now / Later".
 * `manual` is for a user-initiated check: it also reports "you're up to date".
 * If the user picks "Later" after the download, Play installs the update on its own
 * the next time the app is closed.
 */
async function runFlexibleUpdateFlow(getT: () => Translate, manual: boolean): Promise<void> {
    if (flowInProgress) return;
    flowInProgress = true;

    let unsubscribe = () => { };
    let restartPrompted = false;
    let failureReported = false;
    const finish = () => {
        unsubscribe();
        flowInProgress = false;
    };

    const promptRestart = () => {
        if (restartPrompted) return;
        restartPrompted = true;
        if (AppState.currentState !== 'active') {
            // Downloaded in the background: prompt when the user comes back.
            AsyncStorage.setItem(PENDING_RESTART_KEY, '1').catch(() => { });
            finish();
            return;
        }
        const t = getT();
        Alert.alert(t('update_ready_title'), t('update_ready_message'), [
            { text: t('update_later'), style: 'cancel', onPress: finish },
            { text: t('update_restart'), onPress: () => { finish(); inAppUpdates.completeUpdate(); } },
        ], { cancelable: false });
    };

    const reportFailure = () => {
        if (failureReported) return;
        failureReported = true;
        finish();
        const t = getT();
        Alert.alert(t('update_title'), t('update_failed'));
    };

    const startDownload = async () => {
        unsubscribe = inAppUpdates.onProgress(({ status }) => {
            if (status === 'downloaded') promptRestart();
            else if (status === 'failed') reportFailure();
            else if (status === 'canceled') finish();
        });
        try {
            await inAppUpdates.startFlexibleUpdate();
        } catch (error) {
            console.warn('[InAppUpdates] Could not start update', error);
            reportFailure();
        }
    };

    const available = await inAppUpdates.checkForFlexibleUpdate();
    const t = getT();
    if (!available) {
        finish();
        if (manual) Alert.alert(t('update_check'), t('update_none'));
        return;
    }
    Alert.alert(t('update_title'), t('update_message'), [
        { text: t('update_later'), style: 'cancel', onPress: finish },
        { text: t('update_now'), onPress: startDownload },
    ], { cancelable: false });
}

/**
 * Shows "Restart now?" if an update finished downloading while the app was in the background.
 * Resolves true when it handled (or showed) the prompt, so callers can skip a fresh update check.
 */
async function promptPendingRestart(getT: () => Translate): Promise<boolean> {
    if (flowInProgress || AppState.currentState !== 'active') return false;
    const pending = await AsyncStorage.getItem(PENDING_RESTART_KEY).catch(() => null);
    if (!pending) return false;
    // The flag is stale if the update was already installed or abandoned.
    if (!(await inAppUpdates.isUpdateInProgress())) {
        AsyncStorage.removeItem(PENDING_RESTART_KEY).catch(() => { });
        return false;
    }
    if (flowInProgress) return true;
    flowInProgress = true;
    AsyncStorage.removeItem(PENDING_RESTART_KEY).catch(() => { });
    const t = getT();
    Alert.alert(t('update_ready_title'), t('update_ready_message'), [
        { text: t('update_later'), style: 'cancel', onPress: () => { flowInProgress = false; } },
        { text: t('update_restart'), onPress: () => { flowInProgress = false; inAppUpdates.completeUpdate(); } },
    ], { cancelable: false });
    return true;
}

/**
 * Google Play flexible in-app updates (Android builds from Play; no-op in Expo Go / iOS).
 *
 * In the root component, `useInAppUpdates(ready)` checks once per session after the
 * splash screen. Anywhere else, `useInAppUpdates(false)` just exposes `checkForUpdates`
 * for a "Check for updates" button.
 */
export function useInAppUpdates(checkOnLaunch: boolean = false) {
    const { T } = useT();
    // Latest translator for callbacks that fire long after the effect ran
    const tRef = useRef(T);
    tRef.current = T;

    useEffect(() => {
        if (!checkOnLaunch || checkedThisSession || !inAppUpdates.isSupported()) return;
        checkedThisSession = true;
        promptPendingRestart(() => tRef.current).then(handled => {
            if (!handled) runFlexibleUpdateFlow(() => tRef.current, false);
        });
    }, [checkOnLaunch]);

    // Resume check: a download that finished while backgrounded prompts for restart on return.
    useEffect(() => {
        if (!checkOnLaunch || !inAppUpdates.isSupported()) return;
        const sub = AppState.addEventListener('change', state => {
            if (state === 'active') promptPendingRestart(() => tRef.current);
        });
        return () => sub.remove();
    }, [checkOnLaunch]);

    const checkForUpdates = useCallback(() => runFlexibleUpdateFlow(() => tRef.current, true), []);

    return {
        isSupported: inAppUpdates.isSupported(),
        checkForUpdates,
    };
}
