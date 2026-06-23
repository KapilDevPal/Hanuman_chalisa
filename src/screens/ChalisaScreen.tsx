import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, NativeSyntheticEvent, NativeScrollEvent, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLanguage } from '../context/LanguageContext';
import { Colors } from '../constants/Colors';

import hindiChalisa from '../../assets/data/hi/chalisa.json';
import englishChalisa from '../../assets/data/en/chalisa.json';
import punjabiChalisa from '../../assets/data/pa/chalisa.json';

const dataMap = { hi: hindiChalisa, en: englishChalisa, pa: punjabiChalisa };

export const ChalisaScreen = () => {
    const { language, setLanguage } = useLanguage();
    const [data, setData] = useState(dataMap['hi']);
    const [fontSize, setFontSize] = useState(20);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        setData(dataMap[language] || dataMap['hi']);
    }, [language]);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const currentProgress = contentOffset.y / (contentSize.height - layoutMeasurement.height);
        setProgress(Math.min(Math.max(currentProgress, 0), 1));
    };

    return (
        <View className="flex-1 bg-[#FAF7F0]">
            {/* Progress Bar */}
            <View className="h-1.5 bg-border/20 w-full relative z-10">
                <View className="h-full bg-primary" style={{ width: `${progress * 100}%` }} />
            </View>

            {/* Scrollable Chalisa Verses */}
            <ScrollView
                contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 100 }}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
            >
                {/* Title Card */}
                <View className="items-center mb-6">
                    <Text className="text-3xl font-black text-primary text-center leading-tight tracking-wide">
                        {data.title}
                    </Text>
                    <View className="flex-row items-center justify-center mt-3">
                        <View className="h-[1.5px] w-8 bg-primary/30" />
                        <MaterialCommunityIcons name="om" size={18} color={Colors.primary} className="mx-3" />
                        <View className="h-[1.5px] w-8 bg-primary/30" />
                    </View>
                </View>

                {/* Inline Controls Card (Font & Language) */}
                <View className="mb-6 bg-white border border-[#EADEC9] rounded-2xl p-4 shadow-sm">
                    <View className="flex-row items-center justify-between">
                        {/* Quick Language Toggle */}
                        <View className="flex-row bg-[#FAF7F0] border border-[#EADEC9]/80 p-0.5 rounded-xl">
                            {[
                                { code: 'hi', label: 'हिन्दी' },
                                { code: 'en', label: 'EN' },
                                { code: 'pa', label: 'PA' }
                            ].map((item) => {
                                const isActive = language === item.code;
                                return (
                                    <TouchableOpacity
                                        key={item.code}
                                        onPress={() => setLanguage(item.code as any)}
                                        className={`px-3 py-1.5 rounded-lg ${isActive ? 'bg-primary' : ''}`}
                                        activeOpacity={0.8}
                                    >
                                        <Text className={`font-extrabold text-[10px] ${isActive ? 'text-white' : 'text-[#5C4A33]'}`}>
                                            {item.label}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>

                        {/* Quick Font Adjust */}
                        <View className="flex-row items-center bg-[#FAF7F0] border border-[#EADEC9]/80 rounded-xl px-2 py-0.5">
                            <TouchableOpacity
                                onPress={() => setFontSize(Math.max(14, fontSize - 2))}
                                className="p-1.5"
                                activeOpacity={0.8}
                            >
                                <Ionicons name="remove-circle-outline" size={16} color="#5C4A33" />
                            </TouchableOpacity>
                            <View className="px-1 min-w-[28px] items-center flex-row justify-center">
                                <Text className="font-black text-xs text-[#5C4A33]">{fontSize}</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => setFontSize(Math.min(36, fontSize + 2))}
                                className="p-1.5"
                                activeOpacity={0.8}
                            >
                                <Ionicons name="add-circle-outline" size={16} color="#5C4A33" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Doha Start */}
                <View className="mb-6 bg-[#FFF8EE] p-6 rounded-3xl border border-[#FFD59A] shadow-sm">
                    <View className="items-center mb-4">
                        <Text className="text-[10px] font-black text-[#FF9933] tracking-widest uppercase bg-[#FF9933]/15 px-3 py-1 rounded-full">
                            Doha • दोहा
                        </Text>
                    </View>
                    {data.doha_start.map((line, index) => (
                        <Text 
                            key={`doha_start_${index}`} 
                            style={{ fontSize: fontSize + 1, lineHeight: (fontSize + 1) * 1.6 }} 
                            className="font-extrabold text-[#5C3A00] text-center mb-2.5"
                        >
                            {line}
                        </Text>
                    ))}
                </View>

                {/* Chaupai Couplets */}
                <View className="mb-6">
                    {data.chaupai.map((line, index) => (
                        <View 
                            key={`chaupai_${index}`} 
                            className="mb-4 bg-white border border-[#EADEC9] rounded-2xl p-5 shadow-sm"
                            style={{ elevation: 1 }}
                        >
                            <Text 
                                style={{ fontSize, lineHeight: fontSize * 1.6 }} 
                                className="text-[#3A2D1B] text-center font-bold"
                            >
                                {line}
                            </Text>
                            
                            {/* Couplet Number Badge */}
                            <View className="flex-row items-center justify-center mt-3.5">
                                <View className="h-[1px] w-8 bg-[#EADEC9]/60" />
                                <Text className="mx-2.5 text-[#FF9933] font-black text-xs">
                                    {index + 1}
                                </Text>
                                <View className="h-[1px] w-8 bg-[#EADEC9]/60" />
                            </View>
                        </View>
                    ))}
                </View>

                {/* Doha End */}
                <View className="mb-8 bg-[#FFF8EE] p-6 rounded-3xl border border-[#FFD59A] shadow-sm">
                    <View className="items-center mb-4">
                        <Text className="text-[10px] font-black text-[#FF9933] tracking-widest uppercase bg-[#FF9933]/15 px-3 py-1 rounded-full">
                            Doha • दोहा
                        </Text>
                    </View>
                    {data.doha_end.map((line, index) => (
                        <Text 
                            key={`doha_end_${index}`} 
                            style={{ fontSize: fontSize + 1, lineHeight: (fontSize + 1) * 1.6 }} 
                            className="font-extrabold text-[#5C3A00] text-center mb-2.5"
                        >
                            {line}
                        </Text>
                    ))}
                </View>

                {/* Footer Chant / Ending */}
                <View className="mt-8 items-center">
                    <Text className="text-[#5C4A33]/60 font-black tracking-widest uppercase text-xs">
                        || इति श्री हनुमान चालीसा समाप्त ||
                    </Text>
                    <View className="h-[2px] w-24 bg-primary/20 rounded-full mt-4" />
                </View>
            </ScrollView>
        </View>
    );
};
