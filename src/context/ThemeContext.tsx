import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeMode = 'light' | 'dark';

export interface ThemePalette {
    background: string;
    card: string;
    text: string;
    lightText: string;
    border: string;
    headerGradient: [string, string, string];
    statusBar: 'light' | 'dark';
}

const lightPalette: ThemePalette = {
    background: '#FAF7F0',
    card: '#FFFFFF',
    text: '#3A2D1B',
    lightText: '#A6947D',
    border: '#EADEC9',
    headerGradient: ['#FF7700', '#FF9933', '#FFB347'],
    statusBar: 'light',
};

const darkPalette: ThemePalette = {
    background: '#171310',
    card: '#241E17',
    text: '#F5EEE1',
    lightText: '#B8A88F',
    border: '#3A2F22',
    headerGradient: ['#7A3B00', '#B85C00', '#FF9933'],
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
