import { StyleSheet, TouchableOpacity, View, Image, SafeAreaView, ViewStyle, Animated, Easing } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { languages, levels, scenarios } from '../constants/settings';
import { TamaguiProvider, Input, Label, H6, H5, H4, H3, H2, H1, Button, TextArea, XStack, YStack } from 'tamagui'
import config from '../../tamagui.config'
import { SelectItem } from '../components/selectItem';
import { createStackNavigator } from '@react-navigation/stack';
import Theme from '../styles/theme';
import images from '../../assets/images';
import { initializeApp } from "firebase/app";
import { Auth } from 'firebase/auth';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import theme from '../styles/theme';

const LoginPages = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Handle login logic here
    }

    return (
        <TamaguiProvider config={config}>
            <LinearGradient
                colors={['#F7ADDF', '#BED7FC',]}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ flex: 1 }}
            >
                <SafeAreaView style={styles.container}>
                    <YStack style={{gap: theme.spacing.GapVL, justifyContent: 'space-between', flex: 1}}>
                        <YStack style = {{gap: theme.spacing.GapVXL}}>
                        <XStack style = {{justifyContent: 'space-between'}}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Ionicons name="chevron-back" size={24} color="black" />
                            </TouchableOpacity>
                            {/* <H5>Login</H5> */}
                        </XStack>
                        {/* Email container */}
                        <YStack style={{gap: theme.spacing.GapVS}}>
                            <H4>Email</H4>
                            <Input id="email" placeholder="Enter Email" value={email} onChangeText={setEmail} />
                        </YStack>
                        {/* Password container */}
                        <YStack style={{gap: theme.spacing.GapVS}}>
                            <H4>Password</H4>
                            <Input id="password" placeholder="Enter Password" secureTextEntry value={password} onChangeText={setPassword} />
                        </YStack>
                        </YStack>
                        {/* Login button */}
                        <YStack>
                            <Button size="$5"
                                color="white"
                                themeInverse={true}
                                backgroundColor={'black'}
                                onPress={handleLogin}
                            >
                                Login
                            </Button>
                        </YStack>
                    </YStack>


                </SafeAreaView>
            </LinearGradient>

        </TamaguiProvider>

    );
}

export { LoginPages };

const styles = StyleSheet.create({
    container: {
        margin: theme.spacing.pageMargin,
        justifyContent: 'space-between',
        flex: 1,
    }
});