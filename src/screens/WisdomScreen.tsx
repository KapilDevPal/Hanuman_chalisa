import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Share } from 'react-native';
import ViewShot from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useT } from '../hooks/useT';
import { Screen, Button } from '../components/ui';

import hindiWisdom from '../../assets/data/hi/wisdom.json';
import englishWisdom from '../../assets/data/en/wisdom.json';
import punjabiWisdom from '../../assets/data/pa/wisdom.json';

const wisdomMap: Record<string, { id: number; text: string }[]> = { hi: hindiWisdom, en: englishWisdom, pa: punjabiWisdom };

export const WisdomScreen = () => {
    const { language } = useLanguage();
    const { colors } = useTheme();
    const { T } = useT();
    const viewShotRef = useRef(null);
    const [todaysQuote, setTodaysQuote] = useState<{ id: number, text: string } | null>(null);

    useEffect(() => {
        const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
        const quotes = wisdomMap[language] || wisdomMap['en'];
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
                    Share.share({ message: todaysQuote?.text || "Jai Shri Ram" });
                }
            }
        } catch (error) {
            console.error("Sharing failed", error);
        }
    };

    if (!todaysQuote) return null;

    return (
        <Screen contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
            {/* Captured as the shared image */}
            <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 0.9 }} style={{ backgroundColor: colors.background, padding: 4 }}>
                <View
                    style={{
                        backgroundColor: colors.surface, borderRadius: 24, borderWidth: 1, borderColor: colors.border,
                        paddingHorizontal: 28, paddingVertical: 36, alignItems: 'center',
                    }}
                >
                    <MaterialCommunityIcons name="format-quote-open" size={40} color={colors.primary} />
                    <Text style={{ fontSize: 22, lineHeight: 34, fontWeight: '600', color: colors.text, textAlign: 'center', marginTop: 12 }}>
                        {todaysQuote.text}
                    </Text>
                    <View style={{ height: 1, width: 40, backgroundColor: colors.border, marginTop: 24, marginBottom: 12 }} />
                    <Text style={{ fontSize: 13, color: colors.textMuted }}>Hanuman Chalisa App</Text>
                </View>
            </ViewShot>

            <Button title={T('wisdom_share')} icon="share-social-outline" onPress={shareQuote} style={{ marginTop: 28 }} />
        </Screen>
    );
};
