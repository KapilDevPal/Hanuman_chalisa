import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { Card } from '../components/Card';

// Wisdom Data
import hindiWisdom from '../../assets/data/hi/wisdom.json';
import englishWisdom from '../../assets/data/en/wisdom.json';
import punjabiWisdom from '../../assets/data/pa/wisdom.json';

const wisdomMap = {
    hi: hindiWisdom,
    en: englishWisdom,
    pa: punjabiWisdom,
};

export const HomeScreen = () => {
    const navigation = useNavigation<any>();
    const { language } = useLanguage();
    const { jaapCount, sankalp } = useUser();
    const [todaysQuote, setTodaysQuote] = useState('');

    useEffect(() => {
        const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
        const quotes = wisdomMap[language] || wisdomMap['hi'];
        const index = dayOfYear % quotes.length;
        setTodaysQuote(quotes[index]?.text);
    }, [language]);

    const getGreeting = () => {
        if (language === 'hi') return 'जय श्री राम';
        if (language === 'pa') return 'ਜੈ ਸ਼੍ਰੀ ਰਾਮ';
        return 'Jai Shri Ram';
    };

    return (
        <ScrollView className="flex-1 bg-background" showsVerticalScrollIndicator={false}>
            {/* Header Section */}
            <LinearGradient
                colors={[Colors.primary, Colors.secondary]}
                className="p-5 pt-16 rounded-b-[40px] shadow-xl"
            >
                <View className="flex-row justify-between items-start mb-6">
                    <View>
                        <Text className="text-sm text-white/80 font-medium mb-1 tracking-wider uppercase">Welcome Devotee</Text>
                        <Text className="text-4xl font-extrabold text-white">{getGreeting()}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Settings')}
                        className="p-3 bg-white/10 rounded-2xl border border-white/20 shadow-sm"
                    >
                        <Ionicons name="grid-outline" size={24} color="#FFF" />
                    </TouchableOpacity>
                </View>

                {/* Daily Wisdom Card */}
                <View className="bg-white/10 p-5 rounded-3xl border border-white/10 backdrop-blur-md">
                    <View className="flex-row items-center mb-3">
                        <View className="bg-orange-400 p-1.5 rounded-lg mr-3 shadow-sm">
                            <Ionicons name="sunny" size={16} color="#FFF" />
                        </View>
                        <Text className="text-xs text-white font-bold opacity-90 tracking-widest uppercase">Daily Wisdom</Text>
                    </View>
                    <Text className="text-lg text-white font-medium italic mb-3 leading-7" numberOfLines={3}>"{todaysQuote}"</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Wisdom')}
                        className="self-end bg-white/20 px-4 py-1.5 rounded-full"
                    >
                        <Text className="text-xs text-white font-bold">Read Full →</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>

            <View className="p-5">
                {/* Featured Audio Player Card */}
                <Text className="text-xl font-bold text-text mb-4 mt-2">Listen Now</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Audio')}>
                    <LinearGradient
                        colors={['#1e1e1e', '#2d2d2d']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        className="rounded-[30px] p-4 flex-row items-center shadow-lg border border-white/5"
                    >
                        <View className="rounded-2xl overflow-hidden shadow-md">
                            <Image
                                source={require('../../assets/images/hanuman_cover.png')}
                                className="w-24 h-24"
                            />
                        </View>
                        <View className="ml-5 flex-1">
                            <Text className="text-white text-lg font-bold">Hanuman Chalisa</Text>
                            <Text className="text-white/60 text-sm mb-3">Divine Chanting</Text>
                            <View className="bg-white/10 self-start px-3 py-1 rounded-full flex-row items-center">
                                <Ionicons name="play-circle" size={16} color={Colors.primary} />
                                <Text className="text-white text-xs font-bold ml-1.5">Play Audio</Text>
                            </View>
                        </View>
                        <Ionicons name="chevron-forward" size={24} color="rgba(255,255,255,0.3)" />
                    </LinearGradient>
                </TouchableOpacity>

                {/* Main Actions */}
                <View className="flex-row justify-between mb-6 mt-8">
                    <TouchableOpacity className="w-[47%]" onPress={() => navigation.navigate('Jaap')}>
                        <Card className="items-center py-6 h-[150px] justify-center bg-white shadow-xl border-b-4 border-primary">
                            <View className="bg-orange-50 p-3 rounded-2xl mb-3">
                                <MaterialCommunityIcons name="meditation" size={32} color={Colors.primary} />
                            </View>
                            <Text className="text-3xl font-black text-primary">{jaapCount}</Text>
                            <Text className="text-xs text-lightText font-bold uppercase tracking-tighter">Jaap Today</Text>
                        </Card>
                    </TouchableOpacity>

                    <TouchableOpacity className="w-[47%]" onPress={() => navigation.navigate('Sankalp')}>
                        <Card className="items-center py-6 h-[150px] justify-center bg-white shadow-xl border-b-4 border-accent">
                            <View className="bg-red-50 p-3 rounded-2xl mb-3">
                                <Ionicons name="flag" size={32} color={Colors.accent} />
                            </View>
                            <Text className="text-3xl font-black text-primary">{sankalp.active ? `${sankalp.daysCompleted}/${sankalp.duration}` : '-'}</Text>
                            <Text className="text-xs text-lightText font-bold uppercase tracking-tighter">Sankalp Day</Text>
                        </Card>
                    </TouchableOpacity>
                </View>

                {/* Spiritual Library Section */}
                <View className="flex-row items-center justify-between mb-4">
                    <Text className="text-xl font-bold text-text">Spiritual Library</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Library')}>
                        <Text className="text-primary font-bold">View All</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-8">
                    <TouchableOpacity onPress={() => navigation.navigate('Chalisa')} className="mr-4">
                        <Card className="w-48 bg-white border border-border/50 items-center justify-center p-6 rounded-[30px]">
                            <FontAwesome5 name="book-open" size={32} color={Colors.primary} />
                            <Text className="text-lg font-bold text-text mt-3">Chalisa</Text>
                            <Text className="text-xs text-lightText">Read & Chant</Text>
                        </Card>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Library')} className="mr-4">
                        <Card className="w-48 bg-white border border-border/50 items-center justify-center p-6 rounded-[30px]">
                            <MaterialCommunityIcons name="hands-pray" size={32} color={Colors.primary} />
                            <Text className="text-lg font-bold text-text mt-3">Aarti</Text>
                            <Text className="text-xs text-lightText">Devotional Songs</Text>
                        </Card>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Library')}>
                        <Card className="w-48 bg-white border border-border/50 items-center justify-center p-6 rounded-[30px]">
                            <Ionicons name="library" size={32} color={Colors.primary} />
                            <Text className="text-lg font-bold text-text mt-3">Ashtak</Text>
                            <Text className="text-xs text-lightText">Eight Verses</Text>
                        </Card>
                    </TouchableOpacity>
                </ScrollView>

                {/* Quick Shortcuts */}
                <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
                    <LinearGradient
                        colors={[Colors.secondary, '#FFD1BA']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        className="flex-row items-center justify-between p-5 rounded-3xl mb-4 shadow-sm"
                    >
                        <View className="flex-row items-center">
                            <Ionicons name="stats-chart" size={24} color={Colors.text} />
                            <Text className="text-text font-bold text-lg ml-4">Spiritual Insights</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color={Colors.text} />
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('PrayerGuide')}>
                    <Card className="flex-row items-center p-5 bg-white shadow-xl rounded-3xl border-l-4 border-primary">
                        <View className="bg-orange-50 p-2 rounded-xl">
                            <MaterialCommunityIcons name="star-face" size={24} color={Colors.primary} />
                        </View>
                        <View className="ml-4 flex-1">
                            <Text className="text-lg font-bold text-text">Way to Pray</Text>
                            <Text className="text-xs text-lightText">Learn the vidhi and rituals</Text>
                        </View>
                        <Ionicons name="arrow-forward" size={20} color={Colors.lightText} />
                    </Card>
                </TouchableOpacity>
            </View>

            <View className="h-12" />
        </ScrollView>
    );
};
