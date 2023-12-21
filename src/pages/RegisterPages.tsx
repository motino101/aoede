import { StyleSheet, View, Image, SafeAreaView, ViewStyle, Animated, Easing, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { languages, levels, scenarios } from '../constants/settings';
import { TamaguiProvider, Input, Label, H6, H5, H4, H3, H2, H1, Button, TextArea, XStack, YStack } from 'tamagui'
import config from '../../tamagui.config'
import { SelectItem } from '../components/selectItem';
import { createStackNavigator } from '@react-navigation/stack';
import Theme from '../styles/theme';
import images from '../../assets/images';
import { initializeApp } from "firebase/app";
import { auth } from '../../firebaseConfig';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import theme from '../styles/theme';

const createUser = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
};

const RegisterEmailPage = ({ navigation }) => {
    const [email, setEmail] = useState('');

    const handleNext = () => {
        navigation.navigate('RegisterPasswordPage', { email });
    };

    return (
        <RegisterField
            id="registerEmail"
            navigation={navigation}
            question="What is your email?"
            buttonText="Next"
            number="2"
            placeholder="Enter Email"
            nextPage="RegisterPasswordPage"
            value={email}
            onChangeText={setEmail}
            onNext={handleNext}
        />
    );
};

const RegisterPasswordPage = ({ navigation, route }) => {
    const [password, setPassword] = useState('');

    const handleComplete = () => {
        const { email } = route.params;
        createUser(email, password)
            .then(() => {
                navigation.navigate('LoginPage');
            })
            .catch((error) => {
                // Handle error
            });
    };

    return (
        <RegisterField
            id="registerPassword"
            navigation={navigation}
            question="Set a password!"
            buttonText="Complete"
            number="3"
            placeholder="Enter Password"
            nextPage="LoginPage"
            value={password}
            onChangeText={setPassword}
            onNext={handleComplete}
        />
    );
};

const RegisterNamePage = ({ navigation }) => {
    const [name, setName] = useState('');

    const handleNext = () => {
        navigation.navigate('RegisterEmailPage', { name });
    };

    return (
        <RegisterField
            id="registerName"
            navigation={navigation}
            question="What is your name?"
            buttonText="Next"
            number="1"
            placeholder="Enter Full Name"
            nextPage="RegisterEmailPage"
            value={name}
            onChangeText={setName}
            onNext={handleNext}
        />
    );
};

// Component same across all
const RegisterField = ({ id, navigation, question, number, placeholder, buttonText, nextPage, value, onChangeText, onNext }) => {
    return (
        <TamaguiProvider config={config}>
            <LinearGradient
                colors={['#F7ADDF', '#BED7FC',]}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ flex: 1 }}
            >
                <SafeAreaView style={styles.container}>
                    <YStack style={{ gap: theme.spacing.GapVL, justifyContent: 'space-between', flex: 1 }}>
                        <YStack style={{ gap: theme.spacing.GapVXL }}>
                            <XStack style={{ justifyContent: 'space-between' }}>
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <Ionicons name="chevron-back" size={24} color="black" />
                                </TouchableOpacity>

                                <H5>{number}/3</H5>
                            </XStack>
                            {/* Question container */}
                            <YStack style={{ gap: theme.spacing.GapVS }}>
                                <H4>{question}</H4>
                                <Input id={id} placeholder={placeholder} value={value} onChangeText={onChangeText} />
                            </YStack>
                        </YStack>
                        {/* BUTTON */}
                        <YStack>
                            <Button size="$5"
                                color="white"
                                themeInverse={true}
                                backgroundColor={'black'}
                                onPress={onNext}
                            >
                                {buttonText}
                            </Button>
                        </YStack>
                    </YStack>


                </SafeAreaView>
            </LinearGradient>

        </TamaguiProvider>
    );
};

export { RegisterNamePage, RegisterEmailPage, RegisterPasswordPage };

const styles = StyleSheet.create({
    container: {
        margin: theme.spacing.pageMargin,
        justifyContent: 'space-between',
        flex: 1,
    }
});