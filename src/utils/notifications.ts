import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
    handleNotification: async (notification) => {
        // If it's a playback control notification, don't show an alert, play sound, or show banner
        const isPlayback = notification.request.identifier === 'hanuman-chalisa-playback';
        return {
            shouldShowAlert: !isPlayback,
            shouldPlaySound: !isPlayback,
            shouldSetBadge: false,
            shouldShowBanner: !isPlayback,
            shouldShowList: true,
        };
    },
});

// Register Notification Categories for Media Playback Controls
export const registerMediaCategories = async () => {
    try {
        // Category shown when media is playing: exhibits a 'Pause' button
        await Notifications.setNotificationCategoryAsync('media-playing', [
            {
                identifier: 'PAUSE_ACTION',
                buttonTitle: 'Pause ‖',
                options: { opensAppToForeground: false },
            },
        ]);

        // Category shown when media is paused: exhibits a 'Play' button
        await Notifications.setNotificationCategoryAsync('media-paused', [
            {
                identifier: 'PLAY_ACTION',
                buttonTitle: 'Play ▷',
                options: { opensAppToForeground: false },
            },
        ]);
    } catch (error) {
        console.warn("Failed to set notification categories:", error);
    }
};

const PLAYBACK_NOTIFICATION_ID = 'hanuman-chalisa-playback';

export const showPlaybackNotification = async (isPlaying: boolean) => {
    try {
        await registerMediaCategories();

        await Notifications.scheduleNotificationAsync({
            identifier: PLAYBACK_NOTIFICATION_ID,
            content: {
                title: 'Shree Hanuman Chalisa',
                body: isPlaying ? 'Playing Divine Chanting' : 'Paused',
                categoryIdentifier: isPlaying ? 'media-playing' : 'media-paused',
                autoDismiss: false,
                sound: false,
                vibrate: [0, 0, 0, 0],
                color: '#FF9933',
            },
            trigger: null,
        });
    } catch (error) {
        console.warn("Error showing playback notification:", error);
    }
};

export const dismissPlaybackNotification = async () => {
    try {
        await Notifications.dismissNotificationAsync(PLAYBACK_NOTIFICATION_ID);
    } catch (error) {
        console.warn("Error dismissing playback notification:", error);
    }
};

export const scheduleDailyReminder = async () => {
    try {
        const { status } = await Notifications.getPermissionsAsync();
        let finalStatus = status;

        if (status !== 'granted') {
            const { status: newStatus } = await Notifications.requestPermissionsAsync();
            finalStatus = newStatus;
        }

        if (finalStatus !== 'granted') {
            return false;
        }

        // Cancel all previous except playback
        const scheduled = await Notifications.getAllScheduledNotificationsAsync();
        for (const notification of scheduled) {
            if (notification.identifier !== PLAYBACK_NOTIFICATION_ID) {
                await Notifications.cancelScheduledNotificationAsync(notification.identifier);
            }
        }

        // Schedule for 6:00 AM daily
        const trigger: Notifications.CalendarTriggerInput = {
            hour: 6,
            minute: 0,
            repeats: true,
            type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
        };

        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Jai Shri Ram",
                body: "Start your day with Hanuman Chalisa.",
            },
            trigger,
        });

        return true;
    } catch (error) {
        console.warn("Notification scheduling failed (likely due to Expo Go limitations):", error);
        return false;
    }
};

