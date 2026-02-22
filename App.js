import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { LanguageProvider } from './src/context/LanguageContext';
import { UserProvider } from './src/context/UserContext';
import AppNavigator from './src/navigation/AppNavigator';
import { scheduleDailyReminder } from './src/utils/notifications';

export default function App() {

  useEffect(() => {
    // Schedule daily reminder on app mount
    scheduleDailyReminder();
  }, []);

  return (
    <LanguageProvider>
      <UserProvider>
        <StatusBar style="auto" />
        <AppNavigator />
      </UserProvider>
    </LanguageProvider>
  );
}
