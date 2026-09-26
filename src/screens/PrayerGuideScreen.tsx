import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useT } from '../hooks/useT';
import { Colors } from '../constants/Colors';
import { MandalaBackdrop } from '../components/MandalaBackdrop';
import { DropIcon, MatIcon, OmBadge, MalaIcon, DiyaIcon } from '../components/icons';

import hindiGuide from '../../assets/data/hi/prayer_guide.json';
import englishGuide from '../../assets/data/en/prayer_guide.json';
import punjabiGuide from '../../assets/data/pa/prayer_guide.json';

const guideMap = { hi: hindiGuide, en: englishGuide, pa: punjabiGuide };

const STEP_ICONS: Record<number, React.FC<{ size?: number; color?: string }>> = {
    1: DropIcon,
    2: MatIcon,
    3: OmBadge,
    4: MalaIcon,
    5: DiyaIcon,
};

export const PrayerGuideScreen = () => {
    const { language } = useLanguage();
    const { colors: theme } = useTheme();
    const { T } = useT();
    const [data, setData] = useState(guideMap['hi']);

    useEffect(() => {
        setData(guideMap[language] || guideMap['hi']);
    }, [language]);

    return (
        <ScrollView style={{ flex: 1, backgroundColor: theme.background }} showsVerticalScrollIndicator={false}>
            {/* Hero */}
            <LinearGradient
                colors={['#FF7700', '#FF9933', '#FFB347']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                    paddingTop: 28,
                    paddingBottom: 32,
                    paddingHorizontal: 24,
                    borderBottomLeftRadius: 32,
                    borderBottomRightRadius: 32,
                    overflow: 'hidden',
                }}
            >
                <MandalaBackdrop size={200} style={{ position: 'absolute', top: -60, right: -60 }} />
                <View style={{ alignItems: 'center' }}>
                    <View
                        style={{
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            borderRadius: 20,
                            padding: 14,
                            marginBottom: 14,
                            borderWidth: 1.5,
                            borderColor: 'rgba(255,255,255,0.3)',
                        }}
                    >
                        <OmBadge size={40} color="#fff" glyphColor={Colors.primary} />
                    </View>
                    <Text style={{ color: '#fff', fontSize: 24, fontWeight: '900', textAlign: 'center' }}>
                        {T('header_prayer')}
                    </Text>
                    <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: '600', marginTop: 6, textAlign: 'center' }}>
                        {T('way_to_pray_subtitle')}
                    </Text>
                </View>
            </LinearGradient>

            {/* Timeline */}
            <View style={{ paddingHorizontal: 20, paddingTop: 28, paddingBottom: 12 }}>
                {data.steps.map((step, index) => {
                    const StepIcon = STEP_ICONS[step.id] ?? DropIcon;
                    const isLast = index === data.steps.length - 1;
                    return (
                        <View key={step.id} style={{ flexDirection: 'row' }}>
                            {/* Icon column + connecting line */}
                            <View style={{ alignItems: 'center', width: 56 }}>
                                <View
                                    style={{
                                        width: 52,
                                        height: 52,
                                        borderRadius: 26,
                                        backgroundColor: theme.card,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderWidth: 1.5,
                                        borderColor: Colors.primary + '35',
                                        shadowColor: '#000',
                                        shadowOpacity: 0.06,
                                        shadowRadius: 6,
                                        shadowOffset: { width: 0, height: 2 },
                                        elevation: 2,
                                    }}
                                >
                                    <StepIcon size={30} color={Colors.primary} />
                                </View>
                                {!isLast && (
                                    <View
                                        style={{
                                            width: 2,
                                            flex: 1,
                                            minHeight: 44,
                                            backgroundColor: Colors.primary + '30',
                                            marginTop: 4,
                                            marginBottom: 4,
                                        }}
                                    />
                                )}
                            </View>

                            {/* Step content */}
                            <View
                                style={{
                                    flex: 1,
                                    backgroundColor: theme.card,
                                    borderRadius: 20,
                                    padding: 16,
                                    marginLeft: 12,
                                    marginBottom: isLast ? 8 : 20,
                                    borderWidth: 1,
                                    borderColor: theme.border,
                                    shadowColor: '#000',
                                    shadowOpacity: 0.04,
                                    shadowRadius: 6,
                                    shadowOffset: { width: 0, height: 2 },
                                    elevation: 1,
                                }}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                                    <View
                                        style={{
                                            backgroundColor: Colors.primary + '18',
                                            borderRadius: 8,
                                            paddingHorizontal: 8,
                                            paddingVertical: 2,
                                            marginRight: 8,
                                        }}
                                    >
                                        <Text style={{ color: Colors.primary, fontSize: 11, fontWeight: '900' }}>
                                            {String(index + 1).padStart(2, '0')}
                                        </Text>
                                    </View>
                                    <Text style={{ fontSize: 16, fontWeight: '900', color: theme.text, flexShrink: 1 }}>
                                        {step.title}
                                    </Text>
                                </View>
                                <Text style={{ fontSize: 13.5, color: theme.lightText, lineHeight: 20, fontWeight: '500' }}>
                                    {step.description}
                                </Text>
                            </View>
                        </View>
                    );
                })}
            </View>

            {/* Closing blessing */}
            <View style={{ alignItems: 'center', paddingBottom: 40, paddingTop: 4 }}>
                <Text style={{ fontSize: 13, fontWeight: '700', color: Colors.primary, letterSpacing: 0.5 }}>
                    🙏 {T('settings_bless')}
                </Text>
            </View>
        </ScrollView>
    );
};
