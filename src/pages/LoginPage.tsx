import { StyleSheet, SafeAreaView, View, Image, ViewStyle, Animated, Easing } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { languages, levels, scenarios } from '../constants/settings';
import { TamaguiProvider, Label, H6, H5, H4, H3, H2, H1, Button, TextArea, XStack, YStack } from 'tamagui'
import config from '../../tamagui.config'
import { SelectItem } from '../components/selectItem';
import { createStackNavigator } from '@react-navigation/stack';
import Theme from '../styles/theme';
import images from '../../assets/images';
import { initializeApp } from "firebase/app";
import { Auth } from 'firebase/auth';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { LinearGradient } from 'expo-linear-gradient';
const Stack = createStackNavigator();
import LogoHeader from '../components/logoHeader';

// __________________________________ MAIN APP __________________________________ 
export default function LoginPage({navigation}) {
    
    return (
        <TamaguiProvider config={config}>
            <LinearGradient
                colors={['#F7ADDF', '#BED7FC',]}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ flex: 1 }}
            >
                <SafeAreaView style={styles.container}>
                    <LogoHeader />
                    {/* INNER CONTAINER */}
                    <YStack style={styles.innerContainer}>
                        <Image
                            source={images.ch['english']}
                            style={styles.baseImage}
                            resizeMode="contain"
                        />
                        <Image source={images.ch['shadow']} style={[{ width: 100, }, styles.overlay]} resizeMode="contain" />
                    </YStack>
                    {/* BUTTON */}
                    <YStack>
                        <Button size="$5"
                            color="white"
                            themeInverse={true}
                            backgroundColor={'black'}
                            onPress={() => navigation.navigate('RegisterNamePage')}
                            >
                            Register
                        </Button>
                    </YStack>
                    <YStack>
                        <Button size="$5">
                            Log In
                        </Button>
                    </YStack>
                </SafeAreaView>
            </LinearGradient>
        </TamaguiProvider>

    );
}


// __________________________________ STYLES __________________________________ 

const styles = StyleSheet.create({

    overlay: {
        position: 'absolute',
        bottom: 205,
        left: 115,
        zIndex: -1,
    },

    baseImage: {
        height: 300,
    },

    container: {
        flex: 1,
        justifyContent: 'space-between',
        margin: Theme.spacing.pageMargin,
        gap: Theme.spacing.buttonVGap,
        
    } as ViewStyle,

    innerContainer: {
        ...Theme.spacing.centered,
        gap: Theme.spacing.gap,
        flex: 1,
    } as ViewStyle,
});
