import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { useTheme } from '../context/ThemeContext';
import { useT } from '../hooks/useT';

interface MenuRowProps {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    onPress: () => void;
}

export const MoreScreen = () => {
    const navigation = useNavigation<any>();
    const { colors: theme } = useTheme();
    const { T } = useT();

    const MenuRow: React.FC<MenuRowProps> = ({ icon, title, subtitle, onPress }) => (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.75}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: theme.card,
                borderRadius: 20,
                padding: 16,
                marginBottom: 12,
                borderWidth: 1,
                borderColor: theme.border,
                shadowColor: '#000',
                shadowOpacity: 0.04,
                shadowRadius: 6,
                shadowOffset: { width: 0, height: 2 },
                elevation: 1,
            }}
        >
            <View
                style={{
                    backgroundColor: Colors.primary + '18',
                    borderRadius: 14,
                    padding: 10,
                    marginRight: 14,
                }}
            >
                {icon}
            </View>
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 15, fontWeight: '800', color: theme.text }}>{title}</Text>
                <Text style={{ fontSize: 12, color: theme.lightText, fontWeight: '600', marginTop: 2 }}>{subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.lightText} />
        </TouchableOpacity>
    );

    return (
        <ScrollView style={{ flex: 1, backgroundColor: theme.background }} showsVerticalScrollIndicator={false}>
            <View style={{ paddingHorizontal: 22, paddingTop: 20, paddingBottom: 8 }}>
                <Text style={{ fontSize: 28, fontWeight: '900', color: theme.text }}>{T('more_title')}</Text>
                <Text style={{ fontSize: 13, color: theme.lightText, fontWeight: '600', marginTop: 4 }}>
                    {T('more_subtitle')}
                </Text>
            </View>

            <View style={{ paddingHorizontal: 18, paddingTop: 20 }}>
                <Text style={{ fontSize: 11, fontWeight: '900', color: theme.lightText, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10, marginLeft: 4 }}>
                    {T('more_explore_section')}
                </Text>
                <MenuRow
                    icon={<Ionicons name="globe-outline" size={20} color={Colors.primary} />}
                    title={T('more_mandirpedia')}
                    subtitle={T('more_mandirpedia_sub')}
                    onPress={() => navigation.navigate('WebView', {
                        url: 'https://mandirpedia.com/',
                        title: T('more_mandirpedia'),
                        subtitle: T('more_mandirpedia_sub'),
                    })}
                />
                <MenuRow
                    icon={<Ionicons name="phone-portrait-outline" size={20} color={Colors.primary} />}
                    title={T('more_mobile_access')}
                    subtitle={T('more_mobile_access_sub')}
                    onPress={() => navigation.navigate('WebView', {
                        url: 'https://mandirpedia.com/mobile-acess',
                        title: T('more_mobile_access'),
                        subtitle: T('more_mobile_access_sub'),
                    })}
                />

                <Text style={{ fontSize: 11, fontWeight: '900', color: theme.lightText, textTransform: 'uppercase', letterSpacing: 1, marginTop: 12, marginBottom: 10, marginLeft: 4 }}>
                    {T('more_personal_section')}
                </Text>
                <MenuRow
                    icon={<MaterialCommunityIcons name="notebook-outline" size={20} color={Colors.primary} />}
                    title={T('more_notes')}
                    subtitle={T('more_notes_sub')}
                    onPress={() => navigation.navigate('Notes')}
                />
            </View>

            <View style={{ height: 24 }} />
        </ScrollView>
    );
};
