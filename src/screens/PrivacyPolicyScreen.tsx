import React from 'react';
import { Text } from 'react-native';
import { Screen, SectionLabel, Surface } from '../components/ui';
import { useTheme } from '../context/ThemeContext';

const sections = [
    {
        title: 'Data collection',
        body: 'Hanuman Chalisa does not require an account and the developer does not collect your personal data. The app shows ads provided by Google AdMob, which may collect device identifiers, IP address and ad interaction data to serve and measure ads. See policies.google.com/technologies/partner-sites for details.',
    },
    {
        title: 'Advertising',
        body: 'Hanuman Chalisa displays native ads served by Google AdMob. Ads are clearly labelled “Ad”. AdMob may use device identifiers or cookies to show and measure ads. You can limit ad personalisation in your device settings (Settings > Privacy > Apple Advertising on iOS, or Settings > Google > Ads on Android).',
    },
    {
        title: 'Information stored on your device',
        body: 'Your notes, selected photos, jaap counts, sankalp progress, preferences, and reading progress are stored only on your device. They are not uploaded by the app. Removing the app may remove this information.',
    },
    {
        title: 'Photos and notifications',
        body: 'Photo-library access is requested only when you choose to attach a photo to a private note. Notification permission is requested only if you enable a local reminder. You can change either permission in iOS Settings.',
    },
    {
        title: 'External content',
        body: 'The Explore section can display pages from mandirpedia.com. Those pages require an internet connection and may process technical request information or use cookies under the website’s own privacy practices. Do not enter personal information there unless you accept those practices.',
    },
    {
        title: 'Your choices',
        body: 'You can delete notes and photos inside the app, disable notifications in iOS Settings, or delete all locally stored app data by removing the app. For privacy questions or deletion requests concerning any online service, use the support contact shown on the App Store product page.',
    },
];

export const PrivacyPolicyScreen = () => {
    const { colors } = useTheme();

    return (
        <Screen contentContainerStyle={{ gap: 14 }}>
            <Text style={{ color: colors.textMuted, fontSize: 13 }}>Last updated: 24 October 2026</Text>
            {sections.map((section) => (
                <React.Fragment key={section.title}>
                    <SectionLabel style={{ marginBottom: -4 }}>{section.title}</SectionLabel>
                    <Surface>
                        <Text style={{ color: colors.text, fontSize: 15, lineHeight: 23 }}>{section.body}</Text>
                    </Surface>
                </React.Fragment>
            ))}
        </Screen>
    );
};
