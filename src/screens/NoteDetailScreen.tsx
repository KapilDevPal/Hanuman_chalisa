import React, { useCallback, useLayoutEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useT } from '../hooks/useT';
import { getNotes, UserNote } from '../utils/notesStorage';
import { ImageViewer } from '../components/ImageViewer';
import { Screen, Surface, GUTTER } from '../components/ui';

const GAP = 8;

/** Read view of a saved note: photos as a tappable gallery, then the text. */
export const NoteDetailScreen = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const noteId: string = route.params?.noteId;
    const { colors } = useTheme();
    const { T } = useT();
    const { width } = useWindowDimensions();
    const [note, setNote] = useState<UserNote | null>(null);
    const [viewerIndex, setViewerIndex] = useState<number | null>(null);

    // Reload after returning from the editor
    useFocusEffect(
        useCallback(() => {
            getNotes().then(notes => {
                const found = notes.find(n => n.id === noteId) ?? null;
                if (!found) {
                    navigation.goBack(); // deleted from the editor
                    return;
                }
                setNote(found);
            });
        }, [noteId])
    );

    useLayoutEffect(() => {
        navigation.setOptions({
            title: note?.title || T('notes_untitled'),
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => navigation.navigate('NoteEditor', { noteId })}
                    hitSlop={10}
                    style={{ marginRight: 16, flexDirection: 'row', alignItems: 'center' }}
                >
                    <Ionicons name="create-outline" size={20} color={colors.primary} />
                    <Text style={{ fontSize: 16, fontWeight: '600', color: colors.primary, marginLeft: 4 }}>{T('notes_edit')}</Text>
                </TouchableOpacity>
            ),
        });
    }, [navigation, note?.title, colors, T]);

    if (!note) return <View style={{ flex: 1, backgroundColor: colors.background }} />;

    // One photo: full width. Several: two-column grid.
    const columns = note.images.length === 1 ? 1 : 2;
    const tileSize = (width - GUTTER * 2 - GAP * (columns - 1)) / columns;

    return (
        <>
            <Screen>
                <Text style={{ fontSize: 13, color: colors.textMuted, marginBottom: 16 }}>
                    {new Date(note.updatedAt).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}
                    {note.images.length > 0 ? `  ·  ${T('notes_photo_count', { n: note.images.length })}` : ''}
                </Text>

                {note.images.length > 0 && (
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: GAP, marginBottom: 20 }}>
                        {note.images.map((uri, index) => (
                            <TouchableOpacity
                                key={`${uri}_${index}`}
                                onPress={() => setViewerIndex(index)}
                                activeOpacity={0.85}
                                accessibilityLabel={`${T('notes_photos')} ${index + 1}`}
                            >
                                <Image
                                    source={{ uri }}
                                    style={{
                                        width: tileSize,
                                        height: columns === 1 ? tileSize * 1.25 : tileSize,
                                        borderRadius: 14,
                                        backgroundColor: colors.surfaceAlt,
                                    }}
                                    resizeMode="cover"
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                {!!note.text && (
                    <Surface>
                        <Text style={{ fontSize: 16, lineHeight: 25, color: colors.text }} selectable>{note.text}</Text>
                    </Surface>
                )}
            </Screen>

            <ImageViewer
                visible={viewerIndex !== null}
                images={note.images.map(uri => ({ uri, caption: note.title || undefined }))}
                initialIndex={viewerIndex ?? 0}
                onClose={() => setViewerIndex(null)}
            />
        </>
    );
};
