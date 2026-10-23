/**
 * Google Play In-App Updates (Android, flexible flow).
 *
 * Wraps `sp-react-native-in-app-updates` behind a small API. The native module is
 * loaded lazily so the app keeps working where it doesn't exist: iOS, web and
 * Expo Go (which can't include custom native code). In those cases every call is a no-op.
 *
 * Play only reports updates for builds installed from Google Play (including the
 * internal testing track / internal app sharing). Sideloaded or dev builds get an
 * error from Play, which `checkForFlexibleUpdate` turns into "no update".
 */
import { Platform } from 'react-native';
import Constants, { ExecutionEnvironment } from 'expo-constants';
import type SpInAppUpdates from 'sp-react-native-in-app-updates';
import type { AndroidNeedsUpdateResponse, StatusUpdateEvent } from 'sp-react-native-in-app-updates';

// Play Core constants (stable public values). Declared here so the module itself
// isn't imported eagerly, which would throw where the native side is missing.
const UPDATE_TYPE_FLEXIBLE = 0;
const INSTALL_STATUS = {
    PENDING: 1,
    DOWNLOADING: 2,
    INSTALLING: 3,
    INSTALLED: 4,
    FAILED: 5,
    CANCELED: 6,
    DOWNLOADED: 11,
} as const;

export type UpdateDownloadStatus = 'pending' | 'downloading' | 'downloaded' | 'installing' | 'installed' | 'failed' | 'canceled';

export interface UpdateProgress {
    status: UpdateDownloadStatus;
    bytesDownloaded: number;
    totalBytes: number;
}

const toStatus = (code: number): UpdateDownloadStatus | null => {
    switch (code) {
        case INSTALL_STATUS.PENDING: return 'pending';
        case INSTALL_STATUS.DOWNLOADING: return 'downloading';
        case INSTALL_STATUS.DOWNLOADED: return 'downloaded';
        case INSTALL_STATUS.INSTALLING: return 'installing';
        case INSTALL_STATUS.INSTALLED: return 'installed';
        case INSTALL_STATUS.FAILED: return 'failed';
        case INSTALL_STATUS.CANCELED: return 'canceled';
        default: return null;
    }
};

let client: SpInAppUpdates | null | undefined;

function getClient(): SpInAppUpdates | null {
    if (client !== undefined) return client;
    client = null;
    if (Platform.OS !== 'android' || Constants.executionEnvironment === ExecutionEnvironment.StoreClient) {
        return client;
    }
    try {
        const { default: InAppUpdates } = require('sp-react-native-in-app-updates');
        client = new InAppUpdates(false) as SpInAppUpdates;
    } catch (error) {
        console.warn('[InAppUpdates] Native module unavailable; updates disabled.', error);
    }
    return client;
}

/** The installed build's versionCode. Read natively because EAS manages it remotely (app.json is stale). */
function getInstalledVersionCode(): string {
    const { getBuildNumber } = require('react-native-device-info');
    return getBuildNumber();
}

export const inAppUpdates = {
    isSupported(): boolean {
        return getClient() !== null;
    },

    /** Resolves true when Play has a newer version that can be downloaded as a flexible update. Never throws. */
    async checkForFlexibleUpdate(): Promise<boolean> {
        const c = getClient();
        if (!c) return false;
        try {
            const result = (await c.checkNeedsUpdate({ curVersion: getInstalledVersionCode() })) as AndroidNeedsUpdateResponse;
            return result.shouldUpdate && result.other?.isFlexibleUpdateAllowed === true;
        } catch (error) {
            console.warn('[InAppUpdates] Update check failed', error);
            return false;
        }
    },

    /** Opens Play's flexible-update consent sheet; the download then continues in the background. */
    async startFlexibleUpdate(): Promise<void> {
        const c = getClient();
        if (!c) return;
        await c.startUpdate({ updateType: UPDATE_TYPE_FLEXIBLE });
    },

    /** Subscribes to download/install progress. Returns an unsubscribe function. */
    onProgress(listener: (progress: UpdateProgress) => void): () => void {
        const c = getClient();
        if (!c) return () => { };
        const handler = (event: StatusUpdateEvent) => {
            const status = toStatus(event.status);
            if (status) {
                listener({ status, bytesDownloaded: event.bytesDownloaded ?? 0, totalBytes: event.totalBytesToDownload ?? 0 });
            }
        };
        c.addStatusUpdateListener(handler);
        return () => c.removeStatusUpdateListener(handler);
    },

    /** Installs a downloaded flexible update. Play restarts the app. */
    completeUpdate(): void {
        try {
            getClient()?.installUpdate();
        } catch (error) {
            console.warn('[InAppUpdates] Failed to install update', error);
        }
    },
};
