import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/Colors';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { Card } from '../components/Card';

// Wisdom Data
import hindiWisdom from '../../assets/data/hi/wisdom.json';
import englishWisdom from '../../assets/data/en/wisdom.json';
import punjabiWisdom from '../../assets/data/pa/wisdom.json';

const wisdomMap = {
    hi: hindiWisdom,
    en: englishWisdom,
    pa: punjabiWisdom,
};

export const HomeScreen = () => {
    const navigation = useNavigation<any>();
    const { language } = useLanguage();
    const { jaapCount, sankalp } = useUser();
    const [todaysQuote, setTodaysQuote] = useState('');

    useEffect(() => {
        const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
        const quotes = wisdomMap[language] || wisdomMap['hi'];
        const index = dayOfYear % quotes.length;
        setTodaysQuote(quotes[index]?.text);
    }, [language]);

    const getGreeting = () => {
        if (language === 'hi') return 'जय श्री राम';
        if (language === 'pa') return 'ਜੈ ਸ਼੍ਰੀ ਰਾਮ';
        return 'Jai Shri Ram';
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <LinearGradient
                colors={[Colors.primary, Colors.secondary]}
                style={styles.headerGradient}
            >
                <View style={styles.headerContainer}>
                    <View>
                        <Text style={styles.greetingSub}>Welcome Devotee</Text>
                        <Text style={styles.greeting}>{getGreeting()}</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.settingsBtn}>
                        <Text style={styles.settingsIcon}>⚙️</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.wisdomPreview}>
                    <Text style={styles.wisdomLabel}>Daily Wisdom</Text>
                    <Text style={styles.wisdomText} numberOfLines={2}>"{todaysQuote}"</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Wisdom')}>
                        <Text style={styles.readMore}>Read More & Share →</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>

            <View style={styles.mainContent}>
                <TouchableOpacity onPress={() => navigation.navigate('Chalisa')}>
                    <Card style={styles.heroCard}>
                        <Text style={styles.heroIcon}>📖</Text>
                        <View>
                            <Text style={styles.heroTitle}>Read Chalisa</Text>
                            <Text style={styles.heroSubtitle}>Start your daily prayer</Text>
                        </View>
                    </Card>
                </TouchableOpacity>

                <View style={styles.statsRow}>
                    <TouchableOpacity style={styles.halfWidth} onPress={() => navigation.navigate('Jaap')}>
                        <Card style={styles.statCard}>
                            <Text style={styles.cardIcon}>📿</Text>
                            <Text style={styles.stat}>{jaapCount}</Text>
                            <Text style={styles.statLabel}>Jaap Today</Text>
                        </Card>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.halfWidth} onPress={() => navigation.navigate('Sankalp')}>
                        <Card style={styles.statCard}>
                            <Text style={styles.cardIcon}>🎯</Text>
                            <Text style={styles.stat}>{sankalp.active ? `${sankalp.daysCompleted}/${sankalp.duration}` : '-'}</Text>
                            <Text style={styles.statLabel}>Sankalp Day</Text>
                        </Card>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
                    <Card style={styles.dashboardLink}>
                        <Text style={styles.dashboardIcon}>📊</Text>
                        <Text style={styles.dashboardText}>View Spiritual Dashboard</Text>
                    </Card>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('PrayerGuide')}>
                    <Card style={styles.prayerCard}>
                        <Text style={styles.cardIcon}>🙏</Text>
                        <View>
                            <Text style={styles.cardTitle}>Way to Pray</Text>
                            <Text style={styles.cardContent}>Learn the rituals and vidhi</Text>
                        </View>
                    </Card>
                </TouchableOpacity>
            </View>

            <View style={{ height: 40 }} />

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    content: {
        padding: 0,
    },
    headerGradient: {
        padding: 20,
        paddingTop: 60,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    greetingSub: {
        fontSize: 14,
        color: Colors.white,
        opacity: 0.9,
        marginBottom: 4,
    },
    greeting: {
        fontSize: 32,
        fontWeight: 'bold',
        color: Colors.white,
    },
    settingsBtn: {
        padding: 8,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 20,
    },
    settingsIcon: {
        fontSize: 20,
    },
    wisdomPreview: {
        backgroundColor: 'rgba(255,255,255,0.15)',
        padding: 15,
        borderRadius: 15,
    },
    wisdomLabel: {
        fontSize: 12,
        color: Colors.white,
        fontWeight: 'bold',
        marginBottom: 4,
        opacity: 0.8,
    },
    wisdomText: {
        fontSize: 16,
        color: Colors.white,
        fontStyle: 'italic',
        marginBottom: 8,
        lineHeight: 22,
    },
    readMore: {
        fontSize: 12,
        color: Colors.white,
        fontWeight: 'bold',
        alignSelf: 'flex-end',
    },
    mainContent: {
        padding: 20,
        marginTop: -10,
    },
    heroCard: {
        backgroundColor: Colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        marginBottom: 16,
        borderLeftWidth: 5,
        borderLeftColor: Colors.primary,
    },
    heroIcon: {
        fontSize: 40,
        marginRight: 20,
        marginLeft: 10,
    },
    heroTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 4,
    },
    heroSubtitle: {
        fontSize: 14,
        color: Colors.lightText,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    halfWidth: {
        width: '48%',
    },
    statCard: {
        alignItems: 'center',
        paddingVertical: 16,
        height: 140,
        justifyContent: 'center',
    },
    cardIcon: {
        fontSize: 28,
        marginBottom: 8,
    },
    stat: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    statLabel: {
        fontSize: 12,
        color: Colors.lightText,
        marginTop: 4,
    },
    dashboardLink: {
        backgroundColor: Colors.secondary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        marginBottom: 16,
    },
    dashboardIcon: {
        fontSize: 20,
        marginRight: 10,
    },
    dashboardText: {
        color: Colors.text,
        fontWeight: 'bold',
        fontSize: 16,
    },
    prayerCard: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 4,
    },
    cardContent: {
        fontSize: 14,
        color: Colors.lightText,
    },
});
