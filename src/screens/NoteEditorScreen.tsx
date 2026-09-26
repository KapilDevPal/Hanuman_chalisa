import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { useTheme } from '../context/ThemeContext';
import { useT } from '../hooks/useT';
import { getNotes, saveNote, deleteNote, persistImage, UserNote } from '../utils/notesStorage';

export const NoteEditorScreen = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const noteId: string | undefined = route.params?.noteId;
    const { colors: theme } = useTheme();
    const { T } = useT();

    const [id] = useState(() => noteId || `note_${Date.now()}`);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [pendingPickedUri, setPendingPickedUri] = useState<string | null>(null);
    const [createdAt, setCreatedAt] = useState(Date.now());
    const [saving, setSaving] = useState(false);
    const isEditing = !!noteId;

    useEffect(() => {
        if (!noteId) return;
        (async () => {
            const notes = await getNotes();
            const existing = notes.find(n => n.id === noteId);
            if (existing) {
                setTitle(existing.title);
                setText(existing.text);
                setImageUri(existing.imageUri);
                setCreatedAt(existing.createdAt);
            }
        })();
    }, [noteId]);

    const pickImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            Alert.alert(T('notes_permission_title'), T('notes_permission_desc'));
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            quality: 0.7,
            allowsEditing: true,
        });
        if (!result.canceled && result.assets?.[0]) {
            setPendingPickedUri(result.assets[0].uri);
            setImageUri(result.assets[0].uri);
        }
    };

    const removeImage = () => {
        setImageUri(null);
        setPendingPickedUri(null);
    };

    const handleSave = async () => {
        if (!title.trim() && !text.trim() && !imageUri) {
            navigation.goBack();
            return;
        }
        setSaving(true);
        try {
            let finalImageUri = imageUri;
            if (pendingPickedUri) {
                finalImageUri = await persistImage(pendingPickedUri, id);
            }

            const note: UserNote = {
                id,
                title: title.trim(),
                text: text.trim(),
                imageUri: finalImageUri,
                createdAt,
                updatedAt: Date.now(),
            };
            await saveNote(note);
            navigation.goBack();
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
                    navigation.goBack();
                },
            },
        ]);
    };

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: theme.background }}
            contentContainerStyle={{ padding: 20, paddingBottom: 60 }}
            keyboardShouldPersistTaps="handled"
        >
            <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder={T('notes_title_ph')}
                placeholderTextColor={theme.lightText}
                style={{
                    fontSize: 20,
                    fontWeight: '900',
                    color: theme.text,
                    marginBottom: 14,
                    paddingBottom: 8,
                    borderBottomWidth: 1,
                    borderBottomColor: theme.border,
                }}
            />

            {imageUri ? (
                <View style={{ marginBottom: 16 }}>
                    <Image source={{ uri: imageUri }} style={{ width: '100%', height: 200, borderRadius: 18 }} resizeMode="cover" />
                    <TouchableOpacity
                        onPress={removeImage}
                        style={{
                            position: 'absolute', top: 10, right: 10,
                            backgroundColor: 'rgba(0,0,0,0.55)', borderRadius: 16, padding: 6,
                        }}
                    >
                        <Ionicons name="trash-outline" size={18} color="#fff" />
                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity
                    onPress={pickImage}
                    activeOpacity={0.7}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: theme.card,
                        borderRadius: 18,
                        borderWidth: 1.5,
                        borderColor: Colors.primary + '40',
                        borderStyle: 'dashed',
                        paddingVertical: 22,
                        marginBottom: 16,
                    }}
                >
                    <Ionicons name="image-outline" size={20} color={Colors.primary} style={{ marginRight: 8 }} />
                    <Text style={{ color: Colors.primary, fontWeight: '800', fontSize: 13 }}>{T('notes_add_image')}</Text>
                </TouchableOpacity>
            )}

            <TextInput
                value={text}
                onChangeText={setText}
                placeholder={T('notes_text_ph')}
                placeholderTextColor={theme.lightText}
                multiline
                textAlignVertical="top"
                style={{
                    fontSize: 14.5,
                    color: theme.text,
                    fontWeight: '500',
                    lineHeight: 22,
                    minHeight: 160,
                    backgroundColor: theme.card,
                    borderRadius: 18,
                    padding: 16,
                    borderWidth: 1,
                    borderColor: theme.border,
                    marginBottom: 20,
                }}
            />

            <TouchableOpacity
                onPress={handleSave}
                disabled={saving}
                activeOpacity={0.85}
                style={{
                    backgroundColor: Colors.primary,
                    borderRadius: 18,
                    paddingVertical: 15,
                    alignItems: 'center',
                    marginBottom: isEditing ? 12 : 0,
                    opacity: saving ? 0.7 : 1,
                }}
            >
                <Text style={{ color: '#fff', fontWeight: '900', fontSize: 15 }}>
                    {saving ? T('notes_saving') : T('notes_save')}
                </Text>
            </TouchableOpacity>

            {isEditing && (
                <TouchableOpacity onPress={handleDelete} activeOpacity={0.7} style={{ alignItems: 'center', padding: 8 }}>
                    <Text style={{ color: Colors.accent, fontWeight: '800', fontSize: 13 }}>{T('notes_delete_title')}</Text>
                </TouchableOpacity>
            )}
        </ScrollView>
    );
};
