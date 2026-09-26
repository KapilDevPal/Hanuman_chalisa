import { Platform } from 'react-native';
import { isRunningInExpoGo } from 'expo';
import type * as NotificationsTypes from 'expo-notifications';

/**
 * expo-notifications throws on import when running on Android inside Expo Go
 * (remote push support was removed from Expo Go in SDK 53 — see
 * https://docs.expo.dev/develop/development-builds/introduction/). That
 * throw happens as a module-level side effect, so it crashes the whole
 * bundle ("Runtime not ready") before any of our own try/catch can run.
 * We only `require` the module when it's actually safe to do so, and the
 * rest of the app treats a `null` module as "notifications unavailable".
 */
export const isNotificationsUnsupported = isRunningInExpoGo() && Platform.OS === 'android';

export const Notifications: typeof NotificationsTypes | null = isNotificationsUnsupported
    ? null
    : (require('expo-notifications') as typeof NotificationsTypes);
