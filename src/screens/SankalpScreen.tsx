import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useUser } from '../context/UserContext';
import { useT } from '../hooks/useT';
import { Colors } from '../constants/Colors';
import { Card } from '../components/Card';

export const SankalpScreen = () => {
    const { sankalp, startSankalp, updateSankalpProgress, resetSankalp } = useUser();
    const { T } = useT();

    const handleStart = (days: number) => {
        Alert.alert(
            T('sankalp_confirm'),
            T('sankalp_pledge', { days }),
            [
                { text: T('sankalp_cancel'), style: 'cancel' },
                { text: T('sankalp_yes_pledge'), onPress: () => startSankalp(days) }
            ]
        );
    };

    const handleMarkComplete = () => {
        Alert.alert(
            T('sankalp_daily_q'),
            T('sankalp_done_today'),
            [
                { text: T('sankalp_no'), style: 'cancel' },
                { text: T('sankalp_yes'), onPress: updateSankalpProgress }
            ]
        );
    };

    if (!sankalp.active) {
        return (
            <View className="flex-1 bg-background p-5 items-center justify-center">
                <Text className="text-3xl font-bold text-primary mb-2 text-center">{T('sankalp_new')}</Text>
                <Text className="text-base text-text mb-8 text-center px-4">{T('sankalp_choose')}</Text>
                <View className="flex-row gap-4">
                    {[11, 21, 40].map(days => (
                        <TouchableOpacity key={days} onPress={() => handleStart(days)}>
                            <Card className="w-[100px] h-[120px] justify-center items-center bg-white shadow-sm border border-border">
                                <Text className="text-4xl font-bold text-accent mb-1">{days}</Text>
                                <Text className="text-base text-text">{T('sankalp_days')}</Text>
                            </Card>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-background p-5 items-center pt-10">
            <Text className="text-2xl font-bold text-primary mb-2">{T('sankalp_progress')}</Text>
            <View className="my-10">
                <View className="w-48 h-48 rounded-full border-[8px] border-primary justify-center items-center bg-white shadow-lg">
                    <Text className="text-6xl font-extrabold text-primary">{sankalp.daysCompleted}</Text>
                    <Text className="text-2xl text-lightText -mt-2">/ {sankalp.duration}</Text>
                </View>
            </View>
            <Text className="text-xl text-text font-semibold mb-8 text-center px-4">
                {sankalp.daysCompleted === sankalp.duration ? T('sankalp_completed') : T('sankalp_going')}
            </Text>
            {sankalp.daysCompleted < sankalp.duration && (
                <TouchableOpacity
                    className="bg-primary py-4 px-10 rounded-full mb-6 shadow-md"
                    onPress={handleMarkComplete}
                >
                    <Text className="text-white text-lg font-bold">{T('sankalp_mark')}</Text>
                </TouchableOpacity>
            )}
            <TouchableOpacity
                className="p-3 mt-4"
                onPress={() => {
                    Alert.alert(T('sankalp_reset_title'), T('sankalp_reset_q'), [
                        { text: T('sankalp_cancel') },
                        { text: T('sankalp_reset_btn'), onPress: resetSankalp }
                    ]);
                }}
            >
                <Text className="text-accent underline font-medium">{T('sankalp_abandon')}</Text>
            </TouchableOpacity>
        </View>
    );
};
