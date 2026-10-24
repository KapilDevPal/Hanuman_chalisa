import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, StackNavigationOptions, TransitionPresets } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { HomeScreen } from '../screens/HomeScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { ChalisaScreen } from '../screens/ChalisaScreen';
import { ChalisaLanguageScreen } from '../screens/ChalisaLanguageScreen';
import { JaapScreen } from '../screens/JaapScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { SankalpScreen } from '../screens/SankalpScreen';
import { WisdomScreen } from '../screens/WisdomScreen';
import { PrayerGuideScreen } from '../screens/PrayerGuideScreen';
import { LibraryScreen } from '../screens/LibraryScreen';
import { ReaderScreen } from '../screens/ReaderScreen';
import { AudioScreen } from '../screens/AudioScreen';
import { MoreScreen } from '../screens/MoreScreen';
import { WebViewScreen } from '../screens/WebViewScreen';
import { NotesScreen } from '../screens/NotesScreen';
import { NoteEditorScreen } from '../screens/NoteEditorScreen';
import { NoteDetailScreen } from '../screens/NoteDetailScreen';
import { HelpScreen } from '../screens/HelpScreen';
import { PrivacyPolicyScreen } from '../screens/PrivacyPolicyScreen';
import { useTheme } from '../context/ThemeContext';
import { useT } from '../hooks/useT';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const MoreStackNav = createStackNavigator();
const ChalisaStackNav = createStackNavigator();

/** Flat header that blends into the page background. */
const useStackOptions = (): StackNavigationOptions => {
    const { colors } = useTheme();
    return {
        headerStyle: { backgroundColor: colors.background },
        headerShadowVisible: false,
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: '700', fontSize: 18 },
        cardStyle: { backgroundColor: colors.background },
    };
};

const HomeStack = () => {
    const { T } = useT();
    const { colors } = useTheme();
    const screenOptions = useStackOptions();
    return (
        <Stack.Navigator id="HomeStack" screenOptions={screenOptions}>
            <Stack.Screen name="HomeMain" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: T('settings_title') }} />
            <Stack.Screen name="Sankalp" component={SankalpScreen} options={{ title: T('header_sankalp') }} />
            <Stack.Screen name="Wisdom" component={WisdomScreen} options={{ title: T('header_wisdom') }} />
            <Stack.Screen name="PrayerGuide" component={PrayerGuideScreen} options={{ title: T('header_prayer') }} />
            <Stack.Screen name="Library" component={LibraryScreen} options={{ title: T('header_library') }} />
            <Stack.Screen name="Reader" component={ReaderScreen} options={({ route }: any) => ({ title: route.params?.title || T('header_library') })} />
            <Stack.Screen
                name="Audio"
                component={AudioScreen}
                options={{
                    title: '',
                    headerTransparent: true,
                    headerLeft: (props) => (
                        <TouchableOpacity
                            onPress={props.onPress}
                            accessibilityLabel="Close player"
                            style={{
                                marginLeft: 16, width: 40, height: 40, borderRadius: 20,
                                backgroundColor: colors.surfaceAlt, alignItems: 'center', justifyContent: 'center',
                            }}
                        >
                            <Ionicons name="chevron-down" size={22} color={colors.text} />
                        </TouchableOpacity>
                    ),
                }}
            />
        </Stack.Navigator>
    );
};

const ChalisaStack = () => {
    const { T } = useT();
    const { colors } = useTheme();
    const screenOptions = useStackOptions();
    return (
        <ChalisaStackNav.Navigator id="ChalisaStack" screenOptions={screenOptions}>
            <ChalisaStackNav.Screen name="ChalisaMain" component={ChalisaScreen} options={{ headerShown: false }} />
            <ChalisaStackNav.Screen
                name="ChalisaLanguage"
                component={ChalisaLanguageScreen}
                options={({ navigation }) => ({
                    ...TransitionPresets.ModalSlideFromBottomIOS,
                    title: T('chalisa_language'),
                    headerTitleAlign: 'center',
                    headerLeft: () => null,
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={10} style={{ marginRight: 16 }}>
                            <Text style={{ fontSize: 17, fontWeight: '600', color: colors.primary }}>{T('common_done')}</Text>
                        </TouchableOpacity>
                    ),
                })}
            />
        </ChalisaStackNav.Navigator>
    );
};

const MoreStack = () => {
    const { T } = useT();
    const screenOptions = useStackOptions();
    return (
        <MoreStackNav.Navigator id="MoreStack" screenOptions={screenOptions}>
            <MoreStackNav.Screen name="MoreMain" component={MoreScreen} options={{ headerShown: false }} />
            <MoreStackNav.Screen name="WebView" component={WebViewScreen} options={{ headerShown: false }} />
            <MoreStackNav.Screen name="MoreSettings" component={SettingsScreen} options={{ title: T('settings_title') }} />
            <MoreStackNav.Screen name="Help" component={HelpScreen} options={{ title: T('more_help') }} />
            <MoreStackNav.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} options={{ title: T('more_privacy') }} />
            <MoreStackNav.Screen name="Notes" component={NotesScreen} options={{ title: T('more_notes') }} />
            <MoreStackNav.Screen name="NoteDetail" component={NoteDetailScreen} />
            <MoreStackNav.Screen
                name="NoteEditor"
                component={NoteEditorScreen}
                options={({ route }: any) => ({ title: route.params?.noteId ? T('notes_edit_title') : T('notes_new_title') })}
            />
        </MoreStackNav.Navigator>
    );
};

type IconName = React.ComponentProps<typeof Ionicons>['name'];
const TAB_ICONS: Record<string, [IconName, IconName]> = {
    Home: ['home', 'home-outline'],
    Chalisa: ['book', 'book-outline'],
    Dashboard: ['stats-chart', 'stats-chart-outline'],
    More: ['grid', 'grid-outline'],
};

const AppNavigator = () => {
    const { T } = useT();
    const { colors, isDark } = useTheme();
    const base = isDark ? DarkTheme : DefaultTheme;
    const navTheme = {
        ...base,
        colors: {
            ...base.colors,
            primary: colors.primary,
            background: colors.background,
            card: colors.surface,
            text: colors.text,
            border: colors.border,
        },
    };

    return (
        <NavigationContainer theme={navTheme}>
            <Tab.Navigator
                id="MainTabs"
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        const color = focused ? colors.primary : colors.textMuted;
                        const icon = route.name === 'Jaap'
                            ? <MaterialCommunityIcons name="meditation" size={24} color={color} />
                            : <Ionicons name={TAB_ICONS[route.name][focused ? 0 : 1]} size={22} color={color} />;
                        return (
                            <View style={{
                                width: 56, height: 30, borderRadius: 15,
                                backgroundColor: focused ? colors.primarySoft : 'transparent',
                                alignItems: 'center', justifyContent: 'center',
                            }}>
                                {icon}
                            </View>
                        );
                    },
                    tabBarActiveTintColor: colors.primary,
                    tabBarInactiveTintColor: colors.textMuted,
                    tabBarHideOnKeyboard: true,
                    tabBarStyle: {
                        backgroundColor: colors.surface,
                        borderTopWidth: 1,
                        borderTopColor: colors.border,
                        elevation: 0,
                        shadowOpacity: 0,
                        paddingTop: 6,
                    },
                    tabBarLabelStyle: { fontSize: 12, fontWeight: '600', marginTop: 2 },
                })}
            >
                <Tab.Screen name="Home" component={HomeStack} options={{ tabBarLabel: T('nav_home') }} />
                <Tab.Screen name="Chalisa" component={ChalisaStack} options={{ tabBarLabel: T('nav_chalisa') }} />
                <Tab.Screen name="Jaap" component={JaapScreen} options={{ tabBarLabel: T('nav_jaap') }} />
                <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ tabBarLabel: T('nav_stats') }} />
                <Tab.Screen name="More" component={MoreStack} options={{ tabBarLabel: T('nav_more') }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
