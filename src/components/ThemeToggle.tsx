import React from 'react';
import { Switch } from 'react-native';
import { useTheme } from '../context/ThemeContext';

/** Dark-mode switch used in Settings. */
export const ThemeToggle: React.FC = () => {
    const { isDark, toggleMode, colors } = useTheme();
    return (
        <Switch
            value={isDark}
            onValueChange={toggleMode}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor="#FFFFFF"
        />
    );
};
