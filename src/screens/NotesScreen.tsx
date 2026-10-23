import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, useWindowDimensions } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useT } from '../hooks/useT';
import { getNotes, UserNote } from '../utils/notesStorage';
import { ImageViewer, ViewerImage } from '../components/ImageViewer';
import { GUTTER } from '../components/ui';

const THUMB = 64;
const GALLERY_COLUMNS = 3;
const GALLERY_GAP = 4;

export const NotesScreen = () => {
    const navigation = useNavigation<any>();
    const { colors: theme } = useTheme();
    const { T } = useT();
    const [notes, setNotes] = useState<UserNote[]>([]);
    const [loading, setLoading] = useState(true);
    const [viewerIndex, setViewerIndex] = useState<number | null>(null);
    const [tab, setTab] = useState<'notes' | 'gallery'>('notes');
    const { width } = useWindowDimensions();
    const galleryTile = (width - GUTTER * 2 - GALLERY_GAP * (GALLERY_COLUMNS - 1)) / GALLERY_COLUMNS;

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

    // Every photo across all notes, so the viewer can move straight from one note's photos to the next
    const { allImages, firstImageIndex } = useMemo(() => {
        const all: ViewerImage[] = [];
        const first: Record<string, number> = {};
        for (const note of notes) {
            if (note.images.length) first[note.id] = all.length;
            note.images.forEach(uri => all.push({ uri, caption: note.title || T('notes_untitled') }));
        }
        return { allImages: all, firstImageIndex: first };
    }, [notes, T]);

    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
    };

    return (
        <View style={{ flex: 1, backgroundColor: theme.background }}>
            {/* Notes | Gallery segmented control */}
            <View style={{ paddingHorizontal: GUTTER, paddingTop: 8, paddingBottom: 4 }}>
                <View style={{ flexDirection: 'row', backgroundColor: theme.surfaceAlt, borderRadius: 10, padding: 3 }}>
                    {(['notes', 'gallery'] as const).map(key => {
                        const active = tab === key;
                        return (
                            <TouchableOpacity
                                key={key}
                                onPress={() => setTab(key)}
                                activeOpacity={0.7}
                                accessibilityState={{ selected: active }}
                                style={{
                                    flex: 1, height: 34, borderRadius: 8, alignItems: 'center', justifyContent: 'center', flexDirection: 'row',
                                    backgroundColor: active ? theme.surface : 'transparent',
                                }}
                            >
                                <Ionicons name={key === 'notes' ? 'document-text-outline' : 'images-outline'} size={16} color={active ? theme.text : theme.textMuted} />
                                <Text style={{ marginLeft: 6, fontSize: 14, fontWeight: active ? '700' : '500', color: active ? theme.text : theme.textMuted }}>
                                    {key === 'notes' ? T('notes_tab_notes') : `${T('notes_tab_gallery')}${allImages.length ? ` · ${allImages.length}` : ''}`}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>

            {tab === 'gallery' ? (
                <FlatList
                    key="gallery"
                    data={allImages}
                    numColumns={GALLERY_COLUMNS}
                    keyExtractor={(item, index) => `${item.uri}_${index}`}
                    showsVerticalScrollIndicator={false}
                    columnWrapperStyle={{ gap: GALLERY_GAP }}
                    contentContainerStyle={{ padding: GUTTER, paddingBottom: 110, gap: GALLERY_GAP }}
                    ListEmptyComponent={
                        !loading ? (
                            <View style={{ alignItems: 'center', paddingTop: 40 }}>
                                <Ionicons name="images-outline" size={44} color={theme.textMuted} />
                                <Text style={{ marginTop: 12, color: theme.textMuted, fontSize: 15, textAlign: 'center' }}>
                                    {T('notes_gallery_empty')}
                                </Text>
                            </View>
                        ) : null
                    }
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => setViewerIndex(index)} activeOpacity={0.85} accessibilityLabel={item.caption}>
                            <Image
                                source={{ uri: item.uri }}
                                style={{ width: galleryTile, height: galleryTile, borderRadius: 8, backgroundColor: theme.surfaceAlt }}
                            />
                        </TouchableOpacity>
                    )}
                />
            ) : (
                <FlatList
                    key="notes"
                    data={notes}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ padding: GUTTER, paddingBottom: 110 }}
                    ListHeaderComponent={
                        <>
                            <Text style={{ fontSize: 15, color: theme.textMuted, marginBottom: 16 }}>
                                {T('notes_subtitle')}
                            </Text>

                            {/* Feature explainer */}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    backgroundColor: theme.primarySoft,
                                    borderRadius: 16,
                                    padding: 14,
                                    marginBottom: 20,
                                }}
                            >
                                <Ionicons name="shield-checkmark-outline" size={20} color={theme.primary} style={{ marginRight: 10 }} />
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 14, fontWeight: '700', color: theme.text, marginBottom: 3 }}>
                                        {T('notes_info_title')}
                                    </Text>
                                    <Text style={{ fontSize: 13, color: theme.textMuted, lineHeight: 19 }}>
                                        {T('notes_info_desc')}
                                    </Text>
                                </View>
                            </View>
                        </>
                    }
                    ListEmptyComponent={
                        !loading ? (
                            <View style={{ alignItems: 'center', paddingTop: 40 }}>
                                <MaterialCommunityIcons name="notebook-outline" size={44} color={theme.textMuted} />
                                <Text style={{ marginTop: 12, color: theme.textMuted, fontSize: 15, textAlign: 'center' }}>
                                    {T('notes_empty')}
                                </Text>
                            </View>
                        ) : null
                    }
                    renderItem={({ item }) => (
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor: theme.surface,
                                borderRadius: 16,
                                padding: 12,
                                marginBottom: 10,
                                borderWidth: 1,
                                borderColor: theme.border,
                            }}
                        >
                            {item.images.length > 0 ? (
                                <TouchableOpacity
                                    onPress={() => setViewerIndex(firstImageIndex[item.id])}
                                    activeOpacity={0.85}
                                    accessibilityLabel={T('notes_photos')}
                                >
                                    <Image source={{ uri: item.images[0] }} style={{ width: THUMB, height: THUMB, borderRadius: 12, backgroundColor: theme.surfaceAlt }} />
                                    <View
                                        style={{
                                            position: 'absolute', right: 4, bottom: 4, flexDirection: 'row', alignItems: 'center',
                                            backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: 8, paddingHorizontal: 5, paddingVertical: 2,
                                        }}
                                    >
                                        <Ionicons name={item.images.length > 1 ? 'images' : 'expand'} size={11} color="#FFFFFF" />
                                        {item.images.length > 1 && (
                                            <Text style={{ color: '#FFFFFF', fontSize: 11, fontWeight: '700', marginLeft: 3 }}>{item.images.length}</Text>
                                        )}
                                    </View>
                                </TouchableOpacity>
                            ) : (
                                <View
                                    style={{
                                        width: THUMB, height: THUMB, borderRadius: 12,
                                        backgroundColor: theme.primarySoft, alignItems: 'center', justifyContent: 'center',
                                    }}
                                >
                                    <MaterialCommunityIcons name="text-box-outline" size={24} color={theme.primary} />
                                </View>
                            )}

                            <TouchableOpacity
                                onPress={() => navigation.navigate('NoteDetail', { noteId: item.id })}
                                activeOpacity={0.6}
                                style={{ flex: 1, flexDirection: 'row', alignItems: 'center', alignSelf: 'stretch', marginLeft: 12 }}
                            >
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 16, fontWeight: '700', color: theme.text }} numberOfLines={1}>
                                        {item.title || T('notes_untitled')}
                                    </Text>
                                    {!!item.text && (
                                        <Text style={{ fontSize: 14, color: theme.textMuted, marginTop: 2 }} numberOfLines={1}>{item.text}</Text>
                                    )}
                                    <Text style={{ fontSize: 12, color: theme.textMuted, marginTop: 4 }}>
                                        {formatDate(item.updatedAt)}
                                        {item.images.length > 0 ? `  ·  ${T('notes_photo_count', { n: item.images.length })}` : ''}
                                    </Text>
                                </View>
                                <Ionicons name="chevron-forward" size={18} color={theme.textMuted} />
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}

            {/* New note FAB */}
            <TouchableOpacity
                onPress={() => navigation.navigate('NoteEditor', {})}
                activeOpacity={0.85}
                accessibilityLabel={T('notes_new_title')}
                style={{
                    position: 'absolute',
                    bottom: 24,
                    right: GUTTER,
                    backgroundColor: theme.primary,
                    width: 58,
                    height: 58,
                    borderRadius: 29,
                    alignItems: 'center',
                    justifyContent: 'center',
                    elevation: 4,
                    shadowColor: '#000',
                    shadowOpacity: 0.18,
                    shadowRadius: 8,
                    shadowOffset: { width: 0, height: 3 },
                }}
            >
                <Ionicons name="add" size={30} color={theme.onPrimary} />
            </TouchableOpacity>

            <ImageViewer
                visible={viewerIndex !== null}
                images={allImages}
                initialIndex={viewerIndex ?? 0}
                onClose={() => setViewerIndex(null)}
            />
        </View>
    );
};
