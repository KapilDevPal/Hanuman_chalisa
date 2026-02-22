import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share } from 'react-native';
import ViewShot from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import { useLanguage } from '../context/LanguageContext';
import { Colors } from '../constants/Colors';
import { Card } from '../components/Card';

// Import JSONs
import hindiWisdom from '../../assets/data/hi/wisdom.json';
import englishWisdom from '../../assets/data/en/wisdom.json';
import punjabiWisdom from '../../assets/data/pa/wisdom.json';

const wisdomMap = {
    hi: hindiWisdom,
    en: englishWisdom,
    pa: punjabiWisdom,
};

export const WisdomScreen = () => {
    const { language } = useLanguage();
    const viewShotRef = useRef(null);
    const [todaysQuote, setTodaysQuote] = useState<{ id: number, text: string } | null>(null);

    useEffect(() => {
        // Select quote based on day so it stays same for the day
        const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
        const quotes = wisdomMap[language] || wisdomMap['hi'];
        const index = dayOfYear % quotes.length;
        setTodaysQuote(quotes[index]);
    }, [language]);

    const shareQuote = async () => {
        try {
            if (viewShotRef.current) {
                // @ts-ignore
                const uri = await viewShotRef.current.capture();
                if (await Sharing.isAvailableAsync()) {
                    await Sharing.shareAsync(uri);
                } else {
                    Share.share({
                        message: todaysQuote?.text || "Jai Shri Ram",
                    });
                }
            }
        } catch (error) {
            console.error("Sharing failed", error);
        }
    };

    if (!todaysQuote) return null;

    return (
        <View style={styles.container}>
            <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 0.9 }} style={{ backgroundColor: Colors.background }}>
                <Card style={styles.quoteCard}>
                    <Text style={styles.quoteIcon}>❝</Text>
                    <Text style={styles.quoteText}>{todaysQuote.text}</Text>
                    <Text style={styles.quoteFooter}>- Hanuman Chalisa App</Text>
                </Card>
            </ViewShot>

            <TouchableOpacity style={styles.shareBtn} onPress={shareQuote}>
                <Text style={styles.shareText}>Share Wisdom</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quoteCard: {
        padding: 30,
        alignItems: 'center',
        backgroundColor: Colors.white, // Ensure white bg for screenshot
        margin: 10,
    },
    quoteIcon: {
        fontSize: 60,
        color: Colors.accent,
        opacity: 0.2,
        marginBottom: -20,
    },
    quoteText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.text,
        textAlign: 'center',
        lineHeight: 32,
        marginVertical: 20,
    },
    quoteFooter: {
        fontSize: 14,
        color: Colors.lightText,
        marginTop: 20,
    },
    shareBtn: {
        marginTop: 40,
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        elevation: 5,
    },
    shareText: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 18,
    }
});
