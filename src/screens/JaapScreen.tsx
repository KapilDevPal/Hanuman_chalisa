import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Vibration } from 'react-native';
import { useUser } from '../context/UserContext';
import { Colors } from '../constants/Colors';
import { SonarButton } from '../components/SonarButton';

export const JaapScreen = () => {
    const { jaapCount, incrementJaap, resetDailyJaap, jaapName } = useUser();
    const [target, setTarget] = useState(108);
    const [goalsCompleted, setGoalsCompleted] = useState(0);

    useEffect(() => {
        if (target > 0) {
            setGoalsCompleted(Math.floor(jaapCount / target));
        }
    }, [jaapCount, target]);

    const handleTap = () => {
        incrementJaap(1);
        Vibration.vibrate(50); // Short vibration

        // Check if target reached (vibrate longer)
        if ((jaapCount + 1) % target === 0) {
            Vibration.vibrate([0, 500, 200, 500]); // Pattern for completing a round
        }
    };

    return (
        <View className="flex-1 bg-background p-5 pt-10">
            <View className="items-center mb-8">
                <Text className="text-lg text-lightText font-semibold">Today's Count</Text>
                <Text className="text-7xl font-bold text-primary my-2" style={{ fontVariant: ['tabular-nums'] }}>{jaapCount}</Text>
                <Text className="text-base text-accent font-medium bg-white/50 px-4 py-1 rounded-full">Goal: {target} | Completed: {goalsCompleted}x</Text>
            </View>

            <View className="flex-1 justify-center items-center">
                <SonarButton onPress={handleTap} label={jaapName || 'RAM'} />
            </View>

            <View className="pb-8">
                <Text className="text-base text-text text-center mb-4 font-semibold opacity-80">Set Daily Goal</Text>
                <View className="flex-row justify-around mb-6">
                    {[11, 21, 51, 108, 1008].map(val => (
                        <TouchableOpacity
                            key={val}
                            className={`py-2 px-4 rounded-full border border-border ${target === val ? 'bg-secondary border-primary' : 'bg-white'}`}
                            onPress={() => setTarget(val)}
                        >
                            <Text className={`font-bold ${target === val ? 'text-text' : 'text-lightText'}`}>{val}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity className="items-center p-3" onPress={resetDailyJaap}>
                    <Text className="text-accent underline font-medium">Reset Counter</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
