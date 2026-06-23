import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { Colors } from '../constants/Colors';

export const SettingsScreen = () => {
    const { language, setLanguage } = useLanguage();
    const { jaapName, setJaapName } = useUser();

    const renderLanguageOption = (langCode: 'hi' | 'en' | 'pa', label: string, sublabel: string) => {
        const isActive = language === langCode;
        return (
            <TouchableOpacity
                key={langCode}
                className={`flex-row items-center p-4 rounded-3xl mb-3 border ${isActive ? 'bg-[#FFF8EE] border-primary' : 'bg-white border-[#EADEC9] shadow-sm'}`}
                onPress={() => setLanguage(langCode)}
                activeOpacity={0.7}
            >
                <View className={`w-11 h-11 rounded-2xl items-center justify-center mr-4 ${isActive ? 'bg-primary' : 'bg-[#FAF7F0] border border-[#EADEC9]'}`}>
                    <Text className={`text-base font-extrabold ${isActive ? 'text-white' : 'text-text'}`}>
                        {langCode === 'hi' ? 'क' : langCode === 'pa' ? 'ੳ' : 'A'}
                    </Text>
                </View>
                <View className="flex-1">
                    <Text className={`text-sm font-extrabold ${isActive ? 'text-primary' : 'text-text'}`}>
                        {label}
                    </Text>
                    <Text className="text-[11px] text-lightText font-semibold mt-0.5">{sublabel}</Text>
                </View>
                {isActive && (
                    <Ionicons name="checkmark-circle" size={22} color={Colors.primary} />
                )}
            </TouchableOpacity>
        );
    };

    return (
        <ScrollView className="flex-1 bg-[#FAF7F0]" showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View className="px-6 pt-10 pb-4">
                <Text className="text-3xl font-black text-text">Settings</Text>
                <Text className="text-sm text-lightText font-semibold mt-1">
                    Personalize your devotional experience.
                </Text>
            </View>

            <View className="px-5 py-4">
                {/* Personalization Section */}
                <View className="mb-8">
                    <View className="flex-row items-center mb-4 ml-1">
                        <View className="bg-orange-100/60 p-1.5 rounded-lg mr-3">
                            <Ionicons name="person-outline" size={16} color={Colors.primary} />
                        </View>
                        <Text className="text-[10px] font-black text-lightText uppercase tracking-widest">Personalization</Text>
                    </View>

                    <View className="bg-white rounded-3xl p-5 shadow-sm border border-[#EADEC9]">
                        <Text className="text-sm font-extrabold text-text mb-1">Chant Name (Jaap)</Text>
                        <Text className="text-[11px] text-lightText font-semibold mb-4">What name do you repeat during chanting? (e.g. RAM, OM)</Text>
                        <View className="bg-[#FAF7F0] rounded-2xl p-3 border border-[#EADEC9] flex-row items-center">
                            <MaterialCommunityIcons name="pencil" size={18} color={Colors.primary} className="mr-3" />
                            <TextInput
                                className="flex-1 text-sm font-extrabold text-text px-2 py-1"
                                value={jaapName}
                                onChangeText={setJaapName}
                                maxLength={15}
                                placeholder="Enter Chant Name"
                                placeholderTextColor={Colors.lightText}
                            />
                        </View>
                    </View>
                </View>

                {/* Regional Section */}
                <View className="mb-8">
                    <View className="flex-row items-center mb-4 ml-1">
                        <View className="bg-orange-100/60 p-1.5 rounded-lg mr-3">
                            <Ionicons name="language-outline" size={16} color={Colors.primary} />
                        </View>
                        <Text className="text-[10px] font-black text-lightText uppercase tracking-widest">Regional Settings</Text>
                    </View>
                    <View>
                        {renderLanguageOption('hi', 'हिंदी (Hindi)', 'Traditional Hindi presentation')}
                        {renderLanguageOption('en', 'English (English)', 'Latin transliterated presentation')}
                        {renderLanguageOption('pa', 'ਪੰਜਾਬੀ (Punjabi)', 'Gurumukhi presentation')}
                    </View>
                </View>

                {/* App Info Section */}
                <View className="mb-8">
                    <View className="flex-row items-center mb-4 ml-1">
                        <View className="bg-orange-100/60 p-1.5 rounded-lg mr-3">
                            <Ionicons name="information-circle-outline" size={16} color={Colors.primary} />
                        </View>
                        <Text className="text-[10px] font-black text-lightText uppercase tracking-widest">About App</Text>
                    </View>

                    <View className="bg-white rounded-3xl p-5 shadow-sm border border-[#EADEC9]">
                        <View className="flex-row items-center justify-between mb-3 pb-3 border-b border-[#FAF7F0]">
                            <Text className="text-xs text-text font-bold">Version</Text>
                            <Text className="text-xs text-lightText font-extrabold">1.5.0</Text>
                        </View>
                        <View className="flex-row items-center justify-between mb-3 pb-3 border-b border-[#FAF7F0]">
                            <Text className="text-xs text-text font-bold">Build</Text>
                            <Text className="text-xs text-lightText font-extrabold">11</Text>
                        </View>
                        <View className="items-center mt-3">
                            <Text className="text-base font-black text-primary mb-1">Jai Bajrang Bali!</Text>
                            <Text className="text-[10px] text-lightText/60 font-semibold">Made with devotion</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View className="h-24" />
        </ScrollView>
    );
};
