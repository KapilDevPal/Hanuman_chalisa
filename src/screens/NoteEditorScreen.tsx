import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useT } from '../hooks/useT';
import { getNotes, saveNote, deleteNote, persistImage, isPersisted, UserNote } from '../utils/notesStorage';
import { ImageViewer } from '../components/ImageViewer';
import { Button, SectionLabel, GUTTER } from '../components/ui';

const THUMB = 96;

export const NoteEditorScreen = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const noteId: string | undefined = route.params?.noteId;
    const { colors: theme } = useTheme();
    const { T } = useT();

    const [id] = useState(() => noteId || `note_${Date.now()}`);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    // Mix of persisted file:// URIs and freshly picked (temporary) URIs until saved
    const [images, setImages] = useState<string[]>([]);
    const [createdAt, setCreatedAt] = useState(Date.now());
    const [saving, setSaving] = useState(false);
    const [viewerIndex, setViewerIndex] = useState<number | null>(null);
    const isEditing = !!noteId;

    useEffect(() => {
        if (!noteId) return;
        (async () => {
            const notes = await getNotes();
            const existing = notes.find(n => n.id === noteId);
            if (existing) {
                setTitle(existing.title);
                setText(existing.text);
                setImages(existing.images);
                setCreatedAt(existing.createdAt);
            }
        })();
    }, [noteId]);

    const pickImages = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            Alert.alert(T('notes_permission_title'), T('notes_permission_desc'));
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            quality: 0.8,
            allowsMultipleSelection: true,
            orderedSelection: true,
        });
        if (!result.canceled && result.assets?.length) {
            setImages(prev => [...prev, ...result.assets.map(a => a.uri)]);
        }
    };

    const removeImage = (uri: string) => setImages(prev => prev.filter(u => u !== uri));

    const handleSave = async () => {
        if (!title.trim() && !text.trim() && images.length === 0) {
            navigation.goBack();
            return;
        }
        setSaving(true);
        try {
            const finalImages: string[] = [];
            for (const uri of images) {
                const persisted = isPersisted(uri) ? uri : await persistImage(uri, id);
                if (persisted) finalImages.push(persisted);
            }

            const note: UserNote = {
                id,
                title: title.trim(),
                text: text.trim(),
                images: finalImages,
                createdAt,
                updatedAt: Date.now(),
            };
            await saveNote(note);
            // A new note opens in its gallery view; an edited one returns to it
            if (isEditing) navigation.goBack();
            else navigation.replace('NoteDetail', { noteId: id });
        } catch (error) {
            console.warn('Failed to save note', error);
            Alert.alert(T('notes_save_error'));
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = () => {
        Alert.alert(T('notes_delete_title'), T('notes_delete_q'), [
            { text: T('sankalp_cancel'), style: 'cancel' },
            {
                text: T('notes_delete_title'),
                style: 'destructive',
                onPress: async () => {
                    await deleteNote(id);
                    navigation.popTo('Notes');
                },
            },
        ]);
    };

    return (
        <>
            <ScrollView
                style={{ flex: 1, backgroundColor: theme.background }}
                contentContainerStyle={{ padding: GUTTER, paddingBottom: 60 }}
                keyboardShouldPersistTaps="handled"
            >
                <TextInput
                    value={title}
                    onChangeText={setTitle}
                    placeholder={T('notes_title_ph')}
                    placeholderTextColor={theme.textMuted}
                    style={{ fontSize: 24, fontWeight: '800', color: theme.text, paddingVertical: 8, marginBottom: 16 }}
                />

                {/* Photos */}
                <SectionLabel>{T('notes_photos')}</SectionLabel>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ marginHorizontal: -GUTTER, marginBottom: 6 }}
                    contentContainerStyle={{ paddingHorizontal: GUTTER, gap: 10 }}
                >
                    {images.map((uri, index) => (
                        <TouchableOpacity key={`${uri}_${index}`} onPress={() => setViewerIndex(index)} activeOpacity={0.85}>
                            <Image source={{ uri }} style={{ width: THUMB, height: THUMB, borderRadius: 14, backgroundColor: theme.surfaceAlt }} />
                            <TouchableOpacity
                                onPress={() => removeImage(uri)}
                                hitSlop={8}
                                accessibilityLabel="Remove photo"
                                style={{
                                    position: 'absolute', top: 6, right: 6, width: 24, height: 24, borderRadius: 12,
                                    backgroundColor: 'rgba(0,0,0,0.6)', alignItems: 'center', justifyContent: 'center',
                                }}
                            >
                                <Ionicons name="close" size={16} color="#FFFFFF" />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity
                        onPress={pickImages}
                        activeOpacity={0.7}
                        style={{
                            width: THUMB, height: THUMB, borderRadius: 14, borderWidth: 1.5, borderStyle: 'dashed',
                            borderColor: theme.primary + '66', backgroundColor: theme.primarySoft,
                            alignItems: 'center', justifyContent: 'center',
                        }}
                    >
                        <Ionicons name="add" size={26} color={theme.primary} />
                        <Text style={{ color: theme.primary, fontWeight: '700', fontSize: 12, marginTop: 2 }}>{T('notes_add_image')}</Text>
                    </TouchableOpacity>
                </ScrollView>
                {images.length > 0 && (
                    <Text style={{ fontSize: 13, color: theme.textMuted, marginBottom: 20 }}>{T('notes_photos_hint')}</Text>
                )}
                {images.length === 0 && <View style={{ height: 14 }} />}

                <TextInput
                    value={text}
                    onChangeText={setText}
                    placeholder={T('notes_text_ph')}
                    placeholderTextColor={theme.textMuted}
                    multiline
                    textAlignVertical="top"
                    style={{
                        fontSize: 16, color: theme.text, lineHeight: 24, minHeight: 160,
                        backgroundColor: theme.surface, borderRadius: 16, padding: 16,
                        borderWidth: 1, borderColor: theme.border, marginBottom: 20,
                    }}
                />

                <Button title={saving ? T('notes_saving') : T('notes_save')} onPress={handleSave} disabled={saving} />
                {isEditing && (
                    <Button title={T('notes_delete_title')} variant="danger" onPress={handleDelete} style={{ marginTop: 8 }} />
                )}
            </ScrollView>

            <ImageViewer
                visible={viewerIndex !== null}
                images={images.map(uri => ({ uri, caption: title.trim() || undefined }))}
                initialIndex={viewerIndex ?? 0}
                onClose={() => setViewerIndex(null)}
            />
        </>
    );
};
