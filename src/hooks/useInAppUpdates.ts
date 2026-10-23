import { useCallback, useEffect, useRef } from 'react';
import { Alert } from 'react-native';
import { inAppUpdates } from '../services/inAppUpdates';
import { useT } from './useT';

type Translate = ReturnType<typeof useT>['T'];

// Module-level so remounts (e.g. fast refresh, provider changes) never prompt twice in one session.
let checkedThisSession = false;
// One flow at a time: a download started at launch shouldn't be restarted from Settings.
let flowInProgress = false;

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
        runFlexibleUpdateFlow(() => tRef.current, false);
    }, [checkOnLaunch]);

    const checkForUpdates = useCallback(() => runFlexibleUpdateFlow(() => tRef.current, true), []);

    return {
        isSupported: inAppUpdates.isSupported(),
        checkForUpdates,
    };
}
