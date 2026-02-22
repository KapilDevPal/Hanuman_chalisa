import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Text } from 'react-native';

import { HomeScreen } from '../screens/HomeScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { ChalisaScreen } from '../screens/ChalisaScreen';
import { JaapScreen } from '../screens/JaapScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { SankalpScreen } from '../screens/SankalpScreen';
import { WisdomScreen } from '../screens/WisdomScreen';
import { PrayerGuideScreen } from '../screens/PrayerGuideScreen';
import { Colors } from '../constants/Colors';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
    <Stack.Navigator
        screenOptions={{
            headerStyle: { backgroundColor: Colors.primary },
            headerTintColor: Colors.white,
            headerTitleStyle: { fontWeight: 'bold' },
            cardStyle: { backgroundColor: Colors.background },
        }}
    >
        <Stack.Screen name="HomeMain" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Sankalp" component={SankalpScreen} options={{ title: 'Sankalp Discipline' }} />
        <Stack.Screen name="Wisdom" component={WisdomScreen} options={{ title: 'Daily Wisdom' }} />
        <Stack.Screen name="PrayerGuide" component={PrayerGuideScreen} options={{ title: 'Way to Pray' }} />
    </Stack.Navigator>
);

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name === 'Home') iconName = '🏠';
                        else if (route.name === 'Chalisa') iconName = '📖';
                        else if (route.name === 'Jaap') iconName = '📿';
                        else if (route.name === 'Dashboard') iconName = '📊';

                        return <Text style={{ fontSize: size }}>{iconName}</Text>;
                    },
                    tabBarActiveTintColor: Colors.primary,
                    tabBarInactiveTintColor: Colors.lightText,
                    tabBarStyle: { backgroundColor: Colors.cardBg, borderTopColor: Colors.border },
                    headerStyle: { backgroundColor: Colors.primary },
                    headerTintColor: Colors.white,
                })}
            >
                <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
                <Tab.Screen name="Chalisa" component={ChalisaScreen} options={{ title: 'Read Chalisa' }} />
                <Tab.Screen name="Jaap" component={JaapScreen} options={{ title: 'Jaap Counter' }} />
                <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Spiritual Progress' }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
