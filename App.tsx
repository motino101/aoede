import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FormPage from './src/pages/FormPage';
import ChatPage from './src/pages/ChatPage';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import loadFonts from './src/utils/loadfonts'; // Adjust the path as necessary



const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    console.log('Fonts not loaded yet');
  }
  console.log('Fonts loaded!');
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Form" screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="FormPage" component={FormPage} />
        <Stack.Screen name="ChatPage" component={ChatPage} />
      </Stack.Navigator>
    </NavigationContainer>
  </ApplicationProvider>
    
  )
}