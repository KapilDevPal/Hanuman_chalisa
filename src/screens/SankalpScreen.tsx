import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useUser } from '../context/UserContext';
import { Colors } from '../constants/Colors';
import { Card } from '../components/Card';

export const SankalpScreen = () => {
    const { sankalp, startSankalp, updateSankalpProgress, resetSankalp } = useUser();

    const handleStart = (days: number) => {
        Alert.alert(
            'Confirm Sankalp',
            `Do you pledge to recite Hanuman Chalisa for ${days} days?`,
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Yes, I Pledge', onPress: () => startSankalp(days) }
            ]
        );
    };

    const handleMarkComplete = () => {
        Alert.alert(
            'Daily Completion',
            'Have you completed your reading today?',
            [
                { text: 'No', style: 'cancel' },
                { text: 'Yes', onPress: updateSankalpProgress }
            ]
        );
    };

    if (!sankalp.active) {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>New Sankalp (Pledge)</Text>
                <Text style={styles.subHeader}>Choose a duration for your discipline.</Text>

                <View style={styles.choices}>
                    {[11, 21, 40].map(days => (
                        <TouchableOpacity key={days} onPress={() => handleStart(days)}>
                            <Card style={styles.choiceCard}>
                                <Text style={styles.daysText}>{days}</Text>
                                <Text style={styles.daysLabel}>Days</Text>
                            </Card>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Your Sankalp Progress</Text>

            <View style={styles.progressContainer}>
                <View style={styles.circle}>
                    <Text style={styles.progressText}>{sankalp.daysCompleted}</Text>
                    <Text style={styles.totalText}>/ {sankalp.duration}</Text>
                </View>
            </View>

            <Text style={styles.statusText}>
                {sankalp.daysCompleted === sankalp.duration
                    ? "Sankalp Completed! Jai Hanuman!"
                    : "Keep going! You are doing great."}
            </Text>

            {sankalp.daysCompleted < sankalp.duration && (
                <TouchableOpacity style={styles.actionBtn} onPress={handleMarkComplete}>
                    <Text style={styles.actionBtnText}>Mark Today Complete</Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.resetBtn} onPress={() => {
                Alert.alert('Reset Sankalp', 'Are you sure?', [{ text: 'Cancel' }, { text: 'Reset', onPress: resetSankalp }])
            }}>
                <Text style={styles.resetText}>Abandon / Reset Sankalp</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 20,
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.primary,
        marginBottom: 10,
        marginTop: 20,
    },
    subHeader: {
        fontSize: 16,
        color: Colors.text,
        marginBottom: 30,
        textAlign: 'center',
    },
    choices: {
        flexDirection: 'row',
        gap: 15,
    },
    choiceCard: {
        width: 100,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
    },
    daysText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: Colors.accent,
    },
    daysLabel: {
        fontSize: 16,
        color: Colors.text,
    },
    progressContainer: {
        marginVertical: 40,
    },
    circle: {
        width: 180,
        height: 180,
        borderRadius: 90,
        borderWidth: 8,
        borderColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
    },
    progressText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    totalText: {
        fontSize: 24,
        color: Colors.lightText,
    },
    statusText: {
        fontSize: 18,
        color: Colors.text,
        marginBottom: 30,
        fontWeight: '600',
    },
    actionBtn: {
        backgroundColor: Colors.primary,
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 30,
        marginBottom: 20,
    },
    actionBtnText: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
    resetBtn: {
        padding: 10,
    },
    resetText: {
        color: Colors.accent,
    }
});
