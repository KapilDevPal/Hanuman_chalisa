import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useT } from '../hooks/useT';
import { CHALISA_LANGUAGES } from '../data/chalisaLanguages';
import { Screen, LangBadge } from '../components/ui';

/** iOS-style grouped list for choosing the Chalisa reading language. */
export const ChalisaLanguageScreen = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { colors } = useTheme();
    const { T } = useT();
    const [query, setQuery] = useState('');
    const currentCode: string = route.params?.current;

    const q = query.trim().toLowerCase();
    const languages = q
        ? CHALISA_LANGUAGES.filter(l => l.name.toLowerCase().includes(q) || l.native.toLowerCase().includes(q) || l.code.includes(q))
        : CHALISA_LANGUAGES;

    const select = (code: string) => navigation.popTo('ChalisaMain', { lang: code });

    return (
        <Screen keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingTop: 8 }}>
            {/* Search */}
            <View
                style={{
                    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surfaceAlt,
                    borderRadius: 12, paddingHorizontal: 10, height: 40, marginBottom: 24,
                }}
            >
                <Ionicons name="search" size={18} color={colors.textMuted} />
                <TextInput
                    value={query}
                    onChangeText={setQuery}
                    placeholder={T('chalisa_search')}
                    placeholderTextColor={colors.textMuted}
                    autoCorrect={false}
                    style={{ flex: 1, marginLeft: 6, fontSize: 16, color: colors.text, paddingVertical: 0 }}
                />
                {!!query && (
                    <TouchableOpacity onPress={() => setQuery('')} hitSlop={10} accessibilityLabel="Clear search">
                        <Ionicons name="close-circle" size={18} color={colors.textMuted} />
                    </TouchableOpacity>
                )}
            </View>

            {/* Grouped list */}
            <Text style={{ fontSize: 13, color: colors.textMuted, textTransform: 'uppercase', marginLeft: 16, marginBottom: 6 }}>
                {T('chalisa_lang_count', { n: languages.length })}
            </Text>
            <View style={{ backgroundColor: colors.surface, borderRadius: 12, overflow: 'hidden' }}>
                {languages.map((lang, index) => {
                    const isActive = lang.code === currentCode;
                    return (
                        <TouchableOpacity
                            key={lang.code}
                            onPress={() => select(lang.code)}
                            activeOpacity={0.6}
                            style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 16, minHeight: 58 }}
                        >
                            <LangBadge code={lang.code} active={isActive} size={32} />
                            <View
                                style={{
                                    flex: 1, flexDirection: 'row', alignItems: 'center', alignSelf: 'stretch', marginLeft: 14, paddingRight: 16,
                                    borderBottomWidth: index === languages.length - 1 ? 0 : 0.5, borderBottomColor: colors.border,
                                }}
                            >
                                <View style={{ flex: 1, paddingVertical: 9 }}>
                                    <Text style={{ fontSize: 17, color: colors.text }}>{lang.native}</Text>
                                    <Text style={{ fontSize: 13, color: colors.textMuted, marginTop: 1 }}>{lang.name}</Text>
                                </View>
                                {isActive && <Ionicons name="checkmark" size={22} color={colors.primary} />}
                            </View>
                        </TouchableOpacity>
                    );
                })}
                {languages.length === 0 && (
                    <Text style={{ fontSize: 15, color: colors.textMuted, textAlign: 'center', paddingVertical: 20 }}>{T('chalisa_no_match')}</Text>
                )}
            </View>
        </Screen>
    );
};
