import { StyleSheet, View, Image, ViewStyle, Animated, Easing } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { languages, levels, scenarios } from '../constants/settings';
import { TamaguiProvider, Label, H6, H5, H4, H3, H2, H1, Button, TextArea, XStack, YStack } from 'tamagui'
import config from '../../tamagui.config'
import { SelectItem } from '../components/selectItem';
import { createStackNavigator } from '@react-navigation/stack';
import Theme from '../styles/theme';
import images from '../../assets/images';

import { LinearGradient } from 'expo-linear-gradient';
const Stack = createStackNavigator();

// __________________________________ MAIN APP __________________________________ 
export default function FormPage({ navigation }) {
    const [scenario, setScenario] = useState(''); // [scenario, setScenario] = useState('') -> [state, setState] = useState('' or 0 or false or [] or {} or null or undefined)
    const [language, setLanguage] = useState('');
    const [level, setLevel] = useState('');
    const fadeAnim = useRef(new Animated.Value(1)).current; // Initial opacity for image

    // Character Fade In Animation
    const fadeInCharacter = (language) => {
        Animated.timing(fadeAnim, { // start FADE OUT 
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
            easing: Easing.in(Easing.cubic)
        }).start(() => {
            setLanguage(language); // change image
            Animated.timing(fadeAnim, { // Start FADE IN
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
                easing: Easing.out(Easing.cubic)
            }).start();
        });
    } // hook: start the animation when the language state changes.

    //_________________________________________________________

    // Submit form
    const handleSubmit = (event) => {
        event.preventDefault();

        // If empty field, give alert
        if (scenario == '') {
            alert("Please select scenario.");
            return;
        } else if (language == '') {
            alert("Please select language.");
            return;
        } else if (level == '') {
            alert("Please select proficiency level.");
            return;
        }

        // If all fields filled, submit form
        console.log("Client submitted scenario to backend: ", scenario);
        fetch('http://127.0.0.1:5000/submitForm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                scenario: scenario,
                language: language,
                level: level,
            }),
        })

        navigation.navigate('ChatPage', { pageTitle: scenario });
    }

    // __________________________________ RENDER FORM PAGE __________________________________ 
    return (
        <TamaguiProvider config={config}>
            <LinearGradient
                colors={['#F7ADDF', '#BED7FC',]}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ flex: 1 }}
            >
                <View style={styles.container}>
                    {/* HEADER */}
                    <YStack>
                        <XStack style={{ justifyContent: 'center', alignItems: 'center', gap: 20, }}>
                            <Image
                                source={require('../../assets/images/AIDI_TEXT_LOGO.png')}
                                style={{ width: 20, height: 20, resizeMode: 'contain', }}
                            />
                            <H3>Ask Aidi</H3>
                        </XStack>
                    </YStack>
                    {/* <XStack style={styles.header}>
                        
                    </XStack> */}
                    {/* INNER CONTAINER */}
                    <YStack style={styles.innerContainer}>
                        <Animated.View style={{ opacity: fadeAnim, position: 'relative', }}>
                            {
                                (language === "") ?
                                    <Image
                                        source={images.ch['english']}
                                        style={styles.baseImage}
                                        resizeMode="contain"
                                    /> : <Image
                                        source={images.ch[language]}
                                        style={styles.baseImage}
                                        resizeMode="contain" />
                            }
                        </Animated.View>
                        <Image source={images.ch['shadow']} style={[{ width: 100, }, styles.overlay]} resizeMode="contain" />
                        {/* PREFERENCES */}
                        <View>
                            <View style={styles.preferences}>
                                {/*  */}
                                <XStack style={styles.preference}>
                                    {/* <Label> Language </Label> */}
                                    <SelectItem native
                                        items={scenarios}
                                        id="scen"
                                        placeholder="Select simulation"
                                        onValueChange={(val) => {
                                            console.log("Language selected:", language); // Log the selected language
                                            setScenario(val);
                                        }}
                                        isSelected={scenario != ''}
                                    />
                                </XStack>

                                <XStack style={styles.preference}>
                                    {/* <Label> Language </Label> */}
                                    <SelectItem isSelected={language != ''} native items={languages} id="lang" placeholder="Select language"
                                        // size="$5"
                                        onValueChange={(val) => {
                                            console.log("Language selected:", language); // Log the selected language
                                            fadeInCharacter(val); // change character, set language
                                        }}
                                    />

                                </XStack>
                                <XStack style={styles.preference}>
                                    {/* <Label> Proficiency Level </Label> */}
                                    <SelectItem isSelected={level != ''} native items={levels} id="lev" placeholder="Select level" onValueChange={(val) => setLevel(val)} />
                                </XStack>

                            </View>
                        </View>
                    </YStack>
                    {/* BUTTON */}
                    <YStack>
                        <Button size="$5"
                            // active={{ backgroundColor: 'white' }}
                            color="white"
                            themeInverse={true}
                            backgroundColor={'black'}
                            onPress={handleSubmit}>
                            Start Chat
                        </Button>
                    </YStack>
                </View>

            </LinearGradient>
        </TamaguiProvider>

    );
}


// __________________________________ STYLES __________________________________ 

const styles = StyleSheet.create({

    header: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: 20,
        flex: 0,
        backgroundColor: 'pink',
    },

    overlay: {
        position: 'absolute',
        bottom: 230,
        left: 115,
        zIndex: -1,
    },

    baseImage: {

        height: 300,
    },

    container: {
        flex: 1,
        // backgroundColor: Theme.colors.main,
        justifyContent: 'space-between',
        padding: Theme.spacing.bottomGap,
        paddingTop: 50,
    } as ViewStyle,

    innerContainer: {
        ...Theme.spacing.centered,
        gap: Theme.spacing.gap,
        flex: 1,
        // backgroundColor: 'blue'
    } as ViewStyle,

    preferences: {
        ...Theme.spacing.centered,
    } as ViewStyle,

    preference: {
        justifyContent: 'center',
        marginVertical: 10,
    },
});
