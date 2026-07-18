import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { useT } from '../hooks/useT';
import { Colors } from '../constants/Colors';

export const SettingsScreen = () => {
    const { language, setLanguage } = useLanguage();
    const { jaapName, setJaapName } = useUser();
    const { T } = useT();

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
                    <Text className={`text-sm font-extrabold ${isActive ? 'text-primary' : 'text-text'}`}>{label}</Text>
                    <Text className="text-[11px] text-lightText font-semibold mt-0.5">{sublabel}</Text>
                </View>
                {isActive && <Ionicons name="checkmark-circle" size={22} color={Colors.primary} />}
            </TouchableOpacity>
        );
    };

    return (
        <ScrollView className="flex-1 bg-[#FAF7F0]" showsVerticalScrollIndicator={false}>
            <View className="px-6 pt-10 pb-4">
                <Text className="text-3xl font-black text-text">{T('settings_title')}</Text>
                <Text className="text-sm text-lightText font-semibold mt-1">{T('settings_subtitle')}</Text>
            </View>
            <View className="px-5 py-4">
                {/* Personalization */}
                <View className="mb-8">
                    <View className="flex-row items-center mb-4 ml-1">
                        <View className="bg-orange-100/60 p-1.5 rounded-lg mr-3">
                            <Ionicons name="person-outline" size={16} color={Colors.primary} />
                        </View>
                        <Text className="text-[10px] font-black text-lightText uppercase tracking-widest">{T('settings_personal')}</Text>
                    </View>
                    <View className="bg-white rounded-3xl p-5 shadow-sm border border-[#EADEC9]">
                        <Text className="text-sm font-extrabold text-text mb-1">{T('settings_chant_name')}</Text>
                        <Text className="text-[11px] text-lightText font-semibold mb-4">{T('settings_chant_hint')}</Text>
                        <View className="bg-[#FAF7F0] rounded-2xl p-3 border border-[#EADEC9] flex-row items-center">
                            <MaterialCommunityIcons name="pencil" size={18} color={Colors.primary} className="mr-3" />
                            <TextInput
                                className="flex-1 text-sm font-extrabold text-text px-2 py-1"
                                value={jaapName}
                                onChangeText={setJaapName}
                                maxLength={15}
                                placeholder={T('settings_chant_ph')}
                                placeholderTextColor={Colors.lightText}
                            />
                        </View>
                    </View>
                </View>
                {/* Regional */}
                <View className="mb-8">
                    <View className="flex-row items-center mb-4 ml-1">
                        <View className="bg-orange-100/60 p-1.5 rounded-lg mr-3">
                            <Ionicons name="language-outline" size={16} color={Colors.primary} />
                        </View>
                        <Text className="text-[10px] font-black text-lightText uppercase tracking-widest">{T('settings_regional')}</Text>
                    </View>
                    <View>
                        {renderLanguageOption('hi', T('settings_hi_label'), T('settings_hi_sub'))}
                        {renderLanguageOption('en', T('settings_en_label'), T('settings_en_sub'))}
                        {renderLanguageOption('pa', T('settings_pa_label'), T('settings_pa_sub'))}
                    </View>
                </View>
                {/* About */}
                <View className="mb-8">
                    <View className="flex-row items-center mb-4 ml-1">
                        <View className="bg-orange-100/60 p-1.5 rounded-lg mr-3">
                            <Ionicons name="information-circle-outline" size={16} color={Colors.primary} />
                        </View>
                        <Text className="text-[10px] font-black text-lightText uppercase tracking-widest">{T('settings_about')}</Text>
                    </View>
                    <View className="bg-white rounded-3xl p-5 shadow-sm border border-[#EADEC9]">
                        <View className="flex-row items-center justify-between mb-3 pb-3 border-b border-[#FAF7F0]">
                            <Text className="text-xs text-text font-bold">{T('settings_version')}</Text>
                            <Text className="text-xs text-lightText font-extrabold">1.6.0</Text>
                        </View>
                        <View className="flex-row items-center justify-between mb-3 pb-3 border-b border-[#FAF7F0]">
                            <Text className="text-xs text-text font-bold">{T('settings_build')}</Text>
                            <Text className="text-xs text-lightText font-extrabold">13</Text>
                        </View>
                        <View className="items-center mt-3">
                            <Text className="text-base font-black text-primary mb-1">{T('settings_bless')}</Text>
                            <Text className="text-[10px] text-lightText/60 font-semibold">{T('settings_devotion')}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View className="h-24" />
        </ScrollView>
    );
};
