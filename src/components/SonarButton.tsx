import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, Easing, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

interface SonarButtonProps {
    onPress: () => void;
    label: string;
}

export const SonarButton: React.FC<SonarButtonProps> = ({ onPress, label }) => {
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
            duration: 700,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
        });
        ringAnim.current.start(() => {
            ringAnim.current = null;
        });
    };

    const handlePressIn = () => {
        Animated.spring(buttonScale, {
            toValue: 0.92,
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

    const ringScale = ring.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 2.2],
    });
    const ringOpacity = ring.interpolate({
        inputRange: [0, 0.4, 1],
        outputRange: [0.55, 0.2, 0],
    });

    return (
        <View style={styles.container}>
            {/* Single wave ring */}
            <Animated.View
                style={[
                    styles.ring,
                    {
                        transform: [{ scale: ringScale }],
                        opacity: ringOpacity,
                    },
                ]}
            />

            {/* Main Button */}
            <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    style={styles.button}
                >
                    <Text style={styles.label} adjustsFontSizeToFit numberOfLines={1}>
                        {label}
                    </Text>
                    <Text style={styles.sublabel}>Tap to Chant</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ring: {
        position: 'absolute',
        width: 224,
        height: 224,
        borderRadius: 112,
        backgroundColor: Colors.primary,
        borderWidth: 0,
    },
    button: {
        width: 224,
        height: 224,
        borderRadius: 112,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 14,
        shadowColor: Colors.primary,
        shadowOpacity: 0.45,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 6 },
        // Inner highlight border
        borderWidth: 3,
        borderColor: 'rgba(255, 218, 140, 0.35)',
        paddingHorizontal: 20,
    },
    label: {
        fontSize: 44,
        fontWeight: '900',
        color: '#fff',
        textAlign: 'center',
        letterSpacing: 0.5,
    },
    sublabel: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.75)',
        fontWeight: '600',
        marginTop: 6,
        letterSpacing: 0.3,
    },
});
