import * as StoreReview from 'expo-store-review';
import AsyncStorage from '@react-native-async-storage/async-storage';

const REVIEW_REQUESTED_KEY = 'review_already_requested';

/**
 * Asks Android for the native Play in-app review dialog (or the iOS
 * equivalent) at a moment of accomplishment — e.g. finishing a Jaap round
 * or completing a Sankalp. Google throttles how often the dialog can
 * actually appear regardless, but we still only ever *ask* once per
 * install so we don't hammer a feature that isn't guaranteed to show UI.
 */
export async function maybeRequestReview(): Promise<void> {
    try {
        const alreadyRequested = await AsyncStorage.getItem(REVIEW_REQUESTED_KEY);
        if (alreadyRequested) return;

        const isAvailable = await StoreReview.isAvailableAsync();
        if (!isAvailable) return;

        await AsyncStorage.setItem(REVIEW_REQUESTED_KEY, 'true');
        await StoreReview.requestReview();
    } catch (error) {
        console.warn('Failed to request app review', error);
    }
}
