import { Platform } from 'react-native';
import { TestIds } from 'react-native-google-mobile-ads';

/** Ads run on both Android and iOS. */
export const ADS_ENABLED = Platform.OS === 'android' || Platform.OS === 'ios';

const PROD_NATIVE_AD_UNIT_ID = Platform.select({
    ios: 'ca-app-pub-8048322787870165/4533767562',
    default: 'ca-app-pub-8048322787870165/1386915388',
})!;

// Always use Google's test ad units in development builds to avoid invalid traffic.
export const NATIVE_AD_UNIT_ID = __DEV__ ? TestIds.NATIVE : PROD_NATIVE_AD_UNIT_ID;

// Banner unit supplied for Android. Add an iOS unit ID here before shipping the banner on iOS.
const PROD_BANNER_AD_UNIT_ID = Platform.select({
    ios: undefined,
    default: 'ca-app-pub-8048322787870165/8340687617',
});

export const BANNER_AD_UNIT_ID: string | undefined = __DEV__ ? TestIds.BANNER : PROD_BANNER_AD_UNIT_ID;
