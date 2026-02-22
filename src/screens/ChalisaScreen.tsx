import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { Colors } from '../constants/Colors';

import hindiChalisa from '../../assets/data/hi/chalisa.json';
import englishChalisa from '../../assets/data/en/chalisa.json';
import punjabiChalisa from '../../assets/data/pa/chalisa.json';

const dataMap = {
    hi: hindiChalisa,
    en: englishChalisa,
    pa: punjabiChalisa,
};

export const ChalisaScreen = () => {
    const { language } = useLanguage();
    const [data, setData] = useState(dataMap['hi']);
    const [fontSize, setFontSize] = useState(22);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        setData(dataMap[language] || dataMap['hi']);
    }, [language]);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const paddingToBottom = 20;
        const currentProgress = contentOffset.y / (contentSize.height - layoutMeasurement.height);
        setProgress(Math.min(Math.max(currentProgress, 0), 1));
    };

    return (
        <View style={styles.container}>
            {/* Progress Bar */}
            <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                <Text style={styles.title}>{data.title}</Text>

                <View style={styles.section}>
                    {data.doha_start.map((line, index) => (
                        <Text key={`doha_start_${index}`} style={[styles.dohaText, { fontSize: fontSize }]}>
                            {line}
                        </Text>
                    ))}
                </View>
                <View style={styles.divider} />

                <View style={styles.section}>
                    {data.chaupai.map((line, index) => (
                        <View key={`chaupai_${index}`} style={styles.verseContainer}>
                            {/* Removed verse number as requested */}
                            <Text style={[styles.text, { fontSize: fontSize }]}>
                                {line}
                            </Text>
                        </View>
                    ))}
                </View>

                <View style={styles.divider} />

                <View style={styles.section}>
                    {data.doha_end.map((line, index) => (
                        <Text key={`doha_end_${index}`} style={[styles.dohaText, { fontSize: fontSize }]}>
                            {line}
                        </Text>
                    ))}
                </View>

                <View style={{ height: 60 }} />
                <Text style={styles.footer}>Jai Shri Ram</Text>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    progressBarBg: {
        height: 4,
        backgroundColor: Colors.border,
        width: '100%',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: Colors.primary,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.primary,
        textAlign: 'center',
        marginBottom: 24,
        marginTop: 8,
    },
    section: {
        marginBottom: 24,
    },
    dohaText: {
        fontWeight: 'bold',
        color: Colors.accent,
        textAlign: 'center',
        marginBottom: 8,
        lineHeight: 34,
    },
    verseContainer: {
        marginBottom: 16,
        // alignItems: 'center', // Center verses for better flow without numbers?
    },
    text: {
        color: Colors.text,
        textAlign: 'left', // Keep left or maybe center now that numbers are gone?
        lineHeight: 34,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.border,
        marginVertical: 16,
        width: '60%',
        alignSelf: 'center',
    },
    footer: {
        textAlign: 'center',
        color: Colors.lightText,
        fontSize: 16,
        marginBottom: 20,
    }
});
