import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { Colors } from '../constants/Colors';
import { Card } from '../components/Card';

// Import JSONs
import hindiGuide from '../../assets/data/hi/prayer_guide.json';
import englishGuide from '../../assets/data/en/prayer_guide.json';
import punjabiGuide from '../../assets/data/pa/prayer_guide.json';

const guideMap = {
    hi: hindiGuide,
    en: englishGuide,
    pa: punjabiGuide,
};

export const PrayerGuideScreen = () => {
    const { language } = useLanguage();
    const [data, setData] = useState(guideMap['hi']);

    useEffect(() => {
        setData(guideMap[language] || guideMap['hi']);
    }, [language]);

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.header}>Way to Pray / विधि</Text>

            {data.steps.map((step, index) => (
                <View key={step.id} style={styles.stepContainer}>
                    <View style={styles.stepNumber}>
                        <Text style={styles.numberText}>{index + 1}</Text>
                    </View>
                    <Card style={styles.stepCard}>
                        <Text style={styles.stepTitle}>{step.title}</Text>
                        <Text style={styles.stepDesc}>{step.description}</Text>
                    </Card>
                </View>
            ))}
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
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.primary,
        marginBottom: 20,
        textAlign: 'center',
    },
    stepContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    stepNumber: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        marginTop: 12,
    },
    numberText: {
        fontWeight: 'bold',
        color: Colors.text,
        fontSize: 18,
    },
    stepCard: {
        flex: 1,
    },
    stepTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 4,
    },
    stepDesc: {
        fontSize: 16,
        color: Colors.lightText,
        lineHeight: 22,
    }
});
