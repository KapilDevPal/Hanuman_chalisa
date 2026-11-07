import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { Notifications } from './src/utils/notificationsCompat';
import { LanguageProvider, useLanguage } from './src/context/LanguageContext';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { UserProvider } from './src/context/UserContext';
import AppNavigator from './src/navigation/AppNavigator';
import { scheduleDailyReminder } from './src/utils/notifications';
import { useInAppUpdates } from './src/hooks/useInAppUpdates';

// Keep the native splash (logo on app background) up until saved theme/language are loaded,
// so the first frame the user sees is the real home screen in the right theme and language.
SplashScreen.preventAutoHideAsync().catch(() => { });
SplashScreen.setOptions({ duration: 300, fade: true });

function ThemedStatusBar() {
  const { colors } = useTheme();
  return <StatusBar style={colors.statusBar} />;
}

// ─── App Content ──────────────────────────────────────────────────────────────
function AppContent() {
  const { isLoading: themeLoading } = useTheme();
  const { isLoading: languageLoading } = useLanguage();
  const ready = !themeLoading && !languageLoading;

  useEffect(() => {
    if (ready) SplashScreen.hideAsync().catch(() => { });
  }, [ready]);

  // Google Play flexible update check (Android release builds only; no-op in Expo Go)
  useInAppUpdates(ready);

  if (!ready) return null;
  return <AppNavigator />;
}

// ─── Root App ─────────────────────────────────────────────────────────────────
export default function App() {
  useEffect(() => {
    scheduleDailyReminder();
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <UserProvider>
          <ThemedStatusBar />
          <AppContent />
        </UserProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
