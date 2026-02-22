import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

const PlaceholderScreen = ({ title }: { title: string }) => (
    <View style={styles.container}>
        <Text style={styles.text}>{title} (Coming Soon)</Text>
    </View>
);

export const ChalisaScreen = () => <PlaceholderScreen title="Chalisa Reading" />;
export const JaapScreen = () => <PlaceholderScreen title="Jaap Counter" />;
export const SankalpScreen = () => <PlaceholderScreen title="Sankalp Mode" />;
export const WisdomScreen = () => <PlaceholderScreen title="Daily Wisdom" />;
export const PrayerGuideScreen = () => <PlaceholderScreen title="Way to Pray" />;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        color: Colors.text,
    }
});
