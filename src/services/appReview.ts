/**
 * In-app review (iOS App Store + Google Play) via `expo-store-review`.
 *
 * Call `requestAppReview` only right after a positive moment (a finished jaap round,
 * a completed sankalp, reading the whole Chalisa). It decides by itself whether to
 * prompt, so callers can fire it freely:
 *   - at most once every 90 days (timestamp in AsyncStorage),
 *   - native review sheet when the OS supports it,
 *   - otherwise a polite "Rate us?" dialog that opens the store listing.
 *
 * The OS also throttles the native sheet (Apple: 3×/year; Google: undisclosed quota),
 * and it may silently not appear. That's expected — never build UI that depends on it.
 */
import { Alert, Linking, Platform } from 'react-native';
import * as StoreReview from 'expo-store-review';
import { isReviewPromptDue, setLastReviewPromptAt } from '../utils/reviewStorage';

// TODO: replace with the real App Store ID (numbers only) once the iOS app is published.
const IOS_APP_STORE_ID = 'YOUR_APP_STORE_ID';
const ANDROID_PACKAGE = 'com.kapildevpal.hanuman_chalisa';

const STORE_URLS = Platform.select({
    ios: {
        app: `itms-apps://apps.apple.com/app/id${IOS_APP_STORE_ID}?action=write-review`,
        web: `https://apps.apple.com/app/id${IOS_APP_STORE_ID}?action=write-review`,
    },
    android: {
        app: `market://details?id=${ANDROID_PACKAGE}&showAllReviews=true`,
        web: `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE}&showAllReviews=true`,
    },
});

const hasStoreListing = () =>
    !!STORE_URLS && !(Platform.OS === 'ios' && IOS_APP_STORE_ID === 'YOUR_APP_STORE_ID');

/** Text for the fallback dialog, so callers can pass translated strings. */
export interface ReviewFallbackCopy {
    title: string;
    message: string;
    rate: string;
    later: string;
}

/** Opens the store page (store app first, then browser). Returns false if nothing could be opened. */
export async function openStoreListing(): Promise<boolean> {
    if (!STORE_URLS || !hasStoreListing()) return false;
    try {
        await Linking.openURL(STORE_URLS.app);
        return true;
    } catch {
        // Store app missing (e.g. no Play Store on the device) — try the website.
        try {
            await Linking.openURL(STORE_URLS.web);
            return true;
        } catch (error) {
            console.warn('[Review] Could not open store listing', error);
            return false;
        }
    }
}

/**
 * Asks for a review if it's been 90+ days since the last ask. Never throws.
 * Returns true when a prompt (native sheet or fallback dialog) was shown.
 */
export async function requestAppReview(fallback?: ReviewFallbackCopy): Promise<boolean> {
    try {
        if (!(await isReviewPromptDue())) return false;

        if (await StoreReview.isAvailableAsync()) {
            // Record first: the OS gives no callback and may not show the sheet at all.
            await setLastReviewPromptAt();
            await StoreReview.requestReview();
            return true;
        }

        // Native review isn't available (old OS, no Play Services, Expo Go…).
        // Never jump to the store unasked — offer it, and let the user decide.
        if (!fallback || !hasStoreListing()) return false;
        await setLastReviewPromptAt();
        Alert.alert(fallback.title, fallback.message, [
            { text: fallback.later, style: 'cancel' },
            { text: fallback.rate, onPress: () => { openStoreListing(); } },
        ]);
        return true;
    } catch (error) {
        console.warn('[Review] Failed to request app review', error);
        return false;
    }
}
