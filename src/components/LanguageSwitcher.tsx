import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Pressable, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { LangBadge } from './ui';
import { CHALISA_LANGUAGES } from '../data/chalisaLanguages';

const CONTENT_LANG_KEY = 'chalisa_content_lang';
const UI_CODES = ['en', 'hi', 'pa'];

type LangCode = 'hi' | 'en' | 'pa';

export const APP_LANGUAGES: { code: LangCode; label: string; name: string }[] = [
    { code: 'en', label: 'English', name: 'English' },
    { code: 'hi', label: 'हिंदी', name: 'Hindi' },
    { code: 'pa', label: 'ਪੰਜਾਬੀ', name: 'Punjabi' },
];

/**
 * Initials button (e.g. "EN") that opens a picker with every language.
 * App-UI languages (en/hi/pa) switch the whole app; the rest switch the
 * Chalisa reading language and leave the UI language unchanged.
 */
export const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage } = useLanguage();
    const { colors } = useTheme();
    const insets = useSafeAreaInsets();
    const [open, setOpen] = useState(false);
    const [readingLang, setReadingLang] = useState<string | null>(null);

    useFocusEffect(
        useCallback(() => {
            AsyncStorage.getItem(CONTENT_LANG_KEY).then(v => setReadingLang(v)).catch(() => { });
        }, [])
    );

    const active = readingLang ?? language;

    const pick = (code: string) => {
        if (UI_CODES.includes(code)) setLanguage(code as LangCode);
        setReadingLang(code);
        AsyncStorage.setItem(CONTENT_LANG_KEY, code).catch(() => { });
        setOpen(false);
    };

    return (
        <>
            <TouchableOpacity onPress={() => setOpen(true)} activeOpacity={0.6} accessibilityLabel="Change app language">
                <LangBadge code={active} />
            </TouchableOpacity>

            <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
                <Pressable style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' }} onPress={() => setOpen(false)}>
                    <View
                        style={{
                            position: 'absolute',
                            top: insets.top + 64,
                            right: 20,
                            backgroundColor: colors.surface,
                            borderRadius: 16,
                            borderWidth: 1,
                            borderColor: colors.border,
                            paddingVertical: 6,
                            minWidth: 200,
                            maxHeight: '70%',
                        }}
                    >
                      <ScrollView showsVerticalScrollIndicator={false}>
                        {CHALISA_LANGUAGES.map(lang => {
                            const isActive = lang.code === active;
                            return (
                                <TouchableOpacity
                                    key={lang.code}
                                    onPress={() => pick(lang.code)}
                                    activeOpacity={0.6}
                                    style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8 }}
                                >
                                    <LangBadge code={lang.code} active={isActive} size={34} />
                                    <Text style={{ flex: 1, marginLeft: 12, fontSize: 15, fontWeight: '600', color: colors.text }}>
                                        {lang.native}
                                    </Text>
                                    {isActive && <Ionicons name="checkmark" size={18} color={colors.primary} />}
                                </TouchableOpacity>
                            );
                        })}
                      </ScrollView>
                    </View>
                </Pressable>
            </Modal>
        </>
    );
};
