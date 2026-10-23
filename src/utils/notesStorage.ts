import AsyncStorage from '@react-native-async-storage/async-storage';
import { File, Directory, Paths } from 'expo-file-system';

export interface UserNote {
    id: string;
    title: string;
    text: string;
    /** Persistent file:// URIs, in display order */
    images: string[];
    createdAt: number;
    updatedAt: number;
}

/** Shape written by older app versions (single image per note). */
type StoredNote = Omit<UserNote, 'images'> & { images?: string[]; imageUri?: string | null };

const NOTES_KEY = 'user_notes';
const IMAGES_DIR_NAME = 'user_notes_images';

const getImagesDir = (): Directory => {
    const dir = new Directory(Paths.document, IMAGES_DIR_NAME);
    if (!dir.exists) {
        dir.create({ intermediates: true });
    }
    return dir;
};

const normalize = ({ imageUri, images, ...rest }: StoredNote): UserNote => ({
    ...rest,
    images: images ?? (imageUri ? [imageUri] : []),
});

export async function getNotes(): Promise<UserNote[]> {
    try {
        const raw = await AsyncStorage.getItem(NOTES_KEY);
        if (!raw) return [];
        const notes: StoredNote[] = JSON.parse(raw);
        return notes.map(normalize).sort((a, b) => b.updatedAt - a.updatedAt);
    } catch (error) {
        console.warn('Failed to load notes', error);
        return [];
    }
}

async function saveNotes(notes: UserNote[]): Promise<void> {
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

/** True when the URI already lives in this app's persistent notes folder. */
export function isPersisted(uri: string): boolean {
    return uri.startsWith(getImagesDir().uri);
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
        const uniqueSuffix = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
        const destFile = new File(dir, `${noteId}_${uniqueSuffix}.${extension}`);
        const sourceFile = new File(pickedUri);
        await sourceFile.copy(destFile);
        return destFile.uri;
    } catch (error) {
        console.warn('Failed to persist note image', error);
        return null;
    }
}

function deleteImages(uris: string[]) {
    for (const uri of uris) {
        try {
            const file = new File(uri);
            if (file.exists) {
                file.delete();
            }
        } catch (error) {
            console.warn('Failed to delete note image', error);
        }
    }
}

export async function saveNote(note: UserNote): Promise<void> {
    const notes = await getNotes();
    const existingIndex = notes.findIndex(n => n.id === note.id);
    if (existingIndex >= 0) {
        // Remove files for photos the user took out of this note
        deleteImages(notes[existingIndex].images.filter(uri => !note.images.includes(uri)));
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
        deleteImages(target.images);
    }
    await saveNotes(notes.filter(n => n.id !== id));
}
