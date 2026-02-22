import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useUser } from '../context/UserContext';
import { Colors } from '../constants/Colors';
import { Card } from '../components/Card';

export const DashboardScreen = () => {
    const { history, sankalp, jaapCount } = useUser();

    const stats = useMemo(() => {
        const now = new Date();
        const currentMonth = now.getMonth(); // 0-11
        const currentYear = now.getFullYear();

        const thisMonthHistory = history.filter(h => {
            const date = new Date(h.date);
            return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
        });

        const totalJaapMonth = thisMonthHistory.reduce((acc, curr) => acc + curr.count, 0);

        // Calculate Streak
        // Sort history by date desc
        const sortedHistory = [...history].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        let streak = 0;
        if (sortedHistory.length > 0) {
            // Check if today is in history or yesterday
            const today = new Date().toISOString().split('T')[0];
            const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

            let currentDateIndex = 0;
            const mostRecentDate = sortedHistory[0].date;

            // If most recent is today or yesterday, streak is valid
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
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.header}>Spiritual Dashboard</Text>

            <View style={styles.row}>
                <Card style={[styles.statCard, { flex: 1, marginRight: 8 }]}>
                    <Text style={styles.statValue}>{stats.streak}</Text>
                    <Text style={styles.statLabel}>Day Streak</Text>
                </Card>
                <Card style={[styles.statCard, { flex: 1, marginLeft: 8 }]}>
                    <Text style={styles.statValue}>{stats.totalJaapMonth}</Text>
                    <Text style={styles.statLabel}>Jaap This Month</Text>
                </Card>
            </View>

            <Card style={styles.progressCard}>
                <Text style={styles.cardTitle}>Sankalp Progress</Text>
                {sankalp.active ? (
                    <View>
                        <View style={styles.progressBarBg}>
                            <View
                                style={[
                                    styles.progressBarFill,
                                    { width: `${(sankalp.daysCompleted / sankalp.duration) * 100}%` }
                                ]}
                            />
                        </View>
                        <Text style={styles.progressText}>
                            {sankalp.daysCompleted} / {sankalp.duration} days
                        </Text>
                    </View>
                ) : (
                    <Text style={styles.noSankalpText}>No active Sankalp. Start one to track your discipline.</Text>
                )}
            </Card>

            <Card>
                <Text style={styles.cardTitle}>Recent Activity</Text>
                {history.slice(-5).reverse().map((entry, index) => (
                    <View key={index} style={styles.historyRow}>
                        <Text style={styles.historyDate}>{entry.date}</Text>
                        <Text style={styles.historyCount}>{entry.count} Jaap</Text>
                    </View>
                ))}
                {history.length === 0 && <Text style={styles.noHistory}>No activity yet.</Text>}
            </Card>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    content: {
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.primary,
        marginBottom: 20,
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    statCard: {
        alignItems: 'center',
        paddingVertical: 24,
    },
    statValue: {
        fontSize: 36,
        fontWeight: 'bold',
        color: Colors.accent,
    },
    statLabel: {
        fontSize: 14,
        color: Colors.lightText,
        marginTop: 4,
    },
    progressCard: {
        marginBottom: 16,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 16,
    },
    progressBarBg: {
        height: 12,
        backgroundColor: Colors.border,
        borderRadius: 6,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: Colors.primary,
    },
    progressText: {
        marginTop: 8,
        textAlign: 'right',
        color: Colors.lightText,
    },
    noSankalpText: {
        fontStyle: 'italic',
        color: Colors.lightText,
    },
    historyRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    historyDate: {
        color: Colors.text,
    },
    historyCount: {
        fontWeight: 'bold',
        color: Colors.primary,
    },
    noHistory: {
        textAlign: 'center',
        color: Colors.lightText,
        fontStyle: 'italic',
        padding: 10,
    }
});
