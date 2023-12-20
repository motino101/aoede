import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FormPage from './src/pages/FormPage';
import ChatPage from './src/pages/ChatPage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts } from 'expo-font'


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  // const [fontsLoaded, setFontsLoaded] = useState(false);
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
      <Tab.Navigator initialRouteName="Form" screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen name="FormPage" component={FormPage} />
        <Tab.Screen name="ChatPage" component={ChatPage} />
      </Tab.Navigator>
    </NavigationContainer>
    
  )
}