import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { textList } from '../data/TextLibrary';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width / 2 - 24;

const categoryIcons: any = {
    'Chalisa': { icon: 'book', lib: FontAwesome5, colors: ['#FF9933', '#FFCC00'] },
    'Aarti': { icon: 'hands-pray', lib: MaterialCommunityIcons, colors: ['#E91E63', '#F48FB1'] },
    'Ashtak': { icon: 'brightness-7', lib: MaterialCommunityIcons, colors: ['#673AB7', '#9575CD'] },
    'Default': { icon: 'scroll', lib: FontAwesome5, colors: ['#4CAF50', '#81C784'] }
};

export const LibraryScreen = () => {
    const navigation = useNavigation<any>();

    const getCategoryDetails = (title: string) => {
        if (title.includes('Chalisa')) return categoryIcons['Chalisa'];
        if (title.includes('Aarti')) return categoryIcons['Aarti'];
        if (title.includes('Ashtak')) return categoryIcons['Ashtak'];
        return categoryIcons['Default'];
    };

    return (
        <ScrollView className="flex-1 bg-background" showsVerticalScrollIndicator={false}>
            {/* Header Banner */}
            <LinearGradient
                colors={['#f8f9fa', '#e9ecef']}
                className="px-6 py-10 mb-2"
            >
                <Text className="text-4xl font-black text-text mb-2">Divine Library</Text>
                <Text className="text-base text-lightText font-medium opacity-80">
                    Explore sacred texts, hymns, and spiritual compositions.
                </Text>
            </LinearGradient>

            <View className="px-5 py-4 pb-20">
                <View className="flex-row flex-wrap justify-between">
                    {textList.map((item) => {
                        const details = getCategoryDetails(item.title);
                        const IconLib = details.lib;

                        return (
                            <TouchableOpacity
                                key={item.id}
                                style={{ width: ITEM_WIDTH }}
                                className="mb-6 bg-white rounded-[32px] shadow-xl overflow-hidden border border-border/10"
                                onPress={() => navigation.navigate('Reader', { textId: item.id, title: item.title })}
                                activeOpacity={0.9}
                            >
                                <LinearGradient
                                    colors={details.colors}
                                    className="h-32 items-center justify-center relative overflow-hidden"
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                >
                                    <View className="absolute -right-4 -bottom-4 opacity-10">
                                        <IconLib name={details.icon} size={100} color="black" />
                                    </View>
                                    <View className="bg-white/20 p-4 rounded-full backdrop-blur-md border border-white/30">
                                        <IconLib name={details.icon} size={32} color="white" />
                                    </View>
                                </LinearGradient>

                                <View className="p-4 items-center min-h-[80px] justify-center">
                                    <Text
                                        className="text-base font-extrabold text-text text-center px-1"
                                        numberOfLines={2}
                                    >
                                        {item.title}
                                    </Text>
                                    <View className="w-6 h-1 bg-primary/20 rounded-full mt-2" />
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        </ScrollView>
    );
};
