import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import { useT } from '../hooks/useT';
import { Screen, PageTitle, Surface, SectionLabel, IconTile } from '../components/ui';
import { toLocalDateKey, fromLocalDateKey } from '../utils/date';

export const DashboardScreen = () => {
    const navigation = useNavigation<any>();
    const { history, sankalp, jaapCount } = useUser();
    const { colors } = useTheme();
    const { T } = useT();

    const stats = useMemo(() => {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        const thisMonthHistory = history.filter(h => {
            const date = fromLocalDateKey(h.date);
            return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
        });

        const totalJaapMonth = thisMonthHistory.reduce((acc, curr) => acc + curr.count, 0);

        const sortedHistory = [...history].sort((a, b) => b.date.localeCompare(a.date));

        let streak = 0;
        if (sortedHistory.length > 0) {
            const today = toLocalDateKey();
            const yesterday = toLocalDateKey(new Date(Date.now() - 86400000));
            const mostRecentDate = sortedHistory[0].date;

            if (mostRecentDate === today || mostRecentDate === yesterday) {
                streak = 1;
                const checkDate = fromLocalDateKey(mostRecentDate);
                for (let i = 1; i < sortedHistory.length; i++) {
                    checkDate.setDate(checkDate.getDate() - 1);
                    if (sortedHistory[i].date === toLocalDateKey(checkDate)) {
                        streak++;
                    } else {
                        break;
                    }
                }
            }
        }

        return { totalJaapMonth, streak };
    }, [history, jaapCount]);

    const sankalpPercent = sankalp.active && sankalp.duration > 0 ? (sankalp.daysCompleted / sankalp.duration) * 100 : 0;

    const StatCard = ({ icon, value, label }: { icon: React.ReactNode; value: number; label: string }) => (
        <Surface style={{ flex: 1 }}>
            <IconTile size={36}>{icon}</IconTile>
            <Text style={{ fontSize: 28, fontWeight: '800', color: colors.text, marginTop: 12, fontVariant: ['tabular-nums'] }}>{value}</Text>
            <Text style={{ fontSize: 13, color: colors.textMuted, marginTop: 2 }} numberOfLines={1}>{label}</Text>
        </Surface>
    );

    return (
        <Screen safeTop>
            <PageTitle title={T('dash_title')} subtitle={T('dash_subtitle')} />

            <View style={{ flexDirection: 'row', gap: 12, marginBottom: 12 }}>
                <StatCard icon={<Ionicons name="flame-outline" size={18} color={colors.primary} />} value={stats.streak} label={T('dash_streak')} />
                <StatCard icon={<MaterialCommunityIcons name="meditation" size={20} color={colors.primary} />} value={stats.totalJaapMonth} label={T('dash_total_jaap')} />
            </View>

            {/* Sankalp */}
            <TouchableOpacity onPress={() => navigation.navigate('Home', { screen: 'Sankalp' })} activeOpacity={0.8} style={{ marginBottom: 28 }}>
                <Surface>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14 }}>
                        <IconTile size={36}><Ionicons name="flag-outline" size={18} color={colors.primary} /></IconTile>
                        <View style={{ flex: 1, marginLeft: 12 }}>
                            <Text style={{ fontSize: 16, fontWeight: '700', color: colors.text }}>{T('dash_sankalp')}</Text>
                            <Text style={{ fontSize: 13, color: colors.textMuted }}>
                                {sankalp.active ? `${sankalp.daysCompleted} / ${sankalp.duration} ${T('dash_days')}` : T('dash_no_sankalp')}
                            </Text>
                        </View>
                        {sankalp.active
                            ? <Text style={{ fontSize: 16, fontWeight: '800', color: colors.primary }}>{Math.round(sankalpPercent)}%</Text>
                            : <Ionicons name="add-circle-outline" size={24} color={colors.primary} />}
                    </View>
                    <View style={{ height: 6, backgroundColor: colors.surfaceAlt, borderRadius: 3, overflow: 'hidden' }}>
                        <View style={{ height: 6, width: `${sankalpPercent}%`, backgroundColor: colors.primary, borderRadius: 3 }} />
                    </View>
                </Surface>
            </TouchableOpacity>

            {/* Recent Journey */}
            <SectionLabel>{T('dash_journey')}</SectionLabel>
            <Surface padded={false}>
                {history.length > 0 ? (
                    history.slice(-7).reverse().map((entry, index, arr) => (
                        <View
                            key={entry.date}
                            style={{
                                flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14,
                                borderBottomWidth: index !== arr.length - 1 ? 1 : 0, borderBottomColor: colors.border,
                            }}
                        >
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 15, fontWeight: '600', color: colors.text }}>
                                    {fromLocalDateKey(entry.date).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' })}
                                </Text>
                                <Text style={{ fontSize: 13, color: colors.textMuted, marginTop: 1 }}>{T('dash_session')}</Text>
                            </View>
                            <Text style={{ fontSize: 15, fontWeight: '700', color: colors.success, fontVariant: ['tabular-nums'] }}>+{entry.count}</Text>
                        </View>
                    ))
                ) : (
                    <View style={{ padding: 32, alignItems: 'center' }}>
                        <Ionicons name="calendar-outline" size={28} color={colors.textMuted} />
                        <Text style={{ color: colors.textMuted, marginTop: 8, fontSize: 14 }}>{T('dash_empty')}</Text>
                    </View>
                )}
            </Surface>
        </Screen>
    );
};
