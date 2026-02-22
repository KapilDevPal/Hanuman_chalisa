import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Vibration, Animated, Easing } from 'react-native';
import { useUser } from '../context/UserContext';
import { Colors } from '../constants/Colors';
import { Card } from '../components/Card';

export const JaapScreen = () => {
    const { jaapCount, incrementJaap, resetDailyJaap } = useUser();
    const [target, setTarget] = useState(108);
    const [scaleValue] = useState(new Animated.Value(1));
    const [goalsCompleted, setGoalsCompleted] = useState(0);
    const [lastTap, setLastTap] = useState(0);

    useEffect(() => {
        if (target > 0) {
            setGoalsCompleted(Math.floor(jaapCount / target));
        }
    }, [jaapCount, target]);

    const handleTap = () => {
        // Prevent accidental double taps if too fast (debounce 100ms)
        const now = Date.now();
        if (now - lastTap < 100) return;
        setLastTap(now);

        incrementJaap(1);
        Vibration.vibrate(50); // Short vibration

        // Animate button
        Animated.sequence([
            Animated.timing(scaleValue, { toValue: 0.95, duration: 50, useNativeDriver: true, easing: Easing.linear }),
            Animated.timing(scaleValue, { toValue: 1, duration: 50, useNativeDriver: true, easing: Easing.linear })
        ]).start();

        // Check if target reached (vibrate longer)
        if ((jaapCount + 1) % target === 0) {
            Vibration.vibrate([0, 500, 200, 500]); // Pattern for completing a round
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.countLabel}>Today's Count</Text>
                <Text style={styles.mainCount}>{jaapCount}</Text>
                <Text style={styles.targetLabel}>Goal: {target} | Completed: {goalsCompleted}x</Text>
            </View>

            <View style={styles.counterContainer}>
                <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
                    <TouchableOpacity
                        style={styles.circleButton}
                        onPress={handleTap}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.buttonText}>RAM</Text>
                        <Text style={styles.subText}>Tap to Chant</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>

            <View style={styles.controls}>
                <Text style={styles.sectionTitle}>Set Goal</Text>
                <View style={styles.presets}>
                    {[11, 21, 51, 108, 1008].map(val => (
                        <TouchableOpacity
                            key={val}
                            style={[styles.presetBtn, target === val && styles.activePreset]}
                            onPress={() => setTarget(val)}
                        >
                            <Text style={[styles.presetText, target === val && styles.activePresetText]}>{val}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity style={styles.resetBtn} onPress={resetDailyJaap}>
                    <Text style={styles.resetText}>Reset Counter</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 20,
    },
    header: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    countLabel: {
        fontSize: 18,
        color: Colors.lightText,
    },
    mainCount: {
        fontSize: 64,
        fontWeight: 'bold',
        color: Colors.primary,
        fontVariant: ['tabular-nums'], // Monospaced numbers if supported
    },
    targetLabel: {
        fontSize: 16,
        color: Colors.accent,
        marginTop: 5,
    },
    counterContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleButton: {
        width: 250,
        height: 250,
        borderRadius: 125,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        shadowColor: Colors.text,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        borderWidth: 4,
        borderColor: Colors.secondary,
    },
    buttonText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: Colors.white,
    },
    subText: {
        fontSize: 16,
        color: Colors.white,
        opacity: 0.8,
        marginTop: 8,
    },
    controls: {
        paddingBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        color: Colors.text,
        marginBottom: 10,
        textAlign: 'center',
    },
    presets: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    presetBtn: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    activePreset: {
        backgroundColor: Colors.secondary,
        borderColor: Colors.primary,
    },
    presetText: {
        color: Colors.text,
        fontWeight: 'bold',
    },
    activePresetText: {
        color: Colors.text,
    },
    resetBtn: {
        alignItems: 'center',
        padding: 10,
    },
    resetText: {
        color: Colors.accent,
        fontSize: 14,
    }
});
