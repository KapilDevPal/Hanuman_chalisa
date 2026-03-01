import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Share } from 'react-native';
import ViewShot from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import { useLanguage } from '../context/LanguageContext';
import { Colors } from '../constants/Colors';
import { Card } from '../components/Card';

import hindiWisdom from '../../assets/data/hi/wisdom.json';
import englishWisdom from '../../assets/data/en/wisdom.json';
import punjabiWisdom from '../../assets/data/pa/wisdom.json';

const wisdomMap = { hi: hindiWisdom, en: englishWisdom, pa: punjabiWisdom };

export const WisdomScreen = () => {
    const { language } = useLanguage();
    const viewShotRef = useRef(null);
    const [todaysQuote, setTodaysQuote] = useState<{ id: number, text: string } | null>(null);

    useEffect(() => {
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
                    Share.share({ message: todaysQuote?.text || "Jai Shri Ram" });
                }
            }
        } catch (error) {
            console.error("Sharing failed", error);
        }
    };

    if (!todaysQuote) return null;

    return (
        <View className="flex-1 bg-background p-5 justify-center items-center">
            <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 0.9 }} style={{ backgroundColor: Colors.background }}>
                <Card className="p-8 items-center bg-white shadow-xl m-3 border border-border/50">
                    <Text className="text-[80px] text-accent opacity-20 -mb-6">❝</Text>
                    <Text className="text-2xl font-bold text-text text-center leading-loose my-6">
                        {todaysQuote.text}
                    </Text>
                    <Text className="text-sm text-lightText mt-4 font-medium italic">- Hanuman Chalisa App</Text>
                </Card>
            </ViewShot>

            <TouchableOpacity
                className="mt-10 bg-primary py-4 px-10 rounded-full shadow-md"
                onPress={shareQuote}
            >
                <Text className="text-white font-bold text-lg">Share Wisdom</Text>
            </TouchableOpacity>
        </View>
    );
};
