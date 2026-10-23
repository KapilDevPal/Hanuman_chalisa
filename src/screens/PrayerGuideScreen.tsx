import React from 'react';
import { View, Text } from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useT } from '../hooks/useT';
import { Screen, IconTile } from '../components/ui';
import { DropIcon, MatIcon, OmBadge, MalaIcon, DiyaIcon } from '../components/icons';

import hindiGuide from '../../assets/data/hi/prayer_guide.json';
import englishGuide from '../../assets/data/en/prayer_guide.json';
import punjabiGuide from '../../assets/data/pa/prayer_guide.json';

const guideMap: Record<string, typeof englishGuide> = { hi: hindiGuide, en: englishGuide, pa: punjabiGuide };

const STEP_ICONS: Record<number, React.FC<{ size?: number; color?: string; glyphColor?: string }>> = {
    1: DropIcon,
    2: MatIcon,
    3: OmBadge,
    4: MalaIcon,
    5: DiyaIcon,
};

export const PrayerGuideScreen = () => {
    const { language } = useLanguage();
    const { colors } = useTheme();
    const { T } = useT();
    const data = guideMap[language] || guideMap['en'];

    return (
        <Screen>
            <Text style={{ fontSize: 15, color: colors.textMuted, marginBottom: 24 }}>{T('way_to_pray_subtitle')}</Text>

            {data.steps.map((step, index) => {
                const StepIcon = STEP_ICONS[step.id] ?? DropIcon;
                const isLast = index === data.steps.length - 1;
                return (
                    <View key={step.id} style={{ flexDirection: 'row' }}>
                        {/* Icon column + connecting line */}
                        <View style={{ alignItems: 'center', width: 44 }}>
                            <IconTile size={44}>
                                <StepIcon size={26} color={colors.primary} glyphColor={colors.primarySoft} />
                            </IconTile>
                            {!isLast && <View style={{ width: 2, flex: 1, backgroundColor: colors.border, marginVertical: 6 }} />}
                        </View>

                        {/* Step content */}
                        <View style={{ flex: 1, marginLeft: 16, paddingBottom: isLast ? 0 : 28 }}>
                            <Text style={{ fontSize: 12, fontWeight: '700', color: colors.primary, letterSpacing: 0.5 }}>
                                {String(index + 1).padStart(2, '0')}
                            </Text>
                            <Text style={{ fontSize: 17, fontWeight: '700', color: colors.text, marginTop: 2 }}>{step.title}</Text>
                            <Text style={{ fontSize: 15, lineHeight: 22, color: colors.textMuted, marginTop: 6 }}>{step.description}</Text>
                        </View>
                    </View>
                );
            })}

            <Text style={{ fontSize: 15, fontWeight: '700', color: colors.primary, textAlign: 'center', marginTop: 32 }}>
                🙏 {T('settings_bless')}
            </Text>
        </Screen>
    );
};
