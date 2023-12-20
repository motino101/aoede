import { StyleSheet, View, Image, SafeAreaView, ViewStyle, Animated, Easing } from 'react-native';
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

const RegisterEmailPage = ({ navigation }) => {
    return (
        <RegisterField
        id="registerEmail"
            navigation={navigation}
            question="What is your email?"
            buttonText="Next"
            number="2"
            placeholder="Enter Email"
            nextPage="RegisterPasswordPage"
        />
    )
}

const RegisterPasswordPage = ({ navigation }) => {
    return (
        <RegisterField
        id="registerPassword"
            navigation={navigation}
            question="What is your password?"
            buttonText="Complete"
            number="3"
            placeholder="Enter Password"
            nextPage="LoginPage"
        />
    
    )
}

const RegisterNamePage = ({ navigation }) => {
    return (
        <RegisterField
        id="registerName"
            navigation={navigation}
            question="What is your name?"
            buttonText="Next"
            number="1"
            placeholder="Enter Full Name"
            nextPage="RegisterEmailPage"
            />
    )
}

// Component same across all
const RegisterField = ({ id, navigation, question, number, placeholder, buttonText, nextPage }) => {
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
                            <Ionicons name="chevron-back" size={24} color="black" onPress={() => navigation.goBack()} />
                            <H5>{number}/3</H5>
                        </XStack>
                        {/* Question container */}
                        <YStack style={{gap: theme.spacing.GapVS}}>
                            <H4>{question}</H4>
                            <Input id="name" placeholder={placeholder} />
                        </YStack>
                        </YStack>
                        {/* BUTTON */}
                        <YStack>
                            <Button size="$5"
                                color="white"
                                themeInverse={true}
                                backgroundColor={'black'}
                                onPress={() => navigation.navigate(nextPage)}
                            >
                                {buttonText}
                            </Button>
                        </YStack>
                    </YStack>


                </SafeAreaView>
            </LinearGradient>

        </TamaguiProvider>

    );
}

export { RegisterNamePage, RegisterEmailPage, RegisterPasswordPage };

const styles = StyleSheet.create({
    container: {
        margin: theme.spacing.pageMargin,
        justifyContent: 'space-between',
        flex: 1,
    }
});