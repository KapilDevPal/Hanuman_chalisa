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
        <View className="flex-1 bg-[#FAF7F0] p-5 pt-8">
            {/* Header */}
            <View className="items-start mb-6">
                <Text className="text-3xl font-black text-text">Daily Jaap</Text>
                <Text className="text-sm text-lightText font-semibold mt-1">
                    Chant & keep track of your daily mantras.
                </Text>
            </View>

            {/* Scoreboard Card */}
            <View className="bg-white border border-[#EADEC9] rounded-3xl p-6 mb-6 items-center shadow-sm w-full">
                <Text className="text-[10px] text-lightText font-extrabold uppercase tracking-wider mb-2">Today's Count</Text>
                <Text className="text-7xl font-black text-primary my-1" style={{ fontVariant: ['tabular-nums'] }}>
                    {jaapCount}
                </Text>
                <View className="bg-[#FAF7F0] border border-[#EADEC9]/80 px-4 py-1.5 rounded-full mt-3">
                    <Text className="text-xs text-[#5C4A33] font-extrabold">
                        Goal: {target} | Completed: {goalsCompleted}x
                    </Text>
                </View>
            </View>

            {/* Tap Button Container */}
            <View className="flex-1 justify-center items-center my-4">
                <SonarButton onPress={handleTap} label={jaapName || 'RAM'} />
            </View>

            {/* Controls Panel */}
            <View className="pb-20 w-full">
                {/* Goal Picker Card */}
                <View className="bg-white border border-[#EADEC9] rounded-3xl p-5 mb-5 shadow-sm">
                    <Text className="text-xs text-lightText font-extrabold uppercase tracking-wider mb-4 text-center">
                        Set Daily Goal
                    </Text>
                    <View className="flex-row justify-around">
                        {[11, 21, 51, 108, 1008].map(val => (
                            <TouchableOpacity
                                key={val}
                                className={`py-2 px-3.5 rounded-xl border ${
                                    target === val 
                                        ? 'bg-primary border-primary shadow-sm' 
                                        : 'bg-[#FAF7F0] border-[#EADEC9]'
                                }`}
                                onPress={() => setTarget(val)}
                                activeOpacity={0.8}
                            >
                                <Text className={`font-black text-xs ${target === val ? 'text-white' : 'text-[#5C4A33]'}`}>
                                    {val}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Reset button */}
                <TouchableOpacity className="items-center py-2 self-center" onPress={resetDailyJaap} activeOpacity={0.7}>
                    <Text className="text-primary font-bold text-sm underline">Reset Counter</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
