import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FormPage from './src/pages/FormPage';
import ChatPage from './src/pages/ChatPage';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
// import loadFonts from './src/utils/loadfonts';
import { useFonts } from 'expo-font'


const Stack = createStackNavigator();

export default function App() {
  // const [fontsLoaded, setFontsLoaded] = useState(false);
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  if (!loaded) {
    return null;
  }

  console.log('Fonts loaded!');
  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Form" screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="FormPage" component={FormPage} />
        <Stack.Screen name="ChatPage" component={ChatPage} />
      </Stack.Navigator>
    </NavigationContainer>
    
  )
}