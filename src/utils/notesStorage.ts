import AsyncStorage from '@react-native-async-storage/async-storage';
import { File, Directory, Paths } from 'expo-file-system';

export interface UserNote {
    id: string;
    title: string;
    text: string;
    imageUri: string | null;
    createdAt: number;
    updatedAt: number;
}

const NOTES_KEY = 'user_notes';
const IMAGES_DIR_NAME = 'user_notes_images';

const getImagesDir = (): Directory => {
    const dir = new Directory(Paths.document, IMAGES_DIR_NAME);
    if (!dir.exists) {
        dir.create({ intermediates: true });
    }
    return dir;
};

export async function getNotes(): Promise<UserNote[]> {
    try {
        const raw = await AsyncStorage.getItem(NOTES_KEY);
        if (!raw) return [];
        const notes: UserNote[] = JSON.parse(raw);
        return notes.sort((a, b) => b.updatedAt - a.updatedAt);
    } catch (error) {
        console.warn('Failed to load notes', error);
        return [];
    }
}

async function saveNotes(notes: UserNote[]): Promise<void> {
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

/**
 * Copies a picked image (which usually lives in a temporary cache location)
 * into this app's persistent document directory, so it survives even if the
 * OS clears the cache. Returns the new, durable file:// URI.
 */
export async function persistImage(pickedUri: string, noteId: string): Promise<string | null> {
    try {
        const dir = getImagesDir();
        const extension = pickedUri.split('.').pop()?.split('?')[0] || 'jpg';
        const destFile = new File(dir, `${noteId}.${extension}`);
        if (destFile.exists) {
            destFile.delete();
        }
        const sourceFile = new File(pickedUri);
        await sourceFile.copy(destFile);
        return destFile.uri;
    } catch (error) {
        console.warn('Failed to persist note image', error);
        return null;
    }
}

function deleteImageIfAny(imageUri: string | null) {
    if (!imageUri) return;
    try {
        const file = new File(imageUri);
        if (file.exists) {
            file.delete();
        }
    } catch (error) {
        console.warn('Failed to delete note image', error);
    }
}

export async function saveNote(note: UserNote): Promise<void> {
    const notes = await getNotes();
    const existingIndex = notes.findIndex(n => n.id === note.id);
    if (existingIndex >= 0) {
        notes[existingIndex] = note;
    } else {
        notes.push(note);
    }
    await saveNotes(notes);
}

export async function deleteNote(id: string): Promise<void> {
    const notes = await getNotes();
    const target = notes.find(n => n.id === id);
    if (target) {
        deleteImageIfAny(target.imageUri);
    }
    await saveNotes(notes.filter(n => n.id !== id));
}
