import React, { useState } from 'react';
import { View, Text, ScrollView, NativeSyntheticEvent, NativeScrollEvent, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useLanguage } from '../context/LanguageContext';
import { Colors } from '../constants/Colors';
import { textLibrary } from '../data/TextLibrary';

export const ReaderScreen = () => {
    const route = useRoute<any>();
    const { textId } = route.params;
    const { language } = useLanguage();

    // @ts-ignore
    const textData = textLibrary[textId] ? (textLibrary[textId][language] || textLibrary[textId]['hi']) : null;

    const [fontSize, setFontSize] = useState(20);
    const [progress, setProgress] = useState(0);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const currentProgress = contentOffset.y / (contentSize.height - layoutMeasurement.height);
        setProgress(Math.min(Math.max(currentProgress, 0), 1));
    };

    if (!textData) {
        return (
            <View className="flex-1 justify-center items-center bg-background">
                <Text className="text-text text-lg">Text not found.</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-background">
            <View className="h-1 bg-border w-full">
                <View className="h-full bg-primary" style={{ width: `${progress * 100}%` }} />
            </View>

            <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }} onScroll={handleScroll} scrollEventThrottle={16}>
                <Text className="text-3xl font-bold text-primary text-center mb-6 mt-2">{textData.title}</Text>

                <View className="flex-row justify-center items-center mb-6 py-2 bg-[#FF9933]/10 rounded-xl">
                    <TouchableOpacity onPress={() => setFontSize(Math.max(14, fontSize - 2))} className="w-11 h-11 rounded-full bg-white justify-center items-center border border-border mx-4">
                        <Text className="text-lg font-bold text-primary">A-</Text>
                    </TouchableOpacity>
                    <Text className="text-base text-lightText font-bold">Text Size</Text>
                    <TouchableOpacity onPress={() => setFontSize(Math.min(36, fontSize + 2))} className="w-11 h-11 rounded-full bg-white justify-center items-center border border-border mx-4">
                        <Text className="text-lg font-bold text-primary">A+</Text>
                    </TouchableOpacity>
                </View>

                <View className="mb-6">
                    {textData.content.map((line: string, index: number) => (
                        <Text key={`line_${index}`} style={{ fontSize }} className="text-text text-center leading-[38px] mb-3">
                            {line}
                        </Text>
                    ))}
                </View>

                <View className="h-16" />
                <Text className="text-center text-lightText text-base mb-5">Jai Shri Ram</Text>
            </ScrollView>
        </View>
    );
};
