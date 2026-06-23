import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

import { HomeScreen } from '../screens/HomeScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { ChalisaScreen } from '../screens/ChalisaScreen';
import { JaapScreen } from '../screens/JaapScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { SankalpScreen } from '../screens/SankalpScreen';
import { WisdomScreen } from '../screens/WisdomScreen';
import { PrayerGuideScreen } from '../screens/PrayerGuideScreen';
import { LibraryScreen } from '../screens/LibraryScreen';
import { ReaderScreen } from '../screens/ReaderScreen';
import { AudioScreen } from '../screens/AudioScreen';
import { Colors } from '../constants/Colors';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
    <Stack.Navigator
        id="HomeStack"
        screenOptions={{
            headerStyle: {
                backgroundColor: Colors.primary,
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
            },
            headerTintColor: Colors.white,
            headerTitleStyle: {
                fontWeight: '900',
                fontSize: 20,
                letterSpacing: 0.5,
            },
            headerTitleAlign: 'center',
            cardStyle: { backgroundColor: Colors.background },
        }}
    >
        <Stack.Screen name="HomeMain" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
                title: 'App Settings',
                headerStyle: { backgroundColor: Colors.background },
                headerTintColor: Colors.text,
                headerTitleStyle: { color: Colors.text, fontWeight: '900' },
            }}
        />
        <Stack.Screen name="Sankalp" component={SankalpScreen} options={{ title: 'Sankalp' }} />
        <Stack.Screen name="Wisdom" component={WisdomScreen} options={{ title: 'Daily Wisdom' }} />
        <Stack.Screen name="PrayerGuide" component={PrayerGuideScreen} options={{ title: 'Prayer Guide' }} />
        <Stack.Screen name="Library" component={LibraryScreen} options={{ title: 'Spiritual Library' }} />
        <Stack.Screen name="Reader" component={ReaderScreen} options={({ route }: any) => ({ title: route.params?.title || 'Read' })} />
        <Stack.Screen
            name="Audio"
            component={AudioScreen}
            options={{
                headerShown: true,
                title: '',
                headerTransparent: true,
                headerTintColor: '#FFF',
                headerLeft: (props) => (
                    <TouchableOpacity
                        onPress={props.onPress}
                        className="ml-4 bg-black/20 p-2 rounded-full"
                    >
                        <Ionicons name="chevron-down" size={28} color="white" />
                    </TouchableOpacity>
                )
            }}
        />
    </Stack.Navigator>
);

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                id="MainTabs"
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let icon;
                        const iconColor = focused ? Colors.primary : Colors.lightText;
                        const iconSize = focused ? size + 1 : size;

                        if (route.name === 'Home') {
                            icon = <Ionicons name={focused ? 'home' : 'home-outline'} size={iconSize} color={iconColor} />;
                        } else if (route.name === 'Chalisa') {
                            icon = <FontAwesome5 name="book-open" size={iconSize - 4} color={iconColor} />;
                        } else if (route.name === 'Jaap') {
                            icon = <MaterialCommunityIcons name="meditation" size={iconSize} color={iconColor} />;
                        } else if (route.name === 'Dashboard') {
                            icon = <Ionicons name={focused ? 'stats-chart' : 'stats-chart-outline'} size={iconSize} color={iconColor} />;
                        }

                        return (
                            <View style={{
                                width: 52,
                                height: 30,
                                backgroundColor: focused ? 'rgba(255, 153, 51, 0.12)' : 'transparent',
                                borderRadius: 15,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                {icon}
                            </View>
                        );
                    },
                    tabBarActiveTintColor: Colors.primary,
                    tabBarInactiveTintColor: Colors.lightText,
                    tabBarHideOnKeyboard: true,
                    tabBarStyle: {
                        position: 'absolute',
                        bottom: 16,
                        left: 16,
                        right: 16,
                        elevation: 8,
                        backgroundColor: Colors.white,
                        borderRadius: 24,
                        height: 80,
                        borderTopWidth: 0,
                        paddingBottom: 10,
                        paddingTop: 10,
                        shadowColor: '#000',
                        shadowOpacity: 0.08,
                        shadowOffset: { width: 0, height: 4 },
                        shadowRadius: 12,
                    },
                    tabBarLabelStyle: {
                        fontSize: 11,
                        fontWeight: '700',
                        letterSpacing: 0.2,
                    },
                    headerStyle: { backgroundColor: Colors.primary },
                    headerTintColor: Colors.white,
                    headerTitleStyle: { fontWeight: 'bold' }
                })}
            >
                <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
                <Tab.Screen name="Chalisa" component={ChalisaScreen} options={{ title: 'Chalisa' }} />
                <Tab.Screen name="Jaap" component={JaapScreen} options={{ title: 'Jaap' }} />
                <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Stats' }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;

