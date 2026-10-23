import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Vibration, Alert } from 'react-native';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import { SonarButton } from '../components/SonarButton';
import { Screen, PageTitle, SectionLabel, Chip, IconButton, GUTTER } from '../components/ui';
import { useT } from '../hooks/useT';
import { useInAppReview } from '../hooks/useInAppReview';

const JAAP_NAMES = [
    { name: 'RAM', label: 'राम' },
    { name: 'OM', label: 'ॐ' },
    { name: 'HANUMAN', label: 'हनुमान' },
    { name: 'JAI SHRI RAM', label: 'जय श्री राम' },
    { name: 'SITA RAM', label: 'सीताराम' },
    { name: 'OM NAMAH SHIVAYA', label: 'ॐ नमः शिवाय' },
];

const GOALS = [11, 21, 51, 108, 1008];

export const JaapScreen = () => {
    const { jaapCount, incrementJaap, resetDailyJaap, jaapName, setJaapName } = useUser();
    const { colors } = useTheme();
    const { T } = useT();
    const { requestReviewAfterSuccess } = useInAppReview();
    const [target, setTarget] = useState(108);
    const [goalsCompleted, setGoalsCompleted] = useState(0);

    useEffect(() => {
        if (target > 0) {
            setGoalsCompleted(Math.floor(jaapCount / target));
        }
    }, [jaapCount, target]);

    const handleTap = () => {
        incrementJaap(1);
        Vibration.vibrate(40);
        if ((jaapCount + 1) % target === 0) {
            Vibration.vibrate([0, 400, 150, 400]);
            // Positive moment: a full round is done
            requestReviewAfterSuccess();
        }
    };

    const confirmReset = () => {
        Alert.alert(T('jaap_reset'), T('jaap_reset_q'), [
            { text: T('sankalp_cancel'), style: 'cancel' },
            { text: T('sankalp_reset_btn'), style: 'destructive', onPress: resetDailyJaap },
        ]);
    };

    const progressPercent = target > 0 ? Math.min(((jaapCount % target) / target) * 100, 100) : 0;
    const activeMantra = JAAP_NAMES.find(n => n.name === jaapName);

    return (
        <Screen safeTop>
            <PageTitle
                title={T('jaap_title')}
                subtitle={T('jaap_subtitle')}
                right={<IconButton icon="refresh" onPress={confirmReset} accessibilityLabel={T('jaap_reset')} />}
                style={{ marginBottom: 20 }}
            />

            {/* Count + round progress */}
            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 56, fontWeight: '800', color: colors.text, fontVariant: ['tabular-nums'], letterSpacing: -1 }}>
                    {jaapCount}
                </Text>
                <Text style={{ fontSize: 14, color: colors.textMuted }}>
                    {jaapCount % target} / {target} {T('jaap_this_round')}
                    {goalsCompleted > 0 ? `  ·  ${goalsCompleted}×` : ''}
                </Text>
                <View style={{ height: 6, alignSelf: 'stretch', backgroundColor: colors.surfaceAlt, borderRadius: 3, marginTop: 14, overflow: 'hidden' }}>
                    <View style={{ height: 6, width: `${progressPercent}%`, backgroundColor: colors.primary, borderRadius: 3 }} />
                </View>
            </View>

            <SonarButton onPress={handleTap} label={activeMantra?.label ?? jaapName ?? 'राम'} sublabel={T('jaap_tap')} />

            {/* Mantra */}
            <SectionLabel>{T('jaap_select_mantra')}</SectionLabel>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginHorizontal: -GUTTER, marginBottom: 20 }}
                contentContainerStyle={{ paddingHorizontal: GUTTER, gap: 8 }}
            >
                {JAAP_NAMES.map(item => (
                    <Chip key={item.name} label={item.label} active={jaapName === item.name} onPress={() => setJaapName(item.name)} />
                ))}
            </ScrollView>

            {/* Goal */}
            <SectionLabel>{T('jaap_goal')}</SectionLabel>
            <View style={{ flexDirection: 'row', gap: 8 }}>
                {GOALS.map(val => (
                    <Chip key={val} label={String(val)} active={target === val} onPress={() => setTarget(val)} style={{ flex: 1, paddingHorizontal: 0 }} />
                ))}
            </View>
        </Screen>
    );
};
