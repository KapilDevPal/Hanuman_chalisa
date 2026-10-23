/**
 * Minimal design-system primitives. Every screen builds on these so spacing,
 * radii, type scale and colours stay consistent in light and dark mode.
 */
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, ViewStyle, TextStyle, StyleProp, ScrollViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export const RADIUS = 16;
export const GUTTER = 20;

/** Scrollable page with theme background. `safeTop` pads for screens without a nav header. */
export const Screen: React.FC<ScrollViewProps & { safeTop?: boolean; children: React.ReactNode }> = ({
    safeTop, children, contentContainerStyle, ...rest
}) => {
    const { colors } = useTheme();
    const insets = useSafeAreaInsets();
    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: colors.background }}
            contentContainerStyle={[
                { paddingHorizontal: GUTTER, paddingTop: safeTop ? insets.top + 16 : 16, paddingBottom: 40 },
                contentContainerStyle,
            ]}
            showsVerticalScrollIndicator={false}
            {...rest}
        >
            {children}
        </ScrollView>
    );
};

/** Large page title with optional subtitle and right-side actions. */
export const PageTitle: React.FC<{ title: string; subtitle?: string; right?: React.ReactNode; style?: StyleProp<ViewStyle> }> = ({
    title, subtitle, right, style,
}) => {
    const { colors } = useTheme();
    return (
        <View style={[{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }, style]}>
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 28, fontWeight: '800', color: colors.text, letterSpacing: -0.5 }}>{title}</Text>
                {!!subtitle && (
                    <Text style={{ fontSize: 14, color: colors.textMuted, marginTop: 4 }}>{subtitle}</Text>
                )}
            </View>
            {right && <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>{right}</View>}
        </View>
    );
};

/** Small uppercase heading above a group of content. */
export const SectionLabel: React.FC<{ children: string; right?: React.ReactNode; style?: StyleProp<ViewStyle> }> = ({ children, right, style }) => {
    const { colors } = useTheme();
    return (
        <View style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, marginTop: 8 }, style]}>
            <Text style={{ fontSize: 12, fontWeight: '700', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.8 }}>
                {children}
            </Text>
            {right}
        </View>
    );
};

/** Flat card with a hairline border. */
export const Surface: React.FC<{ children: React.ReactNode; style?: StyleProp<ViewStyle>; padded?: boolean }> = ({
    children, style, padded = true,
}) => {
    const { colors } = useTheme();
    return (
        <View
            style={[
                {
                    backgroundColor: colors.surface,
                    borderRadius: RADIUS,
                    borderWidth: 1,
                    borderColor: colors.border,
                    padding: padded ? 16 : 0,
                    overflow: 'hidden',
                },
                style,
            ]}
        >
            {children}
        </View>
    );
};

/** Rounded square holding an icon on a soft primary tint. */
export const IconTile: React.FC<{ children: React.ReactNode; size?: number }> = ({ children, size = 40 }) => {
    const { colors } = useTheme();
    return (
        <View
            style={{
                width: size, height: size, borderRadius: size * 0.3,
                backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center',
            }}
        >
            {children}
        </View>
    );
};

interface ListRowProps {
    icon?: React.ReactNode;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    right?: React.ReactNode;
    /** Hide the divider (use for the last row in a group) */
    last?: boolean;
    chevron?: boolean;
}

/** Row inside a Surface group (padded={false}). */
export const ListRow: React.FC<ListRowProps> = ({ icon, title, subtitle, onPress, right, last, chevron = !!onPress }) => {
    const { colors } = useTheme();
    const content = (
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, minHeight: 60 }}>
            {icon && <View style={{ marginRight: 14 }}>{icon}</View>}
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: colors.text }} numberOfLines={1}>{title}</Text>
                {!!subtitle && (
                    <Text style={{ fontSize: 13, color: colors.textMuted, marginTop: 2 }} numberOfLines={2}>{subtitle}</Text>
                )}
            </View>
            {right}
            {chevron && <Ionicons name="chevron-forward" size={18} color={colors.textMuted} style={{ marginLeft: 8 }} />}
            {!last && (
                <View style={{ position: 'absolute', bottom: 0, right: 0, left: icon ? 70 : 16, height: 1, backgroundColor: colors.border }} />
            )}
        </View>
    );
    return onPress ? (
        <TouchableOpacity onPress={onPress} activeOpacity={0.6}>{content}</TouchableOpacity>
    ) : content;
};

/** 40px circular icon button. */
export const IconButton: React.FC<{ icon: React.ComponentProps<typeof Ionicons>['name']; onPress: () => void; accessibilityLabel?: string }> = ({
    icon, onPress, accessibilityLabel,
}) => {
    const { colors } = useTheme();
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.6}
            accessibilityLabel={accessibilityLabel}
            style={{
                width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surfaceAlt,
                alignItems: 'center', justifyContent: 'center',
            }}
        >
            <Ionicons name={icon} size={20} color={colors.text} />
        </TouchableOpacity>
    );
};

/** Short uppercase language initials, e.g. "EN", shown instead of flags. */
export const LangBadge: React.FC<{ code: string; active?: boolean; size?: number }> = ({ code, active, size = 40 }) => {
    const { colors } = useTheme();
    return (
        <View
            style={{
                width: size, height: size, borderRadius: size / 2,
                backgroundColor: active ? colors.primary : colors.surfaceAlt,
                alignItems: 'center', justifyContent: 'center',
            }}
        >
            <Text style={{ fontSize: size * 0.32, fontWeight: '800', letterSpacing: 0.5, color: active ? colors.onPrimary : colors.text }}>
                {code.toUpperCase()}
            </Text>
        </View>
    );
};

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

export const Button: React.FC<{
    title: string;
    onPress: () => void;
    variant?: ButtonVariant;
    icon?: React.ComponentProps<typeof Ionicons>['name'];
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
}> = ({ title, onPress, variant = 'primary', icon, disabled, style }) => {
    const { colors } = useTheme();
    const bg = variant === 'primary' ? colors.primary : variant === 'secondary' ? colors.surfaceAlt : 'transparent';
    const fg = variant === 'primary' ? colors.onPrimary : variant === 'danger' ? colors.danger : variant === 'ghost' ? colors.primary : colors.text;
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.75}
            style={[
                {
                    backgroundColor: bg, borderRadius: 14, minHeight: 50, paddingHorizontal: 20,
                    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', opacity: disabled ? 0.5 : 1,
                },
                style,
            ]}
        >
            {icon && <Ionicons name={icon} size={18} color={fg} style={{ marginRight: 8 }} />}
            <Text style={{ color: fg, fontSize: 16, fontWeight: '700' }}>{title}</Text>
        </TouchableOpacity>
    );
};

/** Pill toggle, e.g. goal or filter selection. */
export const Chip: React.FC<{ label: string; active?: boolean; onPress: () => void; style?: StyleProp<ViewStyle>; textStyle?: StyleProp<TextStyle> }> = ({
    label, active, onPress, style, textStyle,
}) => {
    const { colors } = useTheme();
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            style={[
                {
                    paddingHorizontal: 16, minHeight: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center',
                    backgroundColor: active ? colors.primary : colors.surfaceAlt,
                },
                style,
            ]}
        >
            <Text style={[{ fontSize: 14, fontWeight: '700', color: active ? colors.onPrimary : colors.text }, textStyle]}>{label}</Text>
        </TouchableOpacity>
    );
};
