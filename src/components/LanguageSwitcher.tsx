import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Pressable } from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { useT } from '../hooks/useT';

type LangCode = 'hi' | 'en' | 'pa';

const LANGUAGES: { code: LangCode; flag: string; label: string }[] = [
    { code: 'hi', flag: '🇮🇳', label: 'हिंदी' },
    { code: 'en', flag: '🇬🇧', label: 'English' },
    { code: 'pa', flag: '🇮🇳', label: 'ਪੰਜਾਬੀ' },
];

interface LanguageSwitcherProps {
    variant?: 'header' | 'panel';
}

/** Flag button in the top nav bar that opens a quick language picker. */
export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ variant = 'header' }) => {
    const { language, setLanguage } = useLanguage();
    const { T } = useT();
    const [open, setOpen] = useState(false);

    const current = LANGUAGES.find(l => l.code === language) ?? LANGUAGES[0];

    const headerButtonStyle = {
        backgroundColor: 'rgba(255,255,255,0.18)',
        borderRadius: 16,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.3)',
        flexDirection: 'row' as const,
        alignItems: 'center' as const,
    };

    return (
        <>
            <TouchableOpacity
                onPress={() => setOpen(true)}
                activeOpacity={0.7}
                style={headerButtonStyle}
            >
                <Text style={{ fontSize: 16 }}>{current.flag}</Text>
            </TouchableOpacity>

            <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
                <Pressable
                    style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.35)' }}
                    onPress={() => setOpen(false)}
                >
                    <View
                        style={{
                            position: 'absolute',
                            top: 100,
                            right: 20,
                            backgroundColor: '#fff',
                            borderRadius: 18,
                            paddingVertical: 8,
                            minWidth: 170,
                            shadowColor: '#000',
                            shadowOpacity: 0.15,
                            shadowRadius: 12,
                            shadowOffset: { width: 0, height: 6 },
                            elevation: 8,
                        }}
                    >
                        {LANGUAGES.map(lang => {
                            const isActive = lang.code === language;
                            return (
                                <TouchableOpacity
                                    key={lang.code}
                                    onPress={() => {
                                        setLanguage(lang.code);
                                        setOpen(false);
                                    }}
                                    activeOpacity={0.7}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        paddingHorizontal: 16,
                                        paddingVertical: 10,
                                        backgroundColor: isActive ? '#FFF4E6' : 'transparent',
                                    }}
                                >
                                    <Text style={{ fontSize: 18, marginRight: 10 }}>{lang.flag}</Text>
                                    <Text style={{ fontSize: 13, fontWeight: '800', color: isActive ? '#FF9933' : '#3A2D1B' }}>
                                        {lang.label}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </Pressable>
            </Modal>
        </>
    );
};
