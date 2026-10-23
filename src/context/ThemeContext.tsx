import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeMode = 'light' | 'dark';

/** Design tokens shared by every screen. Use these instead of hardcoded colours. */
export interface ThemePalette {
    background: string;
    surface: string;
    /** Subtle fill for chips, inputs and icon buttons */
    surfaceAlt: string;
    text: string;
    textMuted: string;
    border: string;
    primary: string;
    /** Tinted background behind primary-coloured icons / selected states */
    primarySoft: string;
    onPrimary: string;
    danger: string;
    success: string;
    statusBar: 'light' | 'dark';
}

const lightPalette: ThemePalette = {
    background: '#FAF8F5',
    surface: '#FFFFFF',
    surfaceAlt: '#F3EFE8',
    text: '#1F1A14',
    textMuted: '#7A6F62',
    border: '#ECE6DC',
    primary: '#E8710A',
    primarySoft: '#FDF0E3',
    onPrimary: '#FFFFFF',
    danger: '#D14343',
    success: '#2E9E5B',
    statusBar: 'dark',
};

const darkPalette: ThemePalette = {
    background: '#121110',
    surface: '#1C1A17',
    surfaceAlt: '#26231F',
    text: '#F3EEE7',
    textMuted: '#A39889',
    border: '#2E2A25',
    primary: '#FF9433',
    primarySoft: '#3A2614',
    onPrimary: '#1A1209',
    danger: '#F07070',
    success: '#4CC27F',
    statusBar: 'light',
};

interface ThemeContextProps {
    mode: ThemeMode;
    colors: ThemePalette;
    isDark: boolean;
    toggleMode: () => void;
    setMode: (mode: ThemeMode) => void;
    isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextProps>({
    mode: 'light',
    colors: lightPalette,
    isDark: false,
    toggleMode: () => { },
    setMode: () => { },
    isLoading: true,
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [mode, setModeState] = useState<ThemeMode>('light');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const stored = await AsyncStorage.getItem('app_theme_mode');
                if (stored === 'light' || stored === 'dark') {
                    setModeState(stored);
                }
            } catch (error) {
                console.error('Failed to load theme mode', error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    const setMode = async (next: ThemeMode) => {
        try {
            setModeState(next);
            await AsyncStorage.setItem('app_theme_mode', next);
        } catch (error) {
            console.error('Failed to save theme mode', error);
        }
    };

    const toggleMode = () => setMode(mode === 'dark' ? 'light' : 'dark');

    const colors = mode === 'dark' ? darkPalette : lightPalette;

    return (
        <ThemeContext.Provider value={{ mode, colors, isDark: mode === 'dark', toggleMode, setMode, isLoading }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
