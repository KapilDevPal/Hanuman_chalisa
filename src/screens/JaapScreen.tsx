import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Vibration, ScrollView, Animated } from 'react-native';
import { useUser } from '../context/UserContext';
import { Colors } from '../constants/Colors';
import { SonarButton } from '../components/SonarButton';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useT } from '../hooks/useT';

const JAAP_NAMES = [
    { name: 'RAM', label: 'राम', desc: 'The Supreme' },
    { name: 'OM', label: 'ॐ', desc: 'The Universal' },
    { name: 'HANUMAN', label: 'हनुमान', desc: 'The Mighty' },
    { name: 'JAI SHRI RAM', label: 'जय श्री राम', desc: 'Victory' },
    { name: 'SITA RAM', label: 'सीताराम', desc: 'Divine Couple' },
    { name: 'OM NAMAH SHIVAYA', label: 'ॐ नमः शिवाय', desc: 'Shiva\'s Name' },
];

const GOALS = [11, 21, 51, 108, 1008];

export const JaapScreen = () => {
    const { jaapCount, incrementJaap, resetDailyJaap, jaapName, setJaapName } = useUser();
    const { T } = useT();
    const [target, setTarget] = useState(108);
    const [goalsCompleted, setGoalsCompleted] = useState(0);
    const [showNamePicker, setShowNamePicker] = useState(false);
    const slideAnim = useState(new Animated.Value(0))[0];

    useEffect(() => {
        if (target > 0) {
            setGoalsCompleted(Math.floor(jaapCount / target));
        }
    }, [jaapCount, target]);

    const toggleNamePicker = () => {
        if (showNamePicker) {
            Animated.timing(slideAnim, {
                toValue: 0, duration: 250, useNativeDriver: true,
            }).start(() => setShowNamePicker(false));
        } else {
            setShowNamePicker(true);
            Animated.spring(slideAnim, {
                toValue: 1, friction: 8, tension: 60, useNativeDriver: true,
            }).start();
        }
    };

    const selectName = (name: string) => {
        setJaapName(name);
        toggleNamePicker();
    };

    const handleTap = () => {
        incrementJaap(1);
        Vibration.vibrate(40);
        if ((jaapCount + 1) % target === 0) {
            Vibration.vibrate([0, 400, 150, 400]);
        }
    };

    const progressPercent = target > 0 ? Math.min(((jaapCount % target) / target) * 100, 100) : 0;

    return (
        <View className="flex-1 bg-[#FAF7F0]">
            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 120 }}
            >
                {/* Header */}
                <View className="px-6 pt-8 pb-2 flex-row items-center justify-between">
                    <View>
                        <Text className="text-3xl font-black text-text">{T('jaap_title')}</Text>
                        <Text className="text-sm text-lightText font-semibold mt-0.5">{T('jaap_subtitle')}</Text>
                    </View>
                    <View className="bg-orange-100 p-2 rounded-2xl">
                        <MaterialCommunityIcons name="meditation" size={26} color={Colors.primary} />
                    </View>
                </View>

                {/* Compact Progress Row */}
                <View className="mx-5 mt-4 bg-white border border-[#EADEC9] rounded-2xl px-4 py-3 shadow-sm flex-row items-center">
                    {/* Count */}
                    <View className="mr-4">
                        <Text
                            className="font-black text-primary"
                            style={{ fontSize: 42, lineHeight: 46, fontVariant: ['tabular-nums'] }}
                        >
                            {jaapCount}
                        </Text>
                        <Text className="text-[9px] text-lightText font-bold -mt-0.5 text-center">{T('jaap_chants')}</Text>
                    </View>

                    {/* Divider */}
                    <View className="w-[1px] h-10 bg-[#EADEC9] mr-4" />

                    {/* Progress + goal */}
                    <View className="flex-1">
                        <View className="flex-row items-center justify-between mb-1.5">
                            <Text className="text-[9px] text-lightText font-bold">
                                {jaapCount % target} / {target} {T('jaap_this_round')}
                            </Text>
                            <View className="bg-[#FFF4E6] px-2 py-0.5 rounded-full border border-[#FFD59A]">
                                <Text className="text-[9px] text-primary font-black">
                                    {goalsCompleted > 0 ? `🎉 ${goalsCompleted}x` : `${Math.round(progressPercent)}%`}
                                </Text>
                            </View>
                        </View>
                        <View className="h-1.5 bg-[#FAF7F0] rounded-full border border-[#EADEC9] overflow-hidden">
                            <View
                                className="h-full bg-primary rounded-full"
                                style={{ width: `${progressPercent}%` }}
                            />
                        </View>
                    </View>
                </View>

                {/* Name Selector Button */}
                <View className="mx-5 mt-4">
                    <TouchableOpacity
                        onPress={toggleNamePicker}
                        activeOpacity={0.8}
                        className="bg-white border border-[#EADEC9] rounded-2xl p-4 flex-row items-center justify-between shadow-sm"
                    >
                        <View className="flex-row items-center">
                            <View className="bg-orange-50 p-2 rounded-xl mr-3">
                                <Ionicons name="musical-notes" size={18} color={Colors.primary} />
                            </View>
                            <View>
                                <Text className="text-[10px] text-lightText font-bold uppercase tracking-wider">{T('jaap_chanting_name')}</Text>
                                <Text className="text-base font-black text-text">{jaapName}</Text>
                            </View>
                        </View>
                        <View className="flex-row items-center">
                            <Text className="text-xs text-primary font-bold mr-1">{T('jaap_change')}</Text>
                            <Ionicons
                                name={showNamePicker ? "chevron-up" : "chevron-down"}
                                size={16}
                                color={Colors.primary}
                            />
                        </View>
                    </TouchableOpacity>

                    {/* Animated Name Picker */}
                    {showNamePicker && (
                        <Animated.View
                            style={{
                                opacity: slideAnim,
                                transform: [{ translateY: slideAnim.interpolate({ inputRange: [0, 1], outputRange: [-10, 0] }) }],
                            }}
                            className="mt-2 bg-white border border-[#EADEC9] rounded-2xl p-3 shadow-sm"
                        >
                            <Text className="text-[10px] font-black text-lightText uppercase tracking-widest mb-3 px-1">
                                {T('jaap_select_mantra')}
                            </Text>
                            <View className="flex-row flex-wrap gap-2">
                                {JAAP_NAMES.map((item) => {
                                    const isSelected = jaapName === item.name;
                                    return (
                                        <TouchableOpacity
                                            key={item.name}
                                            onPress={() => selectName(item.name)}
                                            activeOpacity={0.8}
                                            style={{
                                                backgroundColor: isSelected ? Colors.primary : '#FAF7F0',
                                                borderColor: isSelected ? Colors.primary : '#EADEC9',
                                                borderWidth: 1.5,
                                                borderRadius: 14,
                                                paddingHorizontal: 14,
                                                paddingVertical: 10,
                                                minWidth: '45%',
                                                flex: 1,
                                                alignItems: 'center',
                                                shadowColor: isSelected ? Colors.primary : 'transparent',
                                                shadowOpacity: isSelected ? 0.3 : 0,
                                                shadowRadius: 6,
                                                elevation: isSelected ? 4 : 0,
                                            }}
                                        >
                                            <Text style={{ color: isSelected ? '#fff' : '#5C4A33', fontSize: 18, fontWeight: '900' }}>
                                                {item.label}
                                            </Text>
                                            <Text style={{ color: isSelected ? 'rgba(255,255,255,0.8)' : '#A6947D', fontSize: 9, fontWeight: '700', marginTop: 2 }}>
                                                {item.desc}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </Animated.View>
                    )}
                </View>

                {/* Tap Button */}
                <View style={{ height: 320, marginTop: 8 }}>
                    <SonarButton onPress={handleTap} label={jaapName || 'RAM'} />
                </View>

                {/* Goal Picker */}
                <View className="mx-5 bg-white border border-[#EADEC9] rounded-3xl p-5 shadow-sm mb-4">
                    <Text className="text-[10px] text-lightText font-extrabold uppercase tracking-wider mb-4 text-center">
                        {T('jaap_goal')}
                    </Text>
                    <View className="flex-row justify-around">
                        {GOALS.map(val => (
                            <TouchableOpacity
                                key={val}
                                className={`py-2.5 px-3 rounded-2xl border ${
                                    target === val
                                        ? 'bg-primary border-primary'
                                        : 'bg-[#FAF7F0] border-[#EADEC9]'
                                }`}
                                onPress={() => setTarget(val)}
                                activeOpacity={0.8}
                            >
                                <Text className={`font-black text-xs text-center ${target === val ? 'text-white' : 'text-[#5C4A33]'}`}>
                                    {val}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Reset */}
                <TouchableOpacity
                    className="items-center py-2 self-center"
                    onPress={resetDailyJaap}
                    activeOpacity={0.7}
                >
                    <Text className="text-primary font-bold text-sm underline">{T('jaap_reset')}</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};
