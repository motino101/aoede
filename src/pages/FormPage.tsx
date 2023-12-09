import { StyleSheet, View, Image, ViewStyle } from 'react-native';
import React, { useState } from 'react';
import { languages, levels } from '../constants/settings';
import { TamaguiProvider, Label, Button, TextArea, XStack, YStack } from 'tamagui'
import config from '../../tamagui.config'
import { SelectItem } from '../components/selectItem';
import { createStackNavigator } from '@react-navigation/stack';
import Theme from '../styles/theme';
import Icon from 'react-native-vector-icons/Ionicons';


const Stack = createStackNavigator();

// __________________________________ MAIN APP __________________________________ 
export default function FormPage({ navigation }) {
    const [scenario, setScenario] = useState(''); // [scenario, setScenario] = useState('') -> [state, setState] = useState('' or 0 or false or [] or {} or null or undefined)
    const [language, setLanguage] = useState('');
    const [level, setLevel] = useState('');

    // Submit form
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("scenario is: ", scenario);
        // Post to backend
        fetch('http://127.0.0.1:5000/submitForm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ scenario, language, level }),
        })
        navigation.navigate('ChatPage');
    }

    // __________________________________ RENDER FORM PAGE __________________________________ 
    return (
        <TamaguiProvider config={config}>
            <View style={styles.container}>
                <YStack style={styles.innerContainer}>
                    <Image source={require('../../assets/images/aidi.png')} style={{ width: 123, height: 130 }}
                    />
                    {/* PREFERENCES */}
                    <View style={styles.speechbubble}>
                        <View style={styles.speechBubbleTail}></View>
                        <View style={styles.preferences}>
                            {/*  */}
                            <XStack style={styles.preference}>
                                {/* <Label> Language </Label> */}
                                <SelectItem native items={languages} id="scen" placeholder="Select simulation" onValueChange={(val) => setScenario(val)} />
                            </XStack>

                            <XStack style={styles.preference}>
                                {/* <Label> Language </Label> */}
                                <SelectItem native items={languages} id="lang" placeholder="Select language" onValueChange={(val) => setLanguage(val)} />

                            </XStack>
                            <YStack style={styles.preference}>
                                {/* <Label> Proficiency Level </Label> */}
                                <SelectItem items={levels} id="lev" placeholder="Select level" onValueChange={(val) => setLevel(val)} />
                            </YStack>
                        </View>
                    </View>
                </YStack>
                <YStack>
                    <Button size="$5" onPress={handleSubmit}>Start Chat</Button>
                </YStack>
            </View>

            
        </TamaguiProvider>

    );
}


// __________________________________ STYLES __________________________________ 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.main,
        justifyContent: 'space-between',
        padding: Theme.spacing.bottomGap,
    } as ViewStyle,

    innerContainer: {
        ...Theme.spacing.centered,
        // backgroundColor: "#fdf",
        gap: Theme.spacing.gap,
        flex: 1,
    } as ViewStyle,

    preferences: {
        ...Theme.spacing.centered,
    } as ViewStyle,

    speechbubble: {
        // borderWidth: Theme.spacing.borderWidth,
        // width: Theme.spacing.bodyWidth + Theme.spacing.gap,
        // borderRadius: Theme.spacing.cardBorderRadius,
        // position: 'relative', // Position relative to allow absolute positioning of the tail
        // borderColor: Theme.colors.dark,
    },

    // Style for the speech bubble tail
    speechBubbleTail: {
        // position: 'absolute',
        // bottom: 10,
        // left: (Theme.spacing.bodyWidth) / 2,
        // top: -20,
        // width: 0,
        // height: 0,
        // borderLeftWidth: 10,
        // borderRightWidth: 10,
        // borderBottomWidth: 20,
        // borderLeftColor: 'transparent',
        // borderRightColor: 'transparent',
        // borderBottomColor: Theme.colors.dark,
    },

    preference: {
        width: Theme.spacing.bodyWidth,
        justifyContent: 'center',
        marginVertical: 10,
    },
});
