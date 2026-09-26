import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Constants from 'expo-constants';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import { useT } from '../hooks/useT';
import { Colors } from '../constants/Colors';
import { ThemeToggle } from '../components/ThemeToggle';

export const SettingsScreen = () => {
    const { language, setLanguage } = useLanguage();
    const { colors: theme, isDark } = useTheme();
    const { jaapName, setJaapName } = useUser();
    const { T } = useT();
    const appVersion = Constants.expoConfig?.version ?? '1.7.0';
    const buildNumber = Constants.expoConfig?.android?.versionCode ?? 17;

    const renderLanguageOption = (langCode: 'hi' | 'en' | 'pa', label: string, sublabel: string) => {
        const isActive = language === langCode;
        return (
            <TouchableOpacity
                key={langCode}
                style={{
                    backgroundColor: isActive ? (isDark ? '#3A2914' : '#FFF8EE') : theme.card,
                    borderColor: isActive ? Colors.primary : theme.border,
                }}
                className="flex-row items-center p-4 rounded-3xl mb-3 border shadow-sm"
                onPress={() => setLanguage(langCode)}
                activeOpacity={0.7}
            >
                <View
                    style={{ backgroundColor: isActive ? Colors.primary : theme.background, borderColor: theme.border }}
                    className="w-11 h-11 rounded-2xl items-center justify-center mr-4 border"
                >
                    <Text style={{ color: isActive ? '#fff' : theme.text }} className="text-base font-extrabold">
                        {langCode === 'hi' ? 'क' : langCode === 'pa' ? 'ੳ' : 'A'}
                    </Text>
                </View>
                <View className="flex-1">
                    <Text style={{ color: isActive ? Colors.primary : theme.text }} className="text-sm font-extrabold">{label}</Text>
                    <Text style={{ color: theme.lightText }} className="text-[11px] font-semibold mt-0.5">{sublabel}</Text>
                </View>
                {isActive && <Ionicons name="checkmark-circle" size={22} color={Colors.primary} />}
            </TouchableOpacity>
        );
    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: theme.background }} showsVerticalScrollIndicator={false}>
            <View className="px-6 pt-10 pb-4">
                <Text style={{ color: theme.text }} className="text-3xl font-black">{T('settings_title')}</Text>
                <Text style={{ color: theme.lightText }} className="text-sm font-semibold mt-1">{T('settings_subtitle')}</Text>
            </View>
            <View className="px-5 py-4">
                {/* Personalization */}
                <View className="mb-8">
                    <View className="flex-row items-center mb-4 ml-1">
                        <View className="bg-orange-100/60 p-1.5 rounded-lg mr-3">
                            <Ionicons name="person-outline" size={16} color={Colors.primary} />
                        </View>
                        <Text style={{ color: theme.lightText }} className="text-[10px] font-black uppercase tracking-widest">{T('settings_personal')}</Text>
                    </View>
                    <View style={{ backgroundColor: theme.card, borderColor: theme.border }} className="rounded-3xl p-5 shadow-sm border">
                        <Text style={{ color: theme.text }} className="text-sm font-extrabold mb-1">{T('settings_chant_name')}</Text>
                        <Text style={{ color: theme.lightText }} className="text-[11px] font-semibold mb-4">{T('settings_chant_hint')}</Text>
                        <View style={{ backgroundColor: theme.background, borderColor: theme.border }} className="rounded-2xl p-3 border flex-row items-center">
                            <MaterialCommunityIcons name="pencil" size={18} color={Colors.primary} className="mr-3" />
                            <TextInput
                                style={{ color: theme.text }}
                                className="flex-1 text-sm font-extrabold px-2 py-1"
                                value={jaapName}
                                onChangeText={setJaapName}
                                maxLength={15}
                                placeholder={T('settings_chant_ph')}
                                placeholderTextColor={Colors.lightText}
                            />
                        </View>
                    </View>
                </View>
                {/* Appearance */}
                <View className="mb-8">
                    <View className="flex-row items-center mb-4 ml-1">
                        <View className="bg-orange-100/60 p-1.5 rounded-lg mr-3">
                            <Ionicons name="contrast-outline" size={16} color={Colors.primary} />
                        </View>
                        <Text style={{ color: theme.lightText }} className="text-[10px] font-black uppercase tracking-widest">{T('settings_appearance')}</Text>
                    </View>
                    <View
                        style={{ backgroundColor: theme.card, borderColor: theme.border }}
                        className="rounded-3xl p-5 shadow-sm border flex-row items-center justify-between"
                    >
                        <View className="flex-1 mr-3">
                            <Text style={{ color: theme.text }} className="text-sm font-extrabold mb-1">
                                {isDark ? T('settings_dark_mode') : T('settings_light_mode')}
                            </Text>
                            <Text style={{ color: theme.lightText }} className="text-[11px] font-semibold">
                                {T('settings_appearance_hint')}
                            </Text>
                        </View>
                        <ThemeToggle variant="panel" />
                    </View>
                </View>
                {/* Regional */}
                <View className="mb-8">
                    <View className="flex-row items-center mb-4 ml-1">
                        <View className="bg-orange-100/60 p-1.5 rounded-lg mr-3">
                            <Ionicons name="language-outline" size={16} color={Colors.primary} />
                        </View>
                        <Text style={{ color: theme.lightText }} className="text-[10px] font-black uppercase tracking-widest">{T('settings_regional')}</Text>
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
                        <Text style={{ color: theme.lightText }} className="text-[10px] font-black uppercase tracking-widest">{T('settings_about')}</Text>
                    </View>
                    <View style={{ backgroundColor: theme.card, borderColor: theme.border }} className="rounded-3xl p-5 shadow-sm border">
                        <View style={{ borderColor: theme.background }} className="flex-row items-center justify-between mb-3 pb-3 border-b">
                            <Text style={{ color: theme.text }} className="text-xs font-bold">{T('settings_version')}</Text>
                            <Text style={{ color: theme.lightText }} className="text-xs font-extrabold">{appVersion}</Text>
                        </View>
                        <View style={{ borderColor: theme.background }} className="flex-row items-center justify-between mb-3 pb-3 border-b">
                            <Text style={{ color: theme.text }} className="text-xs font-bold">{T('settings_build')}</Text>
                            <Text style={{ color: theme.lightText }} className="text-xs font-extrabold">{buildNumber}</Text>
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
