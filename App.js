import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as Notifications from 'expo-notifications';
import { LanguageProvider } from './src/context/LanguageContext';
import { UserProvider } from './src/context/UserContext';
import { AudioProvider, useAudio } from './src/context/AudioContext';
import AppNavigator from './src/navigation/AppNavigator';
import { scheduleDailyReminder } from './src/utils/notifications';

function AppContent() {
  const { playAudio, pauseAudio } = useAudio();

  useEffect(() => {
    // Listener for notification actions (Play / Pause button clicks)
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      const actionIdentifier = response.actionIdentifier;
      if (actionIdentifier === 'PAUSE_ACTION') {
        pauseAudio();
      } else if (actionIdentifier === 'PLAY_ACTION') {
        playAudio();
      }
    });

    return () => {
      subscription.remove();
    };
  }, [playAudio, pauseAudio]);

  return <AppNavigator />;
}

export default function App() {
  useEffect(() => {
    // Schedule daily reminder on app mount
    scheduleDailyReminder();
  }, []);

  return (
    <LanguageProvider>
      <UserProvider>
        <AudioProvider>
          <StatusBar style="auto" />
          <AppContent />
        </AudioProvider>
      </UserProvider>
    </LanguageProvider>
  );
}

