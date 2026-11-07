import type * as NotificationsTypes from 'expo-notifications';
import { Notifications } from './notificationsCompat';

if (Notifications) {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
            shouldShowBanner: true,
            shouldShowList: true,
        }),
    });
}

export const scheduleDailyReminder = async () => {
    if (!Notifications) return false;
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

        // Replace any previously scheduled reminder
        await Notifications.cancelAllScheduledNotificationsAsync();

        // Schedule for 6:00 AM daily
        const trigger: NotificationsTypes.CalendarTriggerInput = {
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

