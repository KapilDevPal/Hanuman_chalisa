import React from 'react';
import { View, Text, Image } from 'react-native';
import {
    NativeAdView, NativeAsset, NativeAssetType, NativeMediaView, useNativeAd,
} from 'react-native-google-mobile-ads';
import { useTheme } from '../context/ThemeContext';
import { RADIUS } from './ui';
import { ADS_ENABLED, NATIVE_AD_UNIT_ID } from '../ads/config';

/**
 * AdMob native advanced ad styled to match the app. Renders nothing until an ad
 * has loaded, so there is no empty gap when there is no fill.
 * Policy: the "Ad" badge is always shown and the ad is never styled as app content.
 */
const LoadedAd = () => {
    const { colors } = useTheme();
    const { status, nativeAd } = useNativeAd({ adUnitId: NATIVE_AD_UNIT_ID });

    if (status !== 'loaded' || !nativeAd) return null;

    return (
        <NativeAdView
            nativeAd={nativeAd}
            style={{
                backgroundColor: colors.surface,
                borderRadius: RADIUS,
                padding: 14,
                marginVertical: 12,
                borderWidth: 1,
                borderColor: colors.border,
            }}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ backgroundColor: '#FFB300', borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2, marginRight: 8 }}>
                    <Text style={{ fontSize: 11, fontWeight: '800', color: '#000' }}>Ad</Text>
                </View>
                {nativeAd.icon && (
                    <NativeAsset assetType={NativeAssetType.ICON}>
                        <Image source={{ uri: nativeAd.icon.url }} style={{ width: 36, height: 36, borderRadius: 8, marginRight: 10 }} />
                    </NativeAsset>
                )}
                <View style={{ flex: 1 }}>
                    <NativeAsset assetType={NativeAssetType.HEADLINE}>
                        <Text style={{ fontSize: 15, fontWeight: '700', color: colors.text }} numberOfLines={1}>
                            {nativeAd.headline}
                        </Text>
                    </NativeAsset>
                </View>
            </View>

            <NativeMediaView style={{ width: '100%', height: 180, marginTop: 10, borderRadius: 10, overflow: 'hidden' }} />

            {!!nativeAd.body && (
                <NativeAsset assetType={NativeAssetType.BODY}>
                    <Text style={{ fontSize: 13, color: colors.textMuted, marginTop: 8 }} numberOfLines={3}>
                        {nativeAd.body}
                    </Text>
                </NativeAsset>
            )}

            {!!nativeAd.callToAction && (
                <NativeAsset assetType={NativeAssetType.CALL_TO_ACTION}>
                    <Text
                        style={{
                            marginTop: 10, textAlign: 'center', overflow: 'hidden', borderRadius: 10,
                            backgroundColor: colors.primary, color: '#fff', fontWeight: '700',
                            paddingVertical: 10, fontSize: 14,
                        }}
                    >
                        {nativeAd.callToAction}
                    </Text>
                </NativeAsset>
            )}
        </NativeAdView>
    );
};

export const NativeAdCard = () => (ADS_ENABLED ? <LoadedAd /> : null);
