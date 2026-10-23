import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, Easing, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface SonarButtonProps {
    onPress: () => void;
    label: string;
    sublabel: string;
    size?: number;
}

export const SonarButton: React.FC<SonarButtonProps> = ({ onPress, label, sublabel, size = 220 }) => {
    const { colors } = useTheme();
    // Single ring per tap — clean, crisp animation
    const ring = useRef(new Animated.Value(0)).current;
    const buttonScale = useRef(new Animated.Value(1)).current;
    // Track if ring animation is running so we can restart cleanly
    const ringAnim = useRef<Animated.CompositeAnimation | null>(null);

    const fireRing = () => {
        // Stop any existing ring animation and restart immediately
        if (ringAnim.current) {
            ringAnim.current.stop();
        }
        ring.setValue(0);
        ringAnim.current = Animated.timing(ring, {
            toValue: 1,
            duration: 650,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
        });
        ringAnim.current.start(() => {
            ringAnim.current = null;
        });
    };

    const handlePressIn = () => {
        Animated.spring(buttonScale, {
            toValue: 0.94,
            useNativeDriver: true,
            friction: 8,
            tension: 100,
        }).start();
        fireRing();
    };

    const handlePressOut = () => {
        Animated.spring(buttonScale, {
            toValue: 1,
            friction: 4,
            tension: 60,
            useNativeDriver: true,
        }).start();
        onPress();
    };

    const ringScale = ring.interpolate({ inputRange: [0, 1], outputRange: [1, 1.6] });
    const ringOpacity = ring.interpolate({ inputRange: [0, 0.4, 1], outputRange: [0.35, 0.15, 0] });
    const circle = { width: size, height: size, borderRadius: size / 2 };

    return (
        <View style={styles.container}>
            <Animated.View
                style={[styles.ring, circle, { backgroundColor: colors.primary, transform: [{ scale: ringScale }], opacity: ringOpacity }]}
            />
            <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    accessibilityRole="button"
                    accessibilityLabel={`${sublabel}: ${label}`}
                    style={[styles.button, circle, { backgroundColor: colors.primary }]}
                >
                    <Text style={[styles.label, { color: colors.onPrimary }]} adjustsFontSizeToFit numberOfLines={1}>
                        {label}
                    </Text>
                    <Text style={[styles.sublabel, { color: colors.onPrimary }]}>{sublabel}</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 48,
    },
    ring: {
        position: 'absolute',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    label: {
        fontSize: 40,
        fontWeight: '800',
        textAlign: 'center',
    },
    sublabel: {
        fontSize: 14,
        fontWeight: '600',
        opacity: 0.8,
        marginTop: 6,
    },
});
