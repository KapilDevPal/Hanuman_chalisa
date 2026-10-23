import React from 'react';
import { View, Text, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAudio } from '../context/AudioContext';
import { useTheme } from '../context/ThemeContext';
import { useT } from '../hooks/useT';

export const AudioScreen = () => {
    const {
        isPlaying,
        position,
        duration,
        togglePlayPause,
        skipForward,
        skipBackward
    } = useAudio();
    const { colors } = useTheme();
    const { T } = useT();
    const { width } = useWindowDimensions();
    const insets = useSafeAreaInsets();
    const coverSize = Math.min(width - 64, 360);

    const formatTime = (millis: number) => {
        if (!millis || isNaN(millis)) return '0:00';
        const totalSeconds = millis / 1000;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.floor(totalSeconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const progressPercent = duration > 0 ? (position / duration) * 100 : 0;

    return (
        <View style={{ flex: 1, backgroundColor: colors.background, paddingHorizontal: 32, paddingTop: insets.top + 64, paddingBottom: insets.bottom + 24, justifyContent: 'center' }}>
            {/* Cover Art */}
            <Image
                source={require('../../assets/images/hanuman_cover.png')}
                style={{ width: coverSize, height: coverSize, borderRadius: 24, alignSelf: 'center', marginBottom: 40 }}
                resizeMode="cover"
            />

            {/* Track Info */}
            <Text style={{ fontSize: 24, fontWeight: '800', color: colors.text }}>Shree Hanuman Chalisa</Text>
            <Text style={{ fontSize: 15, color: colors.textMuted, marginTop: 4 }}>{T('home_divine_chanting')}</Text>

            {/* Progress Bar */}
            <View style={{ marginTop: 28 }}>
                <View style={{ height: 4, backgroundColor: colors.surfaceAlt, borderRadius: 2, overflow: 'hidden' }}>
                    <View style={{ height: 4, width: `${progressPercent}%`, backgroundColor: colors.primary }} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                    <Text style={{ fontSize: 12, color: colors.textMuted, fontVariant: ['tabular-nums'] }}>{formatTime(position)}</Text>
                    <Text style={{ fontSize: 12, color: colors.textMuted, fontVariant: ['tabular-nums'] }}>{formatTime(duration)}</Text>
                </View>
            </View>

            {/* Controls */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 24, gap: 40 }}>
                <TouchableOpacity onPress={skipBackward} hitSlop={12} accessibilityLabel="Skip back">
                    <Ionicons name="play-back" size={32} color={colors.text} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={togglePlayPause}
                    accessibilityLabel={isPlaying ? 'Pause' : 'Play'}
                    style={{ width: 76, height: 76, borderRadius: 38, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' }}
                >
                    <Ionicons name={isPlaying ? 'pause' : 'play'} size={36} color={colors.onPrimary} style={{ marginLeft: isPlaying ? 0 : 4 }} />
                </TouchableOpacity>

                <TouchableOpacity onPress={skipForward} hitSlop={12} accessibilityLabel="Skip forward">
                    <Ionicons name="play-forward" size={32} color={colors.text} />
                </TouchableOpacity>
            </View>
        </View>
    );
};
