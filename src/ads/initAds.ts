import { useEffect, useState } from 'react';
import mobileAds, { AdsConsent, AdsConsentPrivacyOptionsRequirementStatus } from 'react-native-google-mobile-ads';
import { ADS_ENABLED } from './config';

let startPromise: Promise<boolean> | null = null;

/**
 * Gather UMP consent (shows the Google consent form in the EEA/UK when required),
 * then initialise the SDK. Resolves true when ads may be requested.
 */
export function initAds(): Promise<boolean> {
    if (!ADS_ENABLED) return Promise.resolve(false);
    if (!startPromise) {
        startPromise = (async () => {
            try {
                await AdsConsent.gatherConsent();
            } catch {
                // Consent failure: fall through and trust any previously stored state.
            }
            try {
                const info = await AdsConsent.getConsentInfo();
                if (!info.canRequestAds) return false;
                await mobileAds().initialize();
                return true;
            } catch {
                return false;
            }
        })();
    }
    return startPromise;
}

/** True once consent is resolved and the SDK is ready for ad requests. */
export function useAdsReady(): boolean {
    const [ready, setReady] = useState(false);
    useEffect(() => {
        let alive = true;
        initAds().then(ok => { if (alive) setReady(ok); });
        return () => { alive = false; };
    }, []);
    return ready;
}

/** Whether the user must be offered a way to change their ad consent choice. */
export async function privacyOptionsRequired(): Promise<boolean> {
    if (!ADS_ENABLED) return false;
    try {
        const info = await AdsConsent.getConsentInfo();
        return info.privacyOptionsRequirementStatus === AdsConsentPrivacyOptionsRequirementStatus.REQUIRED;
    } catch {
        return false;
    }
}

export const showPrivacyOptions = () => AdsConsent.showPrivacyOptionsForm().catch(() => { });
