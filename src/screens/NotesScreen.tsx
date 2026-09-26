import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { useTheme } from '../context/ThemeContext';
import { useT } from '../hooks/useT';
import { getNotes, UserNote } from '../utils/notesStorage';

export const NotesScreen = () => {
    const navigation = useNavigation<any>();
    const { colors: theme } = useTheme();
    const { T } = useT();
    const [notes, setNotes] = useState<UserNote[]>([]);
    const [loading, setLoading] = useState(true);

    const loadNotes = useCallback(async () => {
        const stored = await getNotes();
        setNotes(stored);
        setLoading(false);
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadNotes();
        }, [loadNotes])
    );

    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
    };

    return (
        <View style={{ flex: 1, backgroundColor: theme.background }}>
            <FlatList
                data={notes}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 18, paddingBottom: 24 }}
                ListHeaderComponent={
                    <>
                        <Text style={{ fontSize: 24, fontWeight: '900', color: theme.text, marginBottom: 4 }}>
                            {T('notes_title')}
                        </Text>
                        <Text style={{ fontSize: 13, color: theme.lightText, fontWeight: '600', marginBottom: 16 }}>
                            {T('notes_subtitle')}
                        </Text>

                        {/* Feature explainer */}
                        <View
                            style={{
                                flexDirection: 'row',
                                backgroundColor: Colors.primary + '12',
                                borderRadius: 18,
                                padding: 14,
                                borderWidth: 1,
                                borderColor: Colors.primary + '30',
                                marginBottom: 18,
                            }}
                        >
                            <View style={{ marginRight: 10 }}>
                                <Ionicons name="shield-checkmark-outline" size={20} color={Colors.primary} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 12.5, fontWeight: '800', color: theme.text, marginBottom: 3 }}>
                                    {T('notes_info_title')}
                                </Text>
                                <Text style={{ fontSize: 11.5, color: theme.lightText, fontWeight: '600', lineHeight: 17 }}>
                                    {T('notes_info_desc')}
                                </Text>
                            </View>
                        </View>
                    </>
                }
                ListEmptyComponent={
                    !loading ? (
                        <View style={{ alignItems: 'center', paddingTop: 40 }}>
                            <MaterialCommunityIcons name="notebook-outline" size={48} color={Colors.primary} />
                            <Text style={{ marginTop: 14, color: theme.lightText, fontWeight: '700', textAlign: 'center' }}>
                                {T('notes_empty')}
                            </Text>
                        </View>
                    ) : null
                }
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('NoteEditor', { noteId: item.id })}
                        activeOpacity={0.8}
                        style={{
                            flexDirection: 'row',
                            backgroundColor: theme.card,
                            borderRadius: 18,
                            padding: 14,
                            marginBottom: 12,
                            borderWidth: 1,
                            borderColor: theme.border,
                            alignItems: 'center',
                        }}
                    >
                        {item.imageUri ? (
                            <Image source={{ uri: item.imageUri }} style={{ width: 52, height: 52, borderRadius: 12, marginRight: 12 }} />
                        ) : (
                            <View
                                style={{
                                    width: 52, height: 52, borderRadius: 12, marginRight: 12,
                                    backgroundColor: Colors.primary + '15',
                                    alignItems: 'center', justifyContent: 'center',
                                }}
                            >
                                <MaterialCommunityIcons name="text-box-outline" size={22} color={Colors.primary} />
                            </View>
                        )}
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 14.5, fontWeight: '800', color: theme.text }} numberOfLines={1}>
                                {item.title || T('notes_untitled')}
                            </Text>
                            <Text style={{ fontSize: 12, color: theme.lightText, fontWeight: '600', marginTop: 2 }} numberOfLines={1}>
                                {item.text || ' '}
                            </Text>
                            <Text style={{ fontSize: 10, color: theme.lightText, fontWeight: '600', marginTop: 4 }}>
                                {formatDate(item.updatedAt)}
                            </Text>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color={theme.lightText} />
                    </TouchableOpacity>
                )}
            />

            {/* New note FAB */}
            <TouchableOpacity
                onPress={() => navigation.navigate('NoteEditor', {})}
                activeOpacity={0.85}
                style={{
                    position: 'absolute',
                    bottom: 26,
                    right: 22,
                    backgroundColor: Colors.primary,
                    width: 58,
                    height: 58,
                    borderRadius: 29,
                    alignItems: 'center',
                    justifyContent: 'center',
                    shadowColor: '#000',
                    shadowOpacity: 0.25,
                    shadowRadius: 10,
                    shadowOffset: { width: 0, height: 4 },
                    elevation: 6,
                }}
            >
                <Ionicons name="add" size={30} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};
