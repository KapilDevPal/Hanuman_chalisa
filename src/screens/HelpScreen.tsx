import React, { useState } from 'react';
import { View, Text, TouchableOpacity, LayoutAnimation } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useT } from '../hooks/useT';
import { HELP_INTRO, HELP_TOPICS } from '../data/help';
import { Screen, Surface, IconTile } from '../components/ui';

/** "Why and how" guide: one expandable row per feature, each with a shortcut to open it. */
export const HelpScreen = () => {
    const navigation = useNavigation<any>();
    const { colors } = useTheme();
    const { T, language } = useT();
    const [openId, setOpenId] = useState<string | null>(HELP_TOPICS[0].id);

    const toggle = (id: string) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setOpenId(prev => (prev === id ? null : id));
    };

    return (
        <Screen>
            <Text style={{ fontSize: 16, lineHeight: 24, color: colors.textMuted, marginBottom: 24 }}>
                {HELP_INTRO[language]}
            </Text>

            <Surface padded={false}>
                {HELP_TOPICS.map((topic, index) => {
                    const text = topic.text[language];
                    const isOpen = openId === topic.id;
                    const isLast = index === HELP_TOPICS.length - 1;
                    return (
                        <View key={topic.id} style={{ borderBottomWidth: isLast ? 0 : 1, borderBottomColor: colors.border }}>
                            <TouchableOpacity
                                onPress={() => toggle(topic.id)}
                                activeOpacity={0.6}
                                accessibilityState={{ expanded: isOpen }}
                                style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, minHeight: 60 }}
                            >
                                <IconTile><Ionicons name={topic.icon as any} size={20} color={colors.primary} /></IconTile>
                                <Text style={{ flex: 1, fontSize: 16, fontWeight: '600', color: colors.text, marginLeft: 14 }}>{text.title}</Text>
                                <Ionicons name={isOpen ? 'chevron-up' : 'chevron-down'} size={18} color={colors.textMuted} />
                            </TouchableOpacity>

                            {isOpen && (
                                <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
                                    <Text style={{ fontSize: 12, fontWeight: '700', color: colors.primary, letterSpacing: 0.8, textTransform: 'uppercase' }}>
                                        {T('help_why')}
                                    </Text>
                                    <Text style={{ fontSize: 15, lineHeight: 22, color: colors.text, marginTop: 4, marginBottom: 14 }}>{text.why}</Text>

                                    <Text style={{ fontSize: 12, fontWeight: '700', color: colors.primary, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 6 }}>
                                        {T('help_how')}
                                    </Text>
                                    {text.how.map((step, i) => (
                                        <View key={i} style={{ flexDirection: 'row', marginBottom: 8 }}>
                                            <View
                                                style={{
                                                    width: 22, height: 22, borderRadius: 11, backgroundColor: colors.primarySoft,
                                                    alignItems: 'center', justifyContent: 'center', marginRight: 10, marginTop: 1,
                                                }}
                                            >
                                                <Text style={{ fontSize: 12, fontWeight: '700', color: colors.primary }}>{i + 1}</Text>
                                            </View>
                                            <Text style={{ flex: 1, fontSize: 15, lineHeight: 22, color: colors.text }}>{step}</Text>
                                        </View>
                                    ))}

                                    <TouchableOpacity
                                        onPress={() => navigation.navigate(...topic.route)}
                                        activeOpacity={0.7}
                                        style={{
                                            alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', marginTop: 6,
                                            backgroundColor: colors.primarySoft, borderRadius: 18, paddingHorizontal: 14, height: 36,
                                        }}
                                    >
                                        <Text style={{ fontSize: 14, fontWeight: '700', color: colors.primary }}>{T('help_open')}</Text>
                                        <Ionicons name="arrow-forward" size={16} color={colors.primary} style={{ marginLeft: 6 }} />
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    );
                })}
            </Surface>
        </Screen>
    );
};
