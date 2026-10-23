import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import { useT } from '../hooks/useT';
import { Screen, Button } from '../components/ui';
import { useInAppReview } from '../hooks/useInAppReview';

export const SankalpScreen = () => {
    const { sankalp, startSankalp, updateSankalpProgress, resetSankalp } = useUser();
    const { colors } = useTheme();
    const { T } = useT();
    const { requestReviewAfterSuccess } = useInAppReview();

    useEffect(() => {
        if (sankalp.active && sankalp.duration > 0 && sankalp.daysCompleted === sankalp.duration) {
            // Positive moment: the whole sankalp is complete
            requestReviewAfterSuccess();
        }
    }, [sankalp.active, sankalp.daysCompleted, sankalp.duration]);

    const handleStart = (days: number) => {
        Alert.alert(
            T('sankalp_confirm'),
            T('sankalp_pledge', { days }),
            [
                { text: T('sankalp_cancel'), style: 'cancel' },
                { text: T('sankalp_yes_pledge'), onPress: () => startSankalp(days) }
            ]
        );
    };

    const handleMarkComplete = () => {
        Alert.alert(
            T('sankalp_daily_q'),
            T('sankalp_done_today'),
            [
                { text: T('sankalp_no'), style: 'cancel' },
                { text: T('sankalp_yes'), onPress: updateSankalpProgress }
            ]
        );
    };

    const handleReset = () => {
        Alert.alert(T('sankalp_reset_title'), T('sankalp_reset_q'), [
            { text: T('sankalp_cancel'), style: 'cancel' },
            { text: T('sankalp_reset_btn'), style: 'destructive', onPress: resetSankalp }
        ]);
    };

    if (!sankalp.active) {
        return (
            <Screen contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                <Text style={{ fontSize: 26, fontWeight: '800', color: colors.text, textAlign: 'center' }}>{T('sankalp_new')}</Text>
                <Text style={{ fontSize: 15, color: colors.textMuted, textAlign: 'center', marginTop: 6, marginBottom: 32 }}>{T('sankalp_choose')}</Text>
                <View style={{ flexDirection: 'row', gap: 12 }}>
                    {[11, 21, 40].map(days => (
                        <TouchableOpacity
                            key={days}
                            onPress={() => handleStart(days)}
                            activeOpacity={0.7}
                            style={{
                                flex: 1, aspectRatio: 0.85, borderRadius: 20, borderWidth: 1, borderColor: colors.border,
                                backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center',
                            }}
                        >
                            <Text style={{ fontSize: 36, fontWeight: '800', color: colors.primary }}>{days}</Text>
                            <Text style={{ fontSize: 14, color: colors.textMuted, marginTop: 2 }}>{T('sankalp_days')}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </Screen>
        );
    }

    const isDone = sankalp.daysCompleted === sankalp.duration;

    return (
        <Screen contentContainerStyle={{ flexGrow: 1, alignItems: 'center', paddingTop: 32 }}>
            <Text style={{ fontSize: 15, color: colors.textMuted }}>{T('sankalp_progress')}</Text>
            <View
                style={{
                    width: 200, height: 200, borderRadius: 100, borderWidth: 8, borderColor: colors.primary,
                    backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center', marginVertical: 32,
                }}
            >
                <Text style={{ fontSize: 60, fontWeight: '800', color: colors.text, fontVariant: ['tabular-nums'] }}>{sankalp.daysCompleted}</Text>
                <Text style={{ fontSize: 18, color: colors.textMuted, marginTop: -4 }}>/ {sankalp.duration}</Text>
            </View>
            <Text style={{ fontSize: 17, fontWeight: '600', color: colors.text, textAlign: 'center', marginBottom: 28 }}>
                {isDone ? T('sankalp_completed') : T('sankalp_going')}
            </Text>
            {!isDone && (
                <Button title={T('sankalp_mark')} icon="checkmark" onPress={handleMarkComplete} style={{ alignSelf: 'stretch' }} />
            )}
            <Button title={T('sankalp_abandon')} variant="danger" onPress={handleReset} style={{ marginTop: 12 }} />
        </Screen>
    );
};
