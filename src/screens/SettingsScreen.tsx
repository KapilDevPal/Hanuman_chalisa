import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Dimensions } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { Colors } from '../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export const SettingsScreen = () => {
    const { language, setLanguage } = useLanguage();
    const { jaapName, setJaapName } = useUser();

    const renderLanguageOption = (langCode: 'hi' | 'en' | 'pa', label: string, sublabel: string) => {
        const isActive = language === langCode;
        return (
            <TouchableOpacity
                key={langCode}
                className={`flex-row items-center p-4 rounded-3xl mb-3 border ${isActive ? 'bg-orange-50 border-primary' : 'bg-white border-gray-100 shadow-sm'}`}
                onPress={() => setLanguage(langCode)}
                activeOpacity={0.7}
            >
                <View className={`w-12 h-12 rounded-2xl items-center justify-center mr-4 ${isActive ? 'bg-primary' : 'bg-gray-50'}`}>
                    <Text className={`text-xl ${isActive ? 'text-white' : 'text-text'}`}>
                        {langCode === 'hi' ? 'क' : langCode === 'pa' ? 'ੳ' : 'A'}
                    </Text>
                </View>
                <View className="flex-1">
                    <Text className={`text-base font-bold ${isActive ? 'text-primary' : 'text-text'}`}>
                        {label}
                    </Text>
                    <Text className="text-xs text-lightText">{sublabel}</Text>
                </View>
                {isActive && (
                    <Ionicons name="checkmark-circle" size={24} color={Colors.primary} />
                )}
            </TouchableOpacity>
        );
    };

    return (
        <ScrollView className="flex-1 bg-[#fcfcfc]" showsVerticalScrollIndicator={false}>
            <View className="px-6 py-8">
                {/* Personalization Section */}
                <View className="mb-10">
                    <View className="flex-row items-center mb-5">
                        <View className="bg-blue-50 p-2 rounded-xl mr-3">
                            <Ionicons name="person" size={20} color="#2196F3" />
                        </View>
                        <Text className="text-xs font-black text-lightText uppercase tracking-widest">Personalization</Text>
                    </View>

                    <View className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-50">
                        <Text className="text-base font-bold text-text mb-2">Chant Name (Jaap)</Text>
                        <Text className="text-xs text-lightText mb-4">What do you chant? (e.g. RAM, OM, SITA RAM)</Text>
                        <View className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex-row items-center">
                            <MaterialCommunityIcons name="pencil" size={20} color={Colors.primary} className="mr-3" />
                            <TextInput
                                className="flex-1 text-base font-extrabold text-text px-2"
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
                <View className="mb-10">
                    <View className="flex-row items-center mb-5">
                        <View className="bg-orange-50 p-2 rounded-xl mr-3">
                            <Ionicons name="language" size={20} color={Colors.primary} />
                        </View>
                        <Text className="text-xs font-black text-lightText uppercase tracking-widest">Regional Settings</Text>
                    </View>
                    <View>
                        {renderLanguageOption('hi', 'हिंदी', 'Hindi Presentation')}
                        {renderLanguageOption('en', 'English', 'Global Standard')}
                        {renderLanguageOption('pa', 'ਪੰਜਾਬੀ', 'Punjabi Presentation')}
                    </View>
                </View>

                {/* App Info Section */}
                <View className="mb-10">
                    <View className="flex-row items-center mb-5">
                        <View className="bg-green-50 p-2 rounded-xl mr-3">
                            <Ionicons name="information-circle" size={20} color="#4CAF50" />
                        </View>
                        <Text className="text-xs font-black text-lightText uppercase tracking-widest">About App</Text>
                    </View>

                    <View className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-50">
                        <View className="flex-row items-center justify-between mb-4 pb-4 border-b border-gray-50">
                            <Text className="text-text font-bold">Version</Text>
                            <Text className="text-lightText font-black">1.3.0</Text>
                        </View>
                        <View className="flex-row items-center justify-between mb-4 pb-4 border-b border-gray-50">
                            <Text className="text-text font-bold">Build</Text>
                            <Text className="text-lightText font-black">9</Text>
                        </View>
                        <View className="items-center mt-2">
                            <Text className="text-lg font-black text-primary mb-1">Jai Bajrang Bali!</Text>
                            <Text className="text-xs text-lightText opacity-60">Made with devotion</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View className="h-20" />
        </ScrollView>
    );
};
