import AsyncStorage from '@react-native-async-storage/async-storage';

const LAST_PROMPT_KEY = 'review_last_prompt_at';
/** Written by app versions ≤ 1.7, which only ever asked once per install. */
const LEGACY_REQUESTED_KEY = 'review_already_requested';

export const REVIEW_INTERVAL_MS = 90 * 24 * 60 * 60 * 1000; // 90 days

/** Timestamp (ms) of the last review prompt, or null if the user was never asked. */
export async function getLastReviewPromptAt(): Promise<number | null> {
    try {
        const raw = await AsyncStorage.getItem(LAST_PROMPT_KEY);
        if (raw) {
            const value = Number(raw);
            return Number.isFinite(value) ? value : null;
        }
        // Migrate users already asked by the old one-time logic: start their 90 days now
        // rather than prompting them again on the first positive action after updating.
        if (await AsyncStorage.getItem(LEGACY_REQUESTED_KEY)) {
            const now = Date.now();
            await AsyncStorage.setItem(LAST_PROMPT_KEY, String(now));
            await AsyncStorage.removeItem(LEGACY_REQUESTED_KEY);
            return now;
        }
        return null;
    } catch (error) {
        console.warn('[Review] Failed to read last prompt time', error);
        return null;
    }
}

export async function setLastReviewPromptAt(timestamp: number = Date.now()): Promise<void> {
    try {
        await AsyncStorage.setItem(LAST_PROMPT_KEY, String(timestamp));
    } catch (error) {
        console.warn('[Review] Failed to save last prompt time', error);
    }
}

/** True when the user has never been asked, or was last asked at least 90 days ago. */
export async function isReviewPromptDue(now: number = Date.now()): Promise<boolean> {
    const last = await getLastReviewPromptAt();
    return last === null || now - last >= REVIEW_INTERVAL_MS;
}
