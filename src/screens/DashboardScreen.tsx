import React, { useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useUser } from '../context/UserContext';
import { Colors } from '../constants/Colors';
import { Card } from '../components/Card';
import { LinearGradient } from 'expo-linear-gradient';

export const DashboardScreen = () => {
    const { history, sankalp, jaapCount } = useUser();

    const stats = useMemo(() => {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        const thisMonthHistory = history.filter(h => {
            const date = new Date(h.date);
            return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
        });

        const totalJaapMonth = thisMonthHistory.reduce((acc, curr) => acc + curr.count, 0);

        const sortedHistory = [...history].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        let streak = 0;
        if (sortedHistory.length > 0) {
            const today = new Date().toISOString().split('T')[0];
            const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

            const mostRecentDate = sortedHistory[0].date;

            if (mostRecentDate === today || mostRecentDate === yesterday) {
                streak = 1;
                let checkDate = new Date(mostRecentDate);

                for (let i = 1; i < sortedHistory.length; i++) {
                    checkDate.setDate(checkDate.getDate() - 1);
                    const expectedDate = checkDate.toISOString().split('T')[0];
                    if (sortedHistory[i].date === expectedDate) {
                        streak++;
                    } else {
                        break;
                    }
                }
            }
        }

        return {
            totalJaapMonth,
            streak,
        };
    }, [history, jaapCount]);

    return (
        <ScrollView className="flex-1 bg-[#fcfcfc]" showsVerticalScrollIndicator={false}>
            {/* Header / Summary */}
            <View className="px-6 pt-10 pb-6">
                <Text className="text-4xl font-black text-text">Insights</Text>
                <Text className="text-base text-lightText font-medium mt-1">Your spiritual journey at a glance.</Text>
            </View>

            <View className="px-5 pb-20">
                {/* Highlights */}
                <View className="flex-row justify-between mb-8">
                    <LinearGradient
                        colors={[Colors.primary, '#FFB347']}
                        className="flex-1 rounded-[30px] p-6 mr-2 shadow-lg"
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <View className="flex-row justify-between items-start mb-4">
                            <View className="bg-white/20 p-2 rounded-xl">
                                <Ionicons name="flame" size={24} color="#FFF" />
                            </View>
                            <Text className="text-white/60 text-xs font-bold uppercase tracking-widest">Active</Text>
                        </View>
                        <Text className="text-4xl font-black text-white">{stats.streak}</Text>
                        <Text className="text-sm text-white/80 font-bold mt-1">Day Streak</Text>
                    </LinearGradient>

                    <LinearGradient
                        colors={['#6A11CB', '#2575FC']}
                        className="flex-1 rounded-[30px] p-6 ml-2 shadow-lg"
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <View className="flex-row justify-between items-start mb-4">
                            <View className="bg-white/20 p-2 rounded-xl">
                                <MaterialCommunityIcons name="meditation" size={24} color="#FFF" />
                            </View>
                            <Text className="text-white/60 text-xs font-bold uppercase tracking-widest">Target</Text>
                        </View>
                        <Text className="text-4xl font-black text-white">{stats.totalJaapMonth}</Text>
                        <Text className="text-sm text-white/80 font-bold mt-1">Monthly Jaap</Text>
                    </LinearGradient>
                </View>

                {/* Sankalp Card */}
                <Card className="bg-white p-7 mb-8 rounded-[35px] shadow-2xl border border-gray-50 overflow-hidden relative">
                    <View className="flex-row justify-between items-center mb-6">
                        <View>
                            <Text className="text-xl font-black text-text">Sankalp Goal</Text>
                            <Text className="text-xs text-lightText font-bold uppercase opacity-60">Religious Discipline</Text>
                        </View>
                        <View className="bg-red-50 p-2.5 rounded-2xl">
                            <Ionicons name="flag" size={24} color={Colors.accent} />
                        </View>
                    </View>

                    {sankalp.active ? (
                        <View>
                            <View className="h-4 bg-gray-100 rounded-full overflow-hidden mb-3">
                                <LinearGradient
                                    colors={[Colors.primary, Colors.accent]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    className="h-full"
                                    style={{ width: `${(sankalp.daysCompleted / sankalp.duration) * 100}%` }}
                                />
                            </View>
                            <View className="flex-row justify-between items-center">
                                <Text className="text-primary font-black text-lg">
                                    {Math.round((sankalp.daysCompleted / sankalp.duration) * 100)}%
                                </Text>
                                <Text className="text-lightText font-bold">
                                    {sankalp.daysCompleted} of {sankalp.duration} Days
                                </Text>
                            </View>
                        </View>
                    ) : (
                        <View className="items-center py-4 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                            <Ionicons name="add-circle-outline" size={32} color={Colors.lightText} />
                            <Text className="text-lightText font-medium mt-2">No active Sankalp</Text>
                        </View>
                    )}
                </Card>

                {/* Activity List */}
                <Text className="text-xl font-black text-text mb-5 ml-2">Recent Journey</Text>
                <View className="bg-white rounded-[35px] p-2 shadow-sm border border-gray-50">
                    {history.length > 0 ? (
                        history.slice(-7).reverse().map((entry, index) => (
                            <View key={index} className="flex-row items-center px-5 py-5">
                                <View className="relative items-center mr-5">
                                    <View className="w-12 h-12 bg-orange-50 rounded-2xl items-center justify-center border border-orange-100">
                                        <Text className="text-primary font-black text-sm">{entry.date.split('-')[2]}</Text>
                                    </View>
                                    {index !== history.slice(-7).length - 1 && (
                                        <View className="absolute top-12 bottom-[-20px] w-0.5 bg-gray-100" />
                                    )}
                                </View>
                                <View className="flex-1">
                                    <Text className="text-text font-bold text-base">
                                        {new Date(entry.date).toLocaleDateString(undefined, { month: 'short', year: 'numeric', day: 'numeric' })}
                                    </Text>
                                    <Text className="text-lightText text-sm">Devotional Chant Activity</Text>
                                </View>
                                <View className="bg-green-50 px-3 py-1.5 rounded-full">
                                    <Text className="text-green-600 font-black text-xs">+{entry.count}</Text>
                                </View>
                            </View>
                        ))
                    ) : (
                        <View className="p-10 items-center">
                            <Ionicons name="calendar-outline" size={48} color={Colors.border} />
                            <Text className="text-lightText mt-4 font-bold">Your journey begins soon.</Text>
                        </View>
                    )}
                </View>
            </View>
        </ScrollView>
    );
};
