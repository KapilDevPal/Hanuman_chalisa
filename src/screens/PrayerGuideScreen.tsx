import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { Colors } from '../constants/Colors';
import { Card } from '../components/Card';

import hindiGuide from '../../assets/data/hi/prayer_guide.json';
import englishGuide from '../../assets/data/en/prayer_guide.json';
import punjabiGuide from '../../assets/data/pa/prayer_guide.json';

const guideMap = { hi: hindiGuide, en: englishGuide, pa: punjabiGuide };

export const PrayerGuideScreen = () => {
    const { language } = useLanguage();
    const [data, setData] = useState(guideMap['hi']);

    useEffect(() => {
        setData(guideMap[language] || guideMap['hi']);
    }, [language]);

    return (
        <ScrollView className="flex-1 bg-background" contentContainerStyle={{ padding: 16 }}>
            <Text className="text-2xl font-bold text-primary mb-6 text-center mt-2">Way to Pray / विधि</Text>

            {data.steps.map((step, index) => (
                <View key={step.id} className="flex-row mb-5">
                    <View className="w-10 h-10 rounded-full bg-secondary justify-center items-center mr-3 mt-1 shadow-sm">
                        <Text className="font-bold text-text text-lg">{index + 1}</Text>
                    </View>
                    <Card className="flex-1 bg-white shadow-sm border border-border/30">
                        <Text className="text-[18px] font-bold text-text mb-2">{step.title}</Text>
                        <Text className="text-base text-lightText leading-6">{step.description}</Text>
                    </Card>
                </View>
            ))}
        </ScrollView>
    );
};
