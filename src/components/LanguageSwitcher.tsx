import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { LangBadge } from './ui';

type LangCode = 'hi' | 'en' | 'pa';

export const APP_LANGUAGES: { code: LangCode; label: string; name: string }[] = [
    { code: 'en', label: 'English', name: 'English' },
    { code: 'hi', label: 'हिंदी', name: 'Hindi' },
    { code: 'pa', label: 'ਪੰਜਾਬੀ', name: 'Punjabi' },
];

/** Initials button (e.g. "EN") that opens a quick app-language picker. */
export const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage } = useLanguage();
    const { colors } = useTheme();
    const insets = useSafeAreaInsets();
    const [open, setOpen] = useState(false);

    return (
        <>
            <TouchableOpacity onPress={() => setOpen(true)} activeOpacity={0.6} accessibilityLabel="Change app language">
                <LangBadge code={language} />
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
                        }}
                    >
                        {APP_LANGUAGES.map(lang => {
                            const isActive = lang.code === language;
                            return (
                                <TouchableOpacity
                                    key={lang.code}
                                    onPress={() => {
                                        setLanguage(lang.code);
                                        setOpen(false);
                                    }}
                                    activeOpacity={0.6}
                                    style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8 }}
                                >
                                    <LangBadge code={lang.code} active={isActive} size={34} />
                                    <Text style={{ flex: 1, marginLeft: 12, fontSize: 15, fontWeight: '600', color: colors.text }}>
                                        {lang.label}
                                    </Text>
                                    {isActive && <Ionicons name="checkmark" size={18} color={colors.primary} />}
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </Pressable>
            </Modal>
        </>
    );
};
