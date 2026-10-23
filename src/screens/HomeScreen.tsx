import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import { useT } from '../hooks/useT';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { Screen, Surface, SectionLabel, ListRow, IconTile, IconButton, Button, RADIUS } from '../components/ui';
import { DiyaIcon, OmBadge } from '../components/icons';
import { CHALISA_LANGUAGES } from '../data/chalisaLanguages';
import { textLibrary } from '../data/TextLibrary';
import { openInstagramProfile, shareOnWhatsApp } from '../utils/share';

// Wisdom Data
import hindiWisdom from '../../assets/data/hi/wisdom.json';
import englishWisdom from '../../assets/data/en/wisdom.json';
import punjabiWisdom from '../../assets/data/pa/wisdom.json';

const wisdomMap: Record<string, any[]> = {
    hi: hindiWisdom,
    en: englishWisdom,
    pa: punjabiWisdom,
};

const getQuote = (language: string) => {
    const dayOfYear = Math.floor(
        (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
    );
    const quotes = wisdomMap[language] || wisdomMap['en'];
    return quotes[dayOfYear % quotes.length]?.text ?? '';
};

/** Compact stat tile (number + label) that links to a screen. */
const StatTile = ({ value, label, icon, onPress }: { value: string | number; label: string; icon: React.ReactNode; onPress: () => void }) => {
    const { colors } = useTheme();
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={{ flex: 1 }}>
            <Surface>
                {icon}
                <Text style={{ fontSize: 26, fontWeight: '800', color: colors.text, marginTop: 12, fontVariant: ['tabular-nums'] }}>
                    {value}
                </Text>
                <Text style={{ fontSize: 13, color: colors.textMuted, marginTop: 2 }} numberOfLines={1}>{label}</Text>
            </Surface>
        </TouchableOpacity>
    );
};

export const HomeScreen = () => {
    const navigation = useNavigation<any>();
    const { language } = useLanguage();
    const { colors } = useTheme();
    const { jaapCount, sankalp } = useUser();
    const { T } = useT();

    const [quote, setQuote] = useState(() => getQuote(language));
    const [refreshing, setRefreshing] = useState(false);

    // Keep quote in sync when language changes
    React.useEffect(() => {
        setQuote(getQuote(language));
    }, [language]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        // Small delay for smooth animation
        setTimeout(() => {
            setQuote(getQuote(language));
            setRefreshing(false);
        }, 700);
    }, [language]);

    const openText = (textId: keyof typeof textLibrary) =>
        navigation.navigate('Reader', { textId, title: textLibrary[textId].hi.title });

    const sankalpLabel = sankalp.active ? `${sankalp.daysCompleted}/${sankalp.duration}` : '—';

    return (
        <Screen
            safeTop
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    tintColor={colors.primary}
                    colors={[colors.primary]}
                    progressBackgroundColor={colors.surface}
                />
            }
        >
            {/* ── Greeting ─────────────────────────────────────────────────── */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 14, color: colors.textMuted }}>{T('home_welcome')}</Text>
                    <Text style={{ fontSize: 28, fontWeight: '800', color: colors.text, letterSpacing: -0.5, marginTop: 2 }}>
                        {T('home_greeting_hi')}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                    <LanguageSwitcher />
                    <IconButton icon="settings-outline" onPress={() => navigation.navigate('Settings')} accessibilityLabel={T('settings_title')} />
                </View>
            </View>

            {/* ── Audio ────────────────────────────────────────────────────── */}
            <TouchableOpacity
                onPress={() => navigation.navigate('Audio')}
                activeOpacity={0.9}
                style={{ marginBottom: 12, borderRadius: RADIUS + 4, overflow: 'hidden', height: 240 }}
            >
                <ImageBackground
                    source={require('../../assets/images/hanuman_cover.png')}
                    style={{ flex: 1, justifyContent: 'flex-end' }}
                    resizeMode="cover"
                >
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.75)']}
                        style={{ padding: 18, paddingTop: 60, flexDirection: 'row', alignItems: 'flex-end' }}
                    >
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 13, fontWeight: '600', color: 'rgba(255,255,255,0.8)', letterSpacing: 0.5 }}>
                                {T('home_listen_now')}
                            </Text>
                            <Text style={{ fontSize: 22, fontWeight: '800', color: '#FFFFFF', marginTop: 2 }}>Hanuman Chalisa</Text>
                            <Text style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 2 }}>{T('home_divine_chanting')}</Text>
                        </View>
                        <View style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' }}>
                            <Ionicons name="play" size={26} color={colors.onPrimary} style={{ marginLeft: 3 }} />
                        </View>
                    </LinearGradient>
                </ImageBackground>
            </TouchableOpacity>

            {/* ── Primary action: read Chalisa ─────────────────────────────── */}
            <TouchableOpacity
                onPress={() => navigation.navigate('Chalisa')}
                activeOpacity={0.85}
                style={{
                    backgroundColor: colors.primary,
                    borderRadius: RADIUS + 4,
                    padding: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 12,
                }}
            >
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 20, fontWeight: '800', color: colors.onPrimary }}>{T('home_read_chalisa')}</Text>
                    <Text style={{ fontSize: 14, color: colors.onPrimary, opacity: 0.85, marginTop: 4 }}>
                        {T('home_read_chalisa_sub', { n: CHALISA_LANGUAGES.length })}
                    </Text>
                </View>
                <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.22)', alignItems: 'center', justifyContent: 'center' }}>
                    <Ionicons name="arrow-forward" size={22} color={colors.onPrimary} />
                </View>
            </TouchableOpacity>

            {/* ── Today ────────────────────────────────────────────────────── */}
            <View style={{ flexDirection: 'row', gap: 12, marginBottom: 28 }}>
                <StatTile
                    value={jaapCount}
                    label={T('home_jaap_today')}
                    icon={<IconTile size={36}><MaterialCommunityIcons name="meditation" size={20} color={colors.primary} /></IconTile>}
                    onPress={() => navigation.navigate('Jaap')}
                />
                <StatTile
                    value={sankalpLabel}
                    label={T('home_sankalp_day')}
                    icon={<IconTile size={36}><Ionicons name="flag-outline" size={18} color={colors.primary} /></IconTile>}
                    onPress={() => navigation.navigate('Sankalp')}
                />
            </View>

            {/* ── Daily wisdom ─────────────────────────────────────────────── */}
            <SectionLabel>{T('home_daily_wisdom')}</SectionLabel>
            <TouchableOpacity onPress={() => navigation.navigate('Wisdom')} activeOpacity={0.8} style={{ marginBottom: 28 }}>
                <Surface style={{ padding: 20 }}>
                    <Text style={{ fontSize: 17, lineHeight: 26, color: colors.text }} numberOfLines={4}>
                        “{quote}”
                    </Text>
                    <Text style={{ fontSize: 14, fontWeight: '700', color: colors.primary, marginTop: 12 }}>{T('home_read_full')}</Text>
                </Surface>
            </TouchableOpacity>

            {/* ── Library ──────────────────────────────────────────────────── */}
            <SectionLabel
                right={
                    <TouchableOpacity onPress={() => navigation.navigate('Library')} hitSlop={10}>
                        <Text style={{ fontSize: 14, fontWeight: '700', color: colors.primary }}>{T('home_view_all')}</Text>
                    </TouchableOpacity>
                }
            >
                {T('home_library')}
            </SectionLabel>
            <Surface padded={false} style={{ marginBottom: 28 }}>
                <ListRow
                    icon={<IconTile><DiyaIcon size={22} color={colors.primary} /></IconTile>}
                    title={T('home_aarti')}
                    subtitle={T('home_aarti_sub')}
                    onPress={() => openText('hanuman_aarti')}
                />
                <ListRow
                    icon={<IconTile><MaterialCommunityIcons name="shield-sun-outline" size={20} color={colors.primary} /></IconTile>}
                    title={T('home_ashtak')}
                    subtitle={T('home_ashtak_sub')}
                    onPress={() => openText('hanuman_ashtak')}
                />
                <ListRow
                    icon={<IconTile><OmBadge size={20} color={colors.primary} glyphColor={colors.surface} /></IconTile>}
                    title={T('home_way_to_pray')}
                    subtitle={T('home_way_to_pray_sub')}
                    onPress={() => navigation.navigate('PrayerGuide')}
                    last
                />
            </Surface>

            {/* ── Follow & Share ───────────────────────────────────────────── */}
            <View style={{ flexDirection: 'row', gap: 12 }}>
                <Button title="Instagram" icon="logo-instagram" variant="secondary" onPress={openInstagramProfile} style={{ flex: 1 }} />
                <Button title="WhatsApp" icon="logo-whatsapp" variant="secondary" onPress={shareOnWhatsApp} style={{ flex: 1 }} />
            </View>
        </Screen>
    );
};
