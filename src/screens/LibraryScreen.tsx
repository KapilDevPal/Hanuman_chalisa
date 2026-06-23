import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { textList } from '../data/TextLibrary';

const libraryItemConfigs: Record<string, { icon: string; lib: any; color: string }> = {
    hanuman_ashtak: { icon: 'shield-sun', lib: MaterialCommunityIcons, color: '#E07A5F' },
    hanuman_aarti: { icon: 'fire', lib: MaterialCommunityIcons, color: '#F4A261' },
    sundarkand: { icon: 'crown', lib: MaterialCommunityIcons, color: '#3D5A80' },
    bajrang_baan: { icon: 'sword', lib: MaterialCommunityIcons, color: '#E76F51' },
    hanuman_raksha_mantra: { icon: 'shield-check', lib: MaterialCommunityIcons, color: '#2A9D8F' },
    mangalwar_katha: { icon: 'calendar-heart', lib: MaterialCommunityIcons, color: '#E29578' },
    bahuk_path: { icon: 'heart-pulse', lib: MaterialCommunityIcons, color: '#E07A5F' },
    ram_stuti: { icon: 'flower', lib: MaterialCommunityIcons, color: '#B5838D' },
    panchmukhi_hanuman_kavach: { icon: 'shield-account', lib: MaterialCommunityIcons, color: '#CD5D67' },
    hanuman_gayatri_mantra: { icon: 'weather-sunny', lib: MaterialCommunityIcons, color: '#E9C46A' },
    hanuman_dwadash_naam_stotram: { icon: 'format-list-numbered', lib: MaterialCommunityIcons, color: '#457B9D' }
};

export const LibraryScreen = () => {
    const navigation = useNavigation<any>();

    const getCategoryDetails = (id: string) => {
        return libraryItemConfigs[id] || { icon: 'scroll', lib: FontAwesome5, color: '#6A994E' };
    };

    return (
        <ScrollView className="flex-1 bg-[#FAF7F0]" showsVerticalScrollIndicator={false}>
            {/* Header Banner */}
            <View className="px-6 pt-10 pb-4">
                <Text className="text-3xl font-black text-text">Divine Library</Text>
                <Text className="text-sm text-lightText font-semibold mt-1">
                    Explore sacred texts, hymns, and spiritual compositions.
                </Text>
            </View>

            <View className="px-5 py-2 pb-24">
                <View>
                    {textList.map((item) => {
                        const details = getCategoryDetails(item.id);
                        const IconLib = details.lib;

                        return (
                            <TouchableOpacity
                                key={item.id}
                                className="mb-3 bg-white rounded-2xl border border-[#EADEC9] p-3 flex-row items-center shadow-sm"
                                onPress={() => navigation.navigate('Reader', { textId: item.id, title: item.title })}
                                activeOpacity={0.8}
                            >
                                <View style={{ backgroundColor: `${details.color}15` }} className="p-3 rounded-2xl mr-4 items-center justify-center">
                                    <IconLib name={details.icon} size={20} color={details.color} />
                                </View>
                                <View className="flex-1 justify-center">
                                    <Text
                                        className="text-sm font-extrabold text-[#3C2D1C] leading-5"
                                        numberOfLines={1}
                                    >
                                        {item.title}
                                    </Text>
                                    <Text className="text-[10px] text-[#A6947D] font-bold mt-0.5">Read sacred text</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={16} color="#A6947D" className="ml-2" />
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        </ScrollView>
    );
};
