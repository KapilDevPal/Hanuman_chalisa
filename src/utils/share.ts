import { Linking, Share, Alert } from 'react-native';

export const INSTAGRAM_URL = 'https://www.instagram.com/mandirpedia/';
export const MANDIRPEDIA_URL = 'https://mandirpedia.com/';

const SHARE_MESSAGE = `🙏 Jai Shri Ram! Check out Mandirpedia — a directory of temples and spiritual resources: ${MANDIRPEDIA_URL}`;

export async function openInstagramProfile() {
    try {
        await Linking.openURL(INSTAGRAM_URL);
    } catch (error) {
        console.warn('Failed to open Instagram', error);
    }
}

/** Shares the Mandirpedia link via WhatsApp, falling back to the system share sheet. */
export async function shareOnWhatsApp() {
    const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(SHARE_MESSAGE)}`;
    try {
        const canOpen = await Linking.canOpenURL(whatsappUrl);
        if (canOpen) {
            await Linking.openURL(whatsappUrl);
            return;
        }
    } catch (error) {
        console.warn('WhatsApp not available, falling back to share sheet', error);
    }

    try {
        await Share.share({ message: SHARE_MESSAGE });
    } catch (error) {
        console.warn('Failed to share', error);
        Alert.alert('Could not share right now.');
    }
}
