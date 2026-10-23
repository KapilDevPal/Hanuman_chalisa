import React from 'react';
import { View, Text, TextInput } from 'react-native';
import Constants from 'expo-constants';
import * as Application from 'expo-application';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import { useT } from '../hooks/useT';
import { useInAppReview } from '../hooks/useInAppReview';
import { useInAppUpdates } from '../hooks/useInAppUpdates';
import { ThemeToggle } from '../components/ThemeToggle';
import { APP_LANGUAGES } from '../components/LanguageSwitcher';
import { Screen, Surface, SectionLabel, ListRow, IconTile, LangBadge } from '../components/ui';

export const SettingsScreen = () => {
    const { language, setLanguage } = useLanguage();
    const { colors, isDark } = useTheme();
    const { jaapName, setJaapName } = useUser();
    const { T } = useT();
    const { openStoreListing } = useInAppReview();
    const { isSupported: updatesSupported, checkForUpdates } = useInAppUpdates();
    // Native values first: EAS manages the build number remotely, so app.json can be stale
    const appVersion = Application.nativeApplicationVersion ?? Constants.expoConfig?.version ?? '—';
    const buildNumber = Application.nativeBuildVersion ?? Constants.expoConfig?.android?.versionCode ?? '—';

    return (
        <Screen>
            {/* Personalization */}
            <SectionLabel>{T('settings_personal')}</SectionLabel>
            <Surface style={{ marginBottom: 24 }}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: colors.text }}>{T('settings_chant_name')}</Text>
                <Text style={{ fontSize: 13, color: colors.textMuted, marginTop: 2, marginBottom: 12 }}>{T('settings_chant_hint')}</Text>
                <TextInput
                    style={{
                        backgroundColor: colors.surfaceAlt, borderRadius: 12, paddingHorizontal: 14, height: 48,
                        fontSize: 16, fontWeight: '600', color: colors.text,
                    }}
                    value={jaapName}
                    onChangeText={setJaapName}
                    maxLength={15}
                    placeholder={T('settings_chant_ph')}
                    placeholderTextColor={colors.textMuted}
                />
            </Surface>

            {/* Appearance */}
            <SectionLabel>{T('settings_appearance')}</SectionLabel>
            <Surface padded={false} style={{ marginBottom: 24 }}>
                <ListRow
                    icon={<IconTile><Ionicons name={isDark ? 'moon' : 'sunny-outline'} size={20} color={colors.primary} /></IconTile>}
                    title={T('settings_dark_mode')}
                    subtitle={T('settings_appearance_hint')}
                    right={<ThemeToggle />}
                    last
                />
            </Surface>

            {/* App language */}
            <SectionLabel>{T('settings_language')}</SectionLabel>
            <Text style={{ fontSize: 13, color: colors.textMuted, marginTop: -4, marginBottom: 10 }}>{T('settings_language_hint')}</Text>
            <Surface padded={false} style={{ marginBottom: 24 }}>
                {APP_LANGUAGES.map((lang, index) => {
                    const isActive = language === lang.code;
                    return (
                        <ListRow
                            key={lang.code}
                            icon={<LangBadge code={lang.code} active={isActive} />}
                            title={lang.label}
                            subtitle={lang.name}
                            onPress={() => setLanguage(lang.code)}
                            chevron={false}
                            right={isActive ? <Ionicons name="checkmark-circle" size={22} color={colors.primary} /> : undefined}
                            last={index === APP_LANGUAGES.length - 1}
                        />
                    );
                })}
            </Surface>

            {/* About */}
            <SectionLabel>{T('settings_about')}</SectionLabel>
            <Surface padded={false}>
                {updatesSupported && (
                    <ListRow
                        icon={<IconTile><Ionicons name="cloud-download-outline" size={20} color={colors.primary} /></IconTile>}
                        title={T('update_check')}
                        subtitle={T('update_check_sub')}
                        onPress={checkForUpdates}
                    />
                )}
                <ListRow
                    icon={<IconTile><Ionicons name="star-outline" size={20} color={colors.primary} /></IconTile>}
                    title={T('settings_rate')}
                    subtitle={T('settings_rate_sub')}
                    onPress={openStoreListing}
                />
                <ListRow title={T('settings_version')} right={<Text style={{ color: colors.textMuted, fontSize: 15 }}>{appVersion}</Text>} />
                <ListRow title={T('settings_build')} right={<Text style={{ color: colors.textMuted, fontSize: 15 }}>{buildNumber}</Text>} last />
            </Surface>

            <View style={{ alignItems: 'center', marginTop: 28 }}>
                <Text style={{ fontSize: 16, fontWeight: '700', color: colors.primary }}>{T('settings_bless')}</Text>
                <Text style={{ fontSize: 13, color: colors.textMuted, marginTop: 4 }}>{T('settings_devotion')}</Text>
            </View>
        </Screen>
    );
};
