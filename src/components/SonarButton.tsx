import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, Easing, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

interface SonarButtonProps {
    onPress: () => void;
    label: string;
}

export const SonarButton: React.FC<SonarButtonProps> = ({ onPress, label }) => {
    // We'll create 3 animated values for the 3 expanding rings
    const ring1 = useRef(new Animated.Value(0)).current;
    const ring2 = useRef(new Animated.Value(0)).current;
    const ring3 = useRef(new Animated.Value(0)).current;

    const buttonScale = useRef(new Animated.Value(1)).current;

    const runRingAnimation = (animValue: Animated.Value, delay: number) => {
        animValue.setValue(0);
        Animated.sequence([
            Animated.delay(delay),
            Animated.timing(animValue, {
                toValue: 1,
                duration: 2000,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true,
            })
        ]).start();
    };

    const handlePressIn = () => {
        Animated.spring(buttonScale, {
            toValue: 0.9,
            useNativeDriver: true,
        }).start();

        // Trigger the rings on press
        runRingAnimation(ring1, 0);
        runRingAnimation(ring2, 200);
        runRingAnimation(ring3, 400);
    };

    const handlePressOut = () => {
        Animated.spring(buttonScale, {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
        }).start();
        onPress();
    };

    const getRingStyle = (animValue: Animated.Value) => ({
        transform: [
            {
                scale: animValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 2.5],
                }),
            },
        ],
        opacity: animValue.interpolate({
            inputRange: [0, 0.7, 1],
            outputRange: [0.6, 0.2, 0],
        }),
    });

    return (
        <View className="items-center justify-center flex-1">
            {/* The Sonar Rings */}
            <Animated.View style={[styles.ring, getRingStyle(ring1)]} />
            <Animated.View style={[styles.ring, getRingStyle(ring2)]} />
            <Animated.View style={[styles.ring, getRingStyle(ring3)]} />

            {/* The Main Button */}
            <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    className="w-56 h-56 rounded-full bg-primary items-center justify-center shadow-lg border-4 border-secondary/50 relative z-10"
                    style={{ elevation: 12, shadowColor: Colors.primary, shadowOpacity: 0.5, shadowRadius: 15 }}
                >
                    <Text className="text-5xl font-extrabold text-white text-center px-4" adjustsFontSizeToFit numberOfLines={1}>
                        {label}
                    </Text>
                    <Text className="text-white/80 mt-2 text-base font-medium">Tap to Chant</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    ring: {
        position: 'absolute',
        width: 224,
        height: 224,
        borderRadius: 112,
        backgroundColor: Colors.primary,
        borderWidth: 2,
        borderColor: Colors.secondary,
    }
});
