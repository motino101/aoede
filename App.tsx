import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FormPage from './src/pages/FormPage';
import ChatPage from './src/pages/ChatPage';
import ConversationsPage from './src/pages/ConversationsPage';
import ProfilePage from './src/pages/ProfilePage';
import MessagesPage from './src/pages/MessagesPage';
import LoginPage from './src/pages/LoginPage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts } from 'expo-font'
import { Ionicons } from '@expo/vector-icons';
import { LoginPages } from './src/pages/LoginPages';
import { Theme } from 'tamagui';
import theme from './src/styles/theme';
import {RegisterEmailPage, RegisterNamePage, RegisterPasswordPage} from './src/pages/RegisterPages';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const AuthStack = createStackNavigator();

export default function App() {
  // AUTHENTICATE APP
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  }

  // LOAD FONTS
  const [loaded] = useFonts({
    Inter: require("./assets/fonts/Poppins/Poppins-Medium.ttf"),
    InterBold: require("./assets/fonts/Poppins/Poppins-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }
  console.log('Fonts loaded!');


  return (
    <NavigationContainer>
      {
        isAuthenticated ? (
          <TabNav />
        ) : (

          <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="Form" screenOptions={{
              headerShown: false,
            }}>
              <Stack.Screen name="LoginPage" component={LoginPage} />
              <Stack.Screen name="RegisterNamePage" component={RegisterNamePage} />
              <Stack.Screen name="RegisterEmailPage" component={RegisterEmailPage} />
              <Stack.Screen name="RegisterPasswordPage" component={RegisterPasswordPage} />
              <Stack.Screen name="LoginPages" component={LoginPages} />
            </Stack.Navigator>
          </NavigationContainer>
        )
      }
    </NavigationContainer>
  );

}

function TabNav() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Form"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarLabel: () => null,
          tabBarStyle: {
            backgroundColor: theme.colors.black, // Transparent background
            // position: 'absolute', // Needed to show the content behind the tab bar
            // borderTopWidth: 3, // Remove top border if desired
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'ChatStack') {
              iconName = focused
                ? 'ios-home'
                : 'ios-home-outline';
            } else if (route.name === 'ConversationsPage') {
              iconName = focused ? 'ios-chatbubbles' : 'ios-chatbubbles-outline';
            } else if (route.name === 'MessagesPage') {
              iconName = focused ? 'heart' : 'heart-outline';
            } else if (route.name === 'ProfilePage') {
              iconName = focused ? 'ios-person' : 'ios-person-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: theme.colors.input,
          tabBarInactiveTintColor: theme.colors.input,
        })}
      >
        <Tab.Screen name="ChatStack" component={ChatStack} />
        <Tab.Screen name="ConversationsPage" component={ConversationsPage} />
        <Tab.Screen name="MessagesPage" component={MessagesPage} />
        <Tab.Screen name="ProfilePage" component={ProfilePage} />
      </Tab.Navigator>
    </NavigationContainer>

  )
}

function ChatStack() {
  return (

    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Form" screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name="FormPage" component={FormPage} />
        <Stack.Screen name="ChatPage" component={ChatPage} />
      </Stack.Navigator>
    </NavigationContainer>

  )
}