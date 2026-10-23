import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useT } from '../hooks/useT';
import { textLibrary } from '../data/TextLibrary';
import { scrollProgress, MIN_FONT, MAX_FONT } from '../utils/reading';
import { LangBadge, GUTTER } from '../components/ui';

const LANG_LABELS: Record<string, string> = { hi: 'हिन्दी', en: 'English', pa: 'ਪੰਜਾਬੀ' };

export const ReaderScreen = () => {
    const route = useRoute<any>();
    const { textId } = route.params;
    const { colors } = useTheme();
    const { T } = useT();

    // Global language (from Settings) initialises the content language.
    // The in-reader language toggle is LOCAL — it does NOT update global UI language.
    const { language } = useLanguage();
    const [contentLang, setContentLang] = useState<string>(language);

    // If the user changes language in Settings while this screen is mounted, sync it.
    React.useEffect(() => {
        setContentLang(language);
    }, [language]);

    // @ts-ignore
    const textEntry = textLibrary[textId];
    const available: string[] = textEntry ? Object.keys(textEntry) : [];
    const activeLang = available.includes(contentLang) ? contentLang : available[0];
    const textData = textEntry ? textEntry[activeLang] : null;

    const [fontSize, setFontSize] = useState(20);
    const [progress, setProgress] = useState(0);

    // Cycle through the languages this text exists in (most library texts are Hindi only)
    const cycleLanguage = () => {
        const next = available[(available.indexOf(activeLang) + 1) % available.length];
        setContentLang(next);
    };

    if (!textData) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
                <Text style={{ color: colors.textMuted, fontSize: 16 }}>{T('reader_not_found')}</Text>
            </View>
        );
    }

    const sizeButton = (icon: 'remove-circle-outline' | 'add-circle-outline', delta: number) => (
        <TouchableOpacity
            onPress={() => setFontSize(Math.min(MAX_FONT, Math.max(MIN_FONT, fontSize + delta)))}
            style={{ padding: 8 }}
            activeOpacity={0.7}
            accessibilityLabel={delta > 0 ? 'Increase text size' : 'Decrease text size'}
        >
            <Ionicons name={icon} size={20} color={colors.text} />
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            {/* Progress Bar */}
            <View style={{ height: 4, backgroundColor: colors.border }}>
                <View style={{ height: 4, width: `${progress * 100}%`, backgroundColor: colors.primary }} />
            </View>

            <ScrollView
                contentContainerStyle={{ paddingHorizontal: GUTTER, paddingTop: 24, paddingBottom: 48 }}
                onScroll={e => setProgress(scrollProgress(e))}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
            >
                {/* Title */}
                <View style={{ alignItems: 'center', marginBottom: 24 }}>
                    <Text style={{ fontSize: 28, fontWeight: '900', color: colors.primary, textAlign: 'center' }}>
                        {textData.title}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                        <View style={{ height: 1.5, width: 32, backgroundColor: colors.primary + '4D' }} />
                        <MaterialCommunityIcons name="om" size={18} color={colors.primary} style={{ marginHorizontal: 12 }} />
                        <View style={{ height: 1.5, width: 32, backgroundColor: colors.primary + '4D' }} />
                    </View>
                </View>

                {/* Controls Card (Language & Font) */}
                <View
                    style={{
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24,
                        backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 16, padding: 12,
                    }}
                >
                    <TouchableOpacity
                        onPress={cycleLanguage}
                        disabled={available.length < 2}
                        activeOpacity={0.7}
                        style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surfaceAlt, borderRadius: 12, paddingLeft: 4, paddingRight: 12, height: 40 }}
                    >
                        <LangBadge code={activeLang} active size={32} />
                        <Text style={{ fontSize: 14, fontWeight: '700', color: colors.text, marginLeft: 8 }}>{LANG_LABELS[activeLang] ?? activeLang}</Text>
                        {available.length > 1 && <Ionicons name="swap-horizontal" size={16} color={colors.textMuted} style={{ marginLeft: 6 }} />}
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surfaceAlt, borderRadius: 12, height: 40 }}>
                        {sizeButton('remove-circle-outline', -2)}
                        <Text style={{ fontSize: 13, fontWeight: '800', color: colors.text, minWidth: 24, textAlign: 'center' }}>{fontSize}</Text>
                        {sizeButton('add-circle-outline', 2)}
                    </View>
                </View>

                {/* Content Verses */}
                {textData.content.map((line: string, index: number) => (
                    <View
                        key={`line_${index}`}
                        style={{ marginBottom: 16, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 16, padding: 20 }}
                    >
                        <Text style={{ fontSize, lineHeight: fontSize * 1.6, fontWeight: '700', color: colors.text, textAlign: 'center' }}>
                            {line}
                        </Text>
                    </View>
                ))}

                {/* Footer Chant / Ending */}
                <View style={{ marginTop: 24, alignItems: 'center' }}>
                    <Text style={{ color: colors.textMuted, fontWeight: '800', letterSpacing: 1.5, fontSize: 12 }}>
                        || इति श्री समाप्त ||
                    </Text>
                    <View style={{ height: 2, width: 96, backgroundColor: colors.primary + '33', borderRadius: 1, marginTop: 16 }} />
                </View>
            </ScrollView>
        </View>
    );
};
