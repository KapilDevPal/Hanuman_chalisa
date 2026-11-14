import mobileAds from 'react-native-google-mobile-ads';
import { ADS_ENABLED } from './config';

let started = false;

/** Initialise the Google Mobile Ads SDK once. Safe to call repeatedly. */
export function initAds() {
    if (!ADS_ENABLED || started) return;
    started = true;
    mobileAds().initialize().catch(() => { });
}
