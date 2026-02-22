import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { Colors } from '../constants/Colors';
import { Card } from '../components/Card';

export const SettingsScreen = () => {
    const { language, setLanguage } = useLanguage();

    const renderLanguageOption = (langCode: 'hi' | 'en' | 'pa', label: string) => (
        <TouchableOpacity
            key={langCode}
            style={[
                styles.option,
                language === langCode && styles.selectedOption,
            ]}
            onPress={() => setLanguage(langCode)}
        >
            <Text style={[
                styles.optionText,
                language === langCode && styles.selectedOptionText
            ]}>
                {label}
            </Text>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.header}>Settings</Text>

            <Card>
                <Text style={styles.sectionTitle}>Language / भाषा / ਭਾਸ਼ਾ</Text>
                <View style={styles.optionsContainer}>
                    {renderLanguageOption('hi', 'हिंदी (Hindi)')}
                    {renderLanguageOption('en', 'English')}
                    {renderLanguageOption('pa', 'ਪੰਜਾਬੀ (Punjabi)')}
                </View>
            </Card>

            <Card>
                <Text style={styles.sectionTitle}>About</Text>
                <Text style={styles.text}>
                    Offline Hanuman Chalisa App v1.0.0
                </Text>
                <Text style={styles.text}>
                    Jai Bajrang Bali!
                </Text>
            </Card>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    content: {
        padding: 16,
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 20,
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.accent,
        marginBottom: 12,
    },
    optionsContainer: {
        flexDirection: 'column',
        gap: 10,
    },
    option: {
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.border,
        backgroundColor: Colors.white,
        marginBottom: 8,
    },
    selectedOption: {
        backgroundColor: Colors.secondary,
        borderColor: Colors.primary,
    },
    optionText: {
        fontSize: 16,
        color: Colors.text,
    },
    selectedOptionText: {
        fontWeight: 'bold',
        color: Colors.text,
    },
    text: {
        color: Colors.text,
        fontSize: 14,
        marginBottom: 8,
    }
});
