import React, { useMemo } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useUser } from '../context/UserContext';
import { useT } from '../hooks/useT';
import { Colors } from '../constants/Colors';

export const DashboardScreen = () => {
    const { history, sankalp, jaapCount } = useUser();
    const { T } = useT();

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

        return { totalJaapMonth, streak };
    }, [history, jaapCount]);

    return (
        <ScrollView className="flex-1 bg-[#FAF7F0]" showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View className="px-6 pt-10 pb-6">
                <Text className="text-3xl font-black text-text">{T('dash_title')}</Text>
                <Text className="text-sm text-lightText font-semibold mt-1">{T('dash_subtitle')}</Text>
            </View>

            <View className="px-5 pb-32">
                {/* Highlights Grid */}
                <View className="flex-row justify-between mb-6">
                    <View className="flex-1 bg-white border border-[#EADEC9] rounded-3xl p-5 mr-2 shadow-sm">
                        <View className="flex-row justify-between items-start mb-3">
                            <View className="bg-primary/10 p-2 rounded-xl">
                                <Ionicons name="flame" size={20} color={Colors.primary} />
                            </View>
                            <Text className="text-lightText text-[10px] font-extrabold uppercase tracking-wider">{T('dash_streak')}</Text>
                        </View>
                        <Text className="text-3xl font-black text-text">{stats.streak}</Text>
                        <Text className="text-xs text-lightText font-semibold mt-1">{T('dash_days_active')}</Text>
                    </View>

                    <View className="flex-1 bg-[#FFF8EE] border border-[#FFD59A] rounded-3xl p-5 ml-2 shadow-sm">
                        <View className="flex-row justify-between items-start mb-3">
                            <View className="bg-primary/10 p-2 rounded-xl">
                                <MaterialCommunityIcons name="meditation" size={20} color={Colors.primary} />
                            </View>
                            <Text className="text-lightText text-[10px] font-extrabold uppercase tracking-wider">{T('dash_month')}</Text>
                        </View>
                        <Text className="text-3xl font-black text-[#5C3A00]">{stats.totalJaapMonth}</Text>
                        <Text className="text-xs text-[#5C3A00]/70 font-semibold mt-1">{T('dash_total_jaap')}</Text>
                    </View>
                </View>

                {/* Sankalp Card */}
                <View className="bg-white border border-[#EADEC9] rounded-3xl p-6 mb-6 shadow-sm">
                    <View className="flex-row justify-between items-center mb-5">
                        <View>
                            <Text className="text-lg font-black text-text">{T('dash_sankalp')}</Text>
                            <Text className="text-[10px] font-bold text-lightText uppercase tracking-wider">{T('dash_vow')}</Text>
                        </View>
                        <View className="bg-primary/10 p-2 rounded-xl">
                            <Ionicons name="flag" size={20} color={Colors.primary} />
                        </View>
                    </View>

                    {sankalp.active ? (
                        <View>
                            <View className="h-3 bg-[#FAF7F0] border border-[#EADEC9]/40 rounded-full overflow-hidden mb-3">
                                <View
                                    className="h-full bg-primary rounded-full"
                                    style={{ width: `${(sankalp.daysCompleted / sankalp.duration) * 100}%` }}
                                />
                            </View>
                            <View className="flex-row justify-between items-center">
                                <Text className="text-primary font-black text-sm">
                                    {Math.round((sankalp.daysCompleted / sankalp.duration) * 100)}{T('dash_complete')}
                                </Text>
                                <Text className="text-lightText font-bold text-xs">
                                    {sankalp.daysCompleted} / {sankalp.duration} {T('dash_days')}
                                </Text>
                            </View>
                        </View>
                    ) : (
                        <View className="items-center py-5 bg-[#FAF7F0] rounded-2xl border border-dashed border-[#EADEC9]">
                            <Ionicons name="add-circle-outline" size={24} color={Colors.lightText} />
                            <Text className="text-lightText text-xs font-bold mt-1.5">{T('dash_no_sankalp')}</Text>
                        </View>
                    )}
                </View>

                {/* Recent Journey */}
                <Text className="text-lg font-black text-text mb-4 ml-1">{T('dash_journey')}</Text>
                <View className="bg-white border border-[#EADEC9] rounded-3xl p-2 shadow-sm">
                    {history.length > 0 ? (
                        history.slice(-7).reverse().map((entry, index, arr) => (
                            <View
                                key={index}
                                className={`flex-row items-center px-4 py-4 ${index !== arr.length - 1 ? 'border-b border-[#FAF7F0]' : ''}`}
                            >
                                <View className="w-10 h-10 bg-[#FAF7F0] border border-[#EADEC9]/60 rounded-xl items-center justify-center mr-4">
                                    <Text className="text-primary font-bold text-xs">{entry.date.split('-')[2]}</Text>
                                </View>
                                <View className="flex-1">
                                    <Text className="text-text font-bold text-sm">
                                        {new Date(entry.date).toLocaleDateString(undefined, { month: 'short', year: 'numeric', day: 'numeric' })}
                                    </Text>
                                    <Text className="text-lightText text-xs">{T('dash_session')}</Text>
                                </View>
                                <View className="bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
                                    <Text className="text-green-600 font-extrabold text-xs">+{entry.count}</Text>
                                </View>
                            </View>
                        ))
                    ) : (
                        <View className="p-8 items-center">
                            <Ionicons name="calendar-outline" size={32} color={Colors.border} />
                            <Text className="text-lightText mt-2 text-xs font-bold">{T('dash_empty')}</Text>
                        </View>
                    )}
                </View>
            </View>
        </ScrollView>
    );
};
