import React, { useState, useCallback } from 'react';
import {
    View, Text, ScrollView, TouchableOpacity, Image,
    RefreshControl, StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { useT } from '../hooks/useT';

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
    const quotes = wisdomMap[language] || wisdomMap['hi'];
    return quotes[dayOfYear % quotes.length]?.text ?? '';
};

// Quick action tile
const QuickTile = ({ icon, label, sub, onPress, accent = false }: any) => (
    <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.82}
        style={{ flex: 1 }}
    >
        <View
            style={{
                backgroundColor: '#fff',
                borderRadius: 20,
                padding: 14,
                alignItems: 'center',
                borderWidth: 1.5,
                borderColor: accent ? Colors.primary + '40' : '#EADEC9',
                shadowColor: '#000',
                shadowOpacity: 0.05,
                shadowRadius: 6,
                shadowOffset: { width: 0, height: 2 },
                elevation: 2,
            }}
        >
            <View
                style={{
                    backgroundColor: accent ? Colors.primary + '15' : '#FFF4E6',
                    borderRadius: 14,
                    padding: 10,
                    marginBottom: 8,
                }}
            >
                {icon}
            </View>
            <Text
                style={{
                    fontWeight: '800',
                    fontSize: 11,
                    color: '#3A2D1B',
                    textAlign: 'center',
                    letterSpacing: 0.2,
                }}
                numberOfLines={1}
            >
                {label}
            </Text>
            <Text
                style={{
                    fontSize: 9,
                    color: '#A6947D',
                    fontWeight: '600',
                    marginTop: 2,
                    textAlign: 'center',
                }}
                numberOfLines={1}
            >
                {sub}
            </Text>
        </View>
    </TouchableOpacity>
);

export const HomeScreen = () => {
    const navigation = useNavigation<any>();
    const { language } = useLanguage();
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

    const sankalpLabel = sankalp.active
        ? `${sankalp.daysCompleted}/${sankalp.duration}`
        : '—';

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: '#FAF7F0' }}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    tintColor={Colors.primary}
                    colors={[Colors.primary]}
                    progressBackgroundColor="#FFF4E6"
                />
            }
        >
            <StatusBar barStyle="light-content" />

            {/* ── Hero Header ──────────────────────────────────────────────── */}
            <LinearGradient
                colors={['#FF7700', '#FF9933', '#FFB347']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                    paddingTop: 58,
                    paddingHorizontal: 20,
                    paddingBottom: 28,
                    borderBottomLeftRadius: 36,
                    borderBottomRightRadius: 36,
                }}
            >
                {/* Top row */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: 'rgba(255,255,255,0.75)', fontSize: 11, fontWeight: '700', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 4 }}>
                            {T('home_welcome')}
                        </Text>
                        <Text style={{ color: '#fff', fontSize: 32, fontWeight: '900', letterSpacing: 0.3 }}>
                            {T('home_greeting_hi')}
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Settings')}
                        style={{
                            backgroundColor: 'rgba(255,255,255,0.18)',
                            borderRadius: 16,
                            padding: 10,
                            borderWidth: 1.5,
                            borderColor: 'rgba(255,255,255,0.3)',
                        }}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="settings-outline" size={22} color="#fff" />
                    </TouchableOpacity>
                </View>

                {/* Stats strip */}
                <View
                    style={{
                        flexDirection: 'row',
                        backgroundColor: 'rgba(255,255,255,0.15)',
                        borderRadius: 18,
                        padding: 14,
                        borderWidth: 1,
                        borderColor: 'rgba(255,255,255,0.2)',
                        marginBottom: 18,
                        gap: 0,
                    }}
                >
                    {/* Jaap */}
                    <TouchableOpacity
                        style={{ flex: 1, alignItems: 'center' }}
                        onPress={() => navigation.navigate('Jaap')}
                        activeOpacity={0.7}
                    >
                        <Text style={{ color: '#fff', fontSize: 24, fontWeight: '900', lineHeight: 28 }}>{jaapCount}</Text>
                        <Text style={{ color: 'rgba(255,255,255,0.75)', fontSize: 9, fontWeight: '700', letterSpacing: 0.5, marginTop: 2, textTransform: 'uppercase' }}>
                            {T('home_jaap_today')}
                        </Text>
                    </TouchableOpacity>

                    <View style={{ width: 1, backgroundColor: 'rgba(255,255,255,0.25)', marginVertical: 2 }} />

                    {/* Sankalp */}
                    <TouchableOpacity
                        style={{ flex: 1, alignItems: 'center' }}
                        onPress={() => navigation.navigate('Sankalp')}
                        activeOpacity={0.7}
                    >
                        <Text style={{ color: '#fff', fontSize: 24, fontWeight: '900', lineHeight: 28 }}>{sankalpLabel}</Text>
                        <Text style={{ color: 'rgba(255,255,255,0.75)', fontSize: 9, fontWeight: '700', letterSpacing: 0.5, marginTop: 2, textTransform: 'uppercase' }}>
                            {T('home_sankalp_day')}
                        </Text>
                    </TouchableOpacity>

                    <View style={{ width: 1, backgroundColor: 'rgba(255,255,255,0.25)', marginVertical: 2 }} />

                    {/* Insights */}
                    <TouchableOpacity
                        style={{ flex: 1, alignItems: 'center' }}
                        onPress={() => navigation.navigate('Dashboard')}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="stats-chart" size={22} color="#fff" style={{ marginBottom: 2 }} />
                        <Text style={{ color: 'rgba(255,255,255,0.75)', fontSize: 9, fontWeight: '700', letterSpacing: 0.5, marginTop: 2, textTransform: 'uppercase' }}>
                            {T('home_insights')}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Daily Wisdom */}
                <View
                    style={{
                        backgroundColor: 'rgba(255,255,255,0.14)',
                        borderRadius: 20,
                        padding: 16,
                        borderWidth: 1,
                        borderColor: 'rgba(255,255,255,0.18)',
                    }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                        <View style={{ backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 8, padding: 5, marginRight: 8 }}>
                            <Ionicons name="sunny" size={13} color="#fff" />
                        </View>
                        <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: 10, fontWeight: '800', letterSpacing: 1, textTransform: 'uppercase' }}>
                            {T('home_daily_wisdom')}
                        </Text>
                    </View>
                    <Text style={{ color: '#fff', fontSize: 14, fontWeight: '500', fontStyle: 'italic', lineHeight: 22, marginBottom: 10 }} numberOfLines={3}>
                        "{quote}"
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Wisdom')}
                        style={{ alignSelf: 'flex-end', backgroundColor: 'rgba(255,255,255,0.22)', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20 }}
                        activeOpacity={0.7}
                    >
                        <Text style={{ color: '#fff', fontSize: 11, fontWeight: '800' }}>{T('home_read_full')}</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>

            {/* ── Body ─────────────────────────────────────────────────────── */}
            <View style={{ paddingHorizontal: 18, paddingTop: 24 }}>

                {/* Audio card */}
                <TouchableOpacity onPress={() => navigation.navigate('Audio')} activeOpacity={0.85} style={{ marginBottom: 22 }}>
                    <LinearGradient
                        colors={['#1A1A2E', '#16213E', '#0F3460']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{
                            borderRadius: 24,
                            padding: 16,
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <View style={{ borderRadius: 16, overflow: 'hidden', elevation: 4 }}>
                            <Image
                                source={require('../../assets/images/hanuman_cover.png')}
                                style={{ width: 80, height: 80 }}
                            />
                        </View>
                        <View style={{ marginLeft: 16, flex: 1 }}>
                            <Text style={{ color: 'rgba(255,255,255,0.55)', fontSize: 10, fontWeight: '700', letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 4 }}>
                                {T('home_listen_now')}
                            </Text>
                            <Text style={{ color: '#fff', fontSize: 17, fontWeight: '900', marginBottom: 4 }}>Hanuman Chalisa</Text>
                            <Text style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12, marginBottom: 12 }}>{T('home_divine_chanting')}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.primary + 'CC', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, alignSelf: 'flex-start' }}>
                                <Ionicons name="play" size={12} color="#fff" style={{ marginRight: 5 }} />
                                <Text style={{ color: '#fff', fontWeight: '800', fontSize: 11 }}>{T('home_play_audio')}</Text>
                            </View>
                        </View>
                    </LinearGradient>
                </TouchableOpacity>

                {/* Library section */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                    <Text style={{ fontSize: 18, fontWeight: '900', color: '#3A2D1B' }}>{T('home_library')}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Library')} activeOpacity={0.7}>
                        <Text style={{ fontSize: 13, fontWeight: '800', color: Colors.primary }}>{T('home_view_all')}</Text>
                    </TouchableOpacity>
                </View>

                {/* 2×2 Quick Tiles grid */}
                <View style={{ flexDirection: 'row', gap: 10, marginBottom: 10 }}>
                    <QuickTile
                        onPress={() => navigation.navigate('Chalisa')}
                        icon={<FontAwesome5 name="book-open" size={22} color={Colors.primary} />}
                        label={T('home_chalisa')}
                        sub={T('home_chalisa_sub')}
                        accent
                    />
                    <QuickTile
                        onPress={() => navigation.navigate('Library')}
                        icon={<MaterialCommunityIcons name="hands-pray" size={22} color={Colors.primary} />}
                        label={T('home_aarti')}
                        sub={T('home_aarti_sub')}
                    />
                </View>
                <View style={{ flexDirection: 'row', gap: 10, marginBottom: 22 }}>
                    <QuickTile
                        onPress={() => navigation.navigate('Library')}
                        icon={<Ionicons name="library" size={22} color={Colors.primary} />}
                        label={T('home_ashtak')}
                        sub={T('home_ashtak_sub')}
                    />
                    <QuickTile
                        onPress={() => navigation.navigate('PrayerGuide')}
                        icon={<MaterialCommunityIcons name="star-face" size={22} color={Colors.primary} />}
                        label={T('home_way_to_pray')}
                        sub={T('home_way_to_pray_sub')}
                    />
                </View>

                {/* Spiritual Insights banner */}
                <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} activeOpacity={0.85} style={{ marginBottom: 32 }}>
                    <LinearGradient
                        colors={['#FFF4E6', '#FFE4C4']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: 18,
                            borderRadius: 20,
                            borderWidth: 1.5,
                            borderColor: Colors.primary + '30',
                        }}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ backgroundColor: Colors.primary + '20', borderRadius: 12, padding: 8, marginRight: 12 }}>
                                <Ionicons name="stats-chart" size={20} color={Colors.primary} />
                            </View>
                            <View>
                                <Text style={{ fontWeight: '900', fontSize: 15, color: '#3A2D1B' }}>{T('home_insights')}</Text>
                                <Text style={{ fontSize: 11, color: '#A6947D', fontWeight: '600', marginTop: 2 }}>
                                    {T('dash_subtitle')}
                                </Text>
                            </View>
                        </View>
                        <View style={{ backgroundColor: Colors.primary, borderRadius: 10, padding: 6 }}>
                            <Ionicons name="arrow-forward" size={16} color="#fff" />
                        </View>
                    </LinearGradient>
                </TouchableOpacity>
            </View>

            {/* Bottom nav spacer */}
            <View style={{ height: 110 }} />
        </ScrollView>
    );
};
