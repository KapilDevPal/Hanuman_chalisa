import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, NativeSyntheticEvent, NativeScrollEvent, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../context/LanguageContext';
import { Colors } from '../constants/Colors';

import hindiChalisa from '../../assets/data/hi/chalisa.json';
import englishChalisa from '../../assets/data/en/chalisa.json';
import punjabiChalisa from '../../assets/data/pa/chalisa.json';

const dataMap = { hi: hindiChalisa, en: englishChalisa, pa: punjabiChalisa };

export const ChalisaScreen = () => {
    const { language } = useLanguage();
    const [data, setData] = useState(dataMap['hi']);
    const [fontSize, setFontSize] = useState(22);
    const [progress, setProgress] = useState(0);
    const [showControls, setShowControls] = useState(false);

    useEffect(() => {
        setData(dataMap[language] || dataMap['hi']);
    }, [language]);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const currentProgress = contentOffset.y / (contentSize.height - layoutMeasurement.height);
        setProgress(Math.min(Math.max(currentProgress, 0), 1));
    };

    return (
        <View className="flex-1 bg-background">
            {/* Progress Bar */}
            <View className="h-1.5 bg-border/30 w-full relative z-10">
                <View className="h-full bg-primary" style={{ width: `${progress * 100}%` }} />
            </View>

            {/* Content */}
            <ScrollView
                contentContainerStyle={{ padding: 20, paddingBottom: 60 }}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
            >
                <Text className="text-4xl font-extrabold text-primary text-center mb-10 mt-4 leading-tight">
                    {data.title}
                </Text>

                {/* Doha Start */}
                <View className="mb-10 bg-orange-50/50 p-6 rounded-[30px] border border-orange-100">
                    {data.doha_start.map((line, index) => (
                        <Text key={`doha_start_${index}`} style={{ fontSize: fontSize + 2 }} className="font-bold text-accent text-center mb-3 leading-loose italic">
                            {line}
                        </Text>
                    ))}
                    <View className="items-center mt-2">
                        <View className="h-1 w-12 bg-orange-200 rounded-full" />
                    </View>
                </View>

                {/* Chaupai */}
                <View className="mb-10 px-2">
                    {data.chaupai.map((line, index) => (
                        <View key={`chaupai_${index}`} className="mb-6 border-l-4 border-primary/20 pl-4 py-1">
                            <Text style={{ fontSize }} className="text-text text-left leading-relaxed font-medium">
                                {line}
                            </Text>
                        </View>
                    ))}
                </View>

                <View className="h-px bg-border/50 my-8 w-2/3 self-center" />

                {/* Doha End */}
                <View className="mb-10 bg-orange-50/50 p-6 rounded-[30px] border border-orange-100">
                    {data.doha_end.map((line, index) => (
                        <Text key={`doha_end_${index}`} style={{ fontSize: fontSize + 2 }} className="font-bold text-accent text-center mb-3 leading-loose italic">
                            {line}
                        </Text>
                    ))}
                </View>

                <View className="mt-12 items-center">
                    <Text className="text-lightText font-bold tracking-widest uppercase opacity-70">Jai Shri Ram</Text>
                    <View className="h-1.5 w-24 bg-primary/20 rounded-full mt-3" />
                </View>

                <View className="h-20" />
            </ScrollView>

            {/* Floating Controls Toggle */}
            <TouchableOpacity
                onPress={() => setShowControls(!showControls)}
                className="absolute right-6 bottom-6 w-14 h-14 bg-primary rounded-full items-center justify-center shadow-2xl"
                style={{ elevation: 10 }}
            >
                <Ionicons name={showControls ? "close" : "text"} size={24} color="white" />
            </TouchableOpacity>

            {/* Font Controls Panel */}
            {showControls && (
                <View
                    style={{ elevation: 20 }}
                    className="absolute bottom-24 right-6 left-6 bg-white/95 border border-border/50 rounded-3xl p-5 flex-row items-center justify-between shadow-2xl backdrop-blur-md"
                >
                    <Text className="font-bold text-text">Adjust Text Size</Text>
                    <View className="flex-row items-center">
                        <TouchableOpacity
                            onPress={() => setFontSize(Math.max(14, fontSize - 2))}
                            className="bg-border/20 w-10 h-10 rounded-full items-center justify-center mr-4"
                        >
                            <Ionicons name="remove" size={24} color={Colors.text} />
                        </TouchableOpacity>
                        <Text className="text-lg font-bold min-w-[30px] text-center">{fontSize}</Text>
                        <TouchableOpacity
                            onPress={() => setFontSize(Math.min(36, fontSize + 2))}
                            className="bg-border/20 w-10 h-10 rounded-full items-center justify-center ml-4"
                        >
                            <Ionicons name="add" size={24} color={Colors.text} />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
};
