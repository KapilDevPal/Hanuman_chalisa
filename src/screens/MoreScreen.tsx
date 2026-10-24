import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useT } from '../hooks/useT';
import { Screen, PageTitle, Surface, SectionLabel, ListRow, IconTile } from '../components/ui';

export const MoreScreen = () => {
    const navigation = useNavigation<any>();
    const { colors } = useTheme();
    const { T } = useT();

    return (
        <Screen safeTop>
            <PageTitle title={T('more_title')} subtitle={T('more_subtitle')} />

            <SectionLabel>{T('more_explore_section')}</SectionLabel>
            <Surface padded={false} style={{ marginBottom: 24 }}>
                <ListRow
                    icon={<IconTile><Ionicons name="globe-outline" size={20} color={colors.primary} /></IconTile>}
                    title={T('more_mandirpedia')}
                    subtitle={T('more_mandirpedia_sub')}
                    onPress={() => navigation.navigate('WebView', {
                        url: 'https://mandirpedia.com/',
                        title: T('more_mandirpedia'),
                        subtitle: T('more_mandirpedia_sub'),
                    })}
                />
                <ListRow
                    icon={<IconTile><Ionicons name="sparkles-outline" size={20} color={colors.primary} /></IconTile>}
                    title={T('more_rashifal')}
                    subtitle={T('more_rashifal_sub')}
                    onPress={() => navigation.navigate('WebView', {
                        url: 'https://mandirpedia.com/panchang',
                        title: T('more_rashifal'),
                        subtitle: T('more_rashifal_sub'),
                    })}
                    last
                />
            </Surface>

            <SectionLabel>{T('more_personal_section')}</SectionLabel>
            <Surface padded={false}>
                <ListRow
                    icon={<IconTile><MaterialCommunityIcons name="notebook-outline" size={20} color={colors.primary} /></IconTile>}
                    title={T('more_notes')}
                    subtitle={T('more_notes_sub')}
                    onPress={() => navigation.navigate('Notes')}
                />
                <ListRow
                    icon={<IconTile><Ionicons name="help-buoy-outline" size={20} color={colors.primary} /></IconTile>}
                    title={T('more_help')}
                    subtitle={T('more_help_sub')}
                    onPress={() => navigation.navigate('Help')}
                />
                <ListRow
                    icon={<IconTile><Ionicons name="shield-checkmark-outline" size={20} color={colors.primary} /></IconTile>}
                    title={T('more_privacy')}
                    subtitle={T('more_privacy_sub')}
                    onPress={() => navigation.navigate('PrivacyPolicy')}
                />
                <ListRow
                    icon={<IconTile><Ionicons name="settings-outline" size={20} color={colors.primary} /></IconTile>}
                    title={T('settings_title')}
                    subtitle={T('settings_subtitle')}
                    onPress={() => navigation.navigate('MoreSettings')}
                    last
                />
            </Surface>
        </Screen>
    );
};
