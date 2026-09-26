import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
    size?: number;
    variant?: 'header' | 'panel';
}

/** Compact sun/moon icon button that toggles light/dark mode. */
export const ThemeToggle: React.FC<ThemeToggleProps> = ({ size = 22, variant = 'header' }) => {
    const { isDark, toggleMode } = useTheme();

    const headerStyle = {
        backgroundColor: 'rgba(255,255,255,0.18)',
        borderRadius: 16,
        padding: 10,
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.3)',
    };

    const panelStyle = {
        backgroundColor: isDark ? '#3A2F22' : '#FAF7F0',
        borderRadius: 16,
        padding: 10,
        borderWidth: 1,
        borderColor: isDark ? '#4A3D2A' : '#EADEC9',
    };

    return (
        <TouchableOpacity
            onPress={toggleMode}
            activeOpacity={0.7}
            style={variant === 'header' ? headerStyle : panelStyle}
        >
            <Ionicons
                name={isDark ? 'moon' : 'sunny'}
                size={size}
                color={variant === 'header' ? '#fff' : (isDark ? '#F5EEE1' : '#FF9933')}
            />
        </TouchableOpacity>
    );
};
