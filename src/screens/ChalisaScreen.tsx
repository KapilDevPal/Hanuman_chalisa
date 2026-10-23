import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useT } from '../hooks/useT';
import { useInAppReview } from '../hooks/useInAppReview';
import { getChalisaLanguage } from '../data/chalisaLanguages';
import { scrollProgress, MIN_FONT, MAX_FONT } from '../utils/reading';
import { LangBadge, GUTTER } from '../components/ui';

const CONTENT_LANG_KEY = 'chalisa_content_lang';

export const ChalisaScreen = () => {
    // Read global UI language (set from Settings) to initialise content, but
    // switching language inside this screen is LOCAL — it must NOT change the
    // global UI language (which controls nav labels, settings text, etc.).
    const { language } = useLanguage();
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { colors } = useTheme();
    const { T } = useT();
    const insets = useSafeAreaInsets();
    const [contentLang, setContentLang] = useState<string>(language);
    const [fontSize, setFontSize] = useState(20);
    const [progress, setProgress] = useState(0);
    const isFirstRun = useRef(true);
    const { requestReviewAfterSuccess } = useInAppReview();
    const finishedReading = useRef(false);
    const scrollRef = useRef<ScrollView>(null);

    const current = getChalisaLanguage(contentLang);
    const data = current.data;
    const dohaLabel = data.labels?.doha ?? T('chalisa_doha');
    const chaupaiLabel = data.labels?.chaupai ?? T('chalisa_chaupai');

    // Restore the last reading language picked on this screen
    useEffect(() => {
        AsyncStorage.getItem(CONTENT_LANG_KEY)
            .then(stored => { if (stored) setContentLang(stored); })
            .catch(() => { });
    }, []);

    // When global language changes (user goes to Settings and picks a language),
    // sync the content language too.
    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        setContentLang(language);
    }, [language]);

    // Local content-language switch, picked on ChalisaLanguageScreen and passed back as a param
    const pickedLang: string | undefined = route.params?.lang;
    useEffect(() => {
        if (!pickedLang) return;
        setContentLang(pickedLang);
        scrollRef.current?.scrollTo({ y: 0, animated: false });
        AsyncStorage.setItem(CONTENT_LANG_KEY, pickedLang).catch(() => { });
        navigation.setParams({ lang: undefined });
    }, [pickedLang]);

    const pill = (label: string) => (
        <View style={{ alignItems: 'center', marginBottom: 16 }}>
            <Text
                style={{
                    fontSize: 12, fontWeight: '800', color: colors.primary, letterSpacing: 1.2, textTransform: 'uppercase',
                    backgroundColor: colors.primary + '22', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 999, overflow: 'hidden',
                }}
            >
                {label}
            </Text>
        </View>
    );

    const renderDoha = (lines: string[], keyPrefix: string) => (
        <View
            style={{
                marginBottom: 24, backgroundColor: colors.primarySoft, padding: 24, borderRadius: 24,
                borderWidth: 1, borderColor: colors.primary + '40',
            }}
        >
            {pill(`Doha • ${dohaLabel}`)}
            {lines.map((line, index) => (
                <Text
                    key={`${keyPrefix}_${index}`}
                    style={{ fontSize: fontSize + 1, lineHeight: (fontSize + 1) * 1.6, fontWeight: '800', color: colors.text, textAlign: 'center', marginBottom: 10 }}
                >
                    {line}
                </Text>
            ))}
        </View>
    );

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
        <View style={{ flex: 1, backgroundColor: colors.background, paddingTop: insets.top }}>
            {/* Progress Bar */}
            <View style={{ height: 4, backgroundColor: colors.border }}>
                <View style={{ height: 4, width: `${progress * 100}%`, backgroundColor: colors.primary }} />
            </View>

            {/* Scrollable Chalisa Verses */}
            <ScrollView
                ref={scrollRef}
                contentContainerStyle={{ paddingHorizontal: GUTTER, paddingTop: 24, paddingBottom: 48 }}
                onScroll={e => {
                    const next = scrollProgress(e);
                    setProgress(next);
                    // Positive moment: the whole Chalisa has been read (once per visit; throttled to 90 days)
                    if (next >= 0.98 && !finishedReading.current) {
                        finishedReading.current = true;
                        requestReviewAfterSuccess();
                    }
                }}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
            >
                {/* Title */}
                <View style={{ alignItems: 'center', marginBottom: 24 }}>
                    <Text style={{ fontSize: 30, fontWeight: '900', color: colors.primary, textAlign: 'center' }}>
                        {data.title}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                        <View style={{ height: 1.5, width: 32, backgroundColor: colors.primary + '4D' }} />
                        <MaterialCommunityIcons name="om" size={18} color={colors.primary} style={{ marginHorizontal: 12 }} />
                        <View style={{ height: 1.5, width: 32, backgroundColor: colors.primary + '4D' }} />
                    </View>
                    {data.invocation && (
                        <Text style={{ fontSize: 15, color: colors.textMuted, textAlign: 'center', marginTop: 12 }}>
                            {data.invocation}
                        </Text>
                    )}
                </View>

                {/* Controls Card (Language & Font) */}
                <View
                    style={{
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24,
                        backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 16, padding: 12,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ChalisaLanguage', { current: current.code })}
                        activeOpacity={0.7}
                        style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surfaceAlt, borderRadius: 12, paddingLeft: 4, paddingRight: 10, height: 40 }}
                    >
                        <LangBadge code={current.code} active size={32} />
                        <Text style={{ fontSize: 14, fontWeight: '700', color: colors.text, marginLeft: 8 }}>{current.native}</Text>
                        <Ionicons name="chevron-forward" size={16} color={colors.textMuted} style={{ marginLeft: 4 }} />
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surfaceAlt, borderRadius: 12, height: 40 }}>
                        {sizeButton('remove-circle-outline', -2)}
                        <Text style={{ fontSize: 13, fontWeight: '800', color: colors.text, minWidth: 24, textAlign: 'center' }}>{fontSize}</Text>
                        {sizeButton('add-circle-outline', 2)}
                    </View>
                </View>

                {/* Doha Start */}
                {renderDoha(data.doha_start, 'doha_start')}

                {/* Chaupai Couplets */}
                {pill(`Chaupai • ${chaupaiLabel}`)}
                <View style={{ marginBottom: 24 }}>
                    {data.chaupai.map((line, index) => (
                        <View
                            key={`chaupai_${index}`}
                            style={{ marginBottom: 16, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 16, padding: 20 }}
                        >
                            <Text style={{ fontSize, lineHeight: fontSize * 1.6, fontWeight: '700', color: colors.text, textAlign: 'center' }}>
                                {line}
                            </Text>

                            {/* Couplet Number Badge */}
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 14 }}>
                                <View style={{ height: 1, width: 32, backgroundColor: colors.border }} />
                                <Text style={{ marginHorizontal: 10, color: colors.primary, fontWeight: '900', fontSize: 13 }}>{index + 1}</Text>
                                <View style={{ height: 1, width: 32, backgroundColor: colors.border }} />
                            </View>
                        </View>
                    ))}
                </View>

                {/* Doha End */}
                {renderDoha(data.doha_end, 'doha_end')}

                {/* Closing Jaikaras (present in some languages) */}
                {data.closing?.map((line, index) => (
                    <Text
                        key={`closing_${index}`}
                        style={{ fontSize: fontSize - 2, lineHeight: (fontSize - 2) * 1.6, fontWeight: '800', color: colors.primary, textAlign: 'center', marginBottom: 8 }}
                    >
                        {line}
                    </Text>
                ))}

                {/* Footer Chant / Ending */}
                <View style={{ marginTop: 24, alignItems: 'center' }}>
                    <Text style={{ color: colors.textMuted, fontWeight: '800', letterSpacing: 1.5, fontSize: 12 }}>
                        {T('chalisa_ending')}
                    </Text>
                    <View style={{ height: 2, width: 96, backgroundColor: colors.primary + '33', borderRadius: 1, marginTop: 16 }} />
                </View>
            </ScrollView>

        </View>
    );
};
