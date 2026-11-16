import React, { useState } from 'react';
import { View } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { useTheme } from '../context/ThemeContext';
import { useAdsReady } from '../ads/initAds';
import { ADS_ENABLED, BANNER_AD_UNIT_ID } from '../ads/config';

/**
 * Anchored adaptive banner. Collapses to nothing until an ad has loaded, so no
 * empty gap is left when there is no fill.
 */
const LoadedBanner = ({ unitId }: { unitId: string }) => {
    const { colors } = useTheme();
    const ready = useAdsReady();
    const [loaded, setLoaded] = useState(false);

    if (!ready) return null;

    return (
        <View
            style={{
                backgroundColor: colors.background,
                alignItems: 'center',
                borderTopWidth: loaded ? 1 : 0,
                borderTopColor: colors.border,
                height: loaded ? undefined : 0,
                overflow: 'hidden',
            }}
        >
            <BannerAd
                unitId={unitId}
                size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                onAdLoaded={() => setLoaded(true)}
                onAdFailedToLoad={() => setLoaded(false)}
            />
        </View>
    );
};

export const BannerAdBar = () =>
    ADS_ENABLED && BANNER_AD_UNIT_ID ? <LoadedBanner unitId={BANNER_AD_UNIT_ID} /> : null;
