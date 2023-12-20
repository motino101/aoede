import { StyleSheet, View, ViewStyle, Animated, Easing } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { languages, levels, scenarios } from '../constants/settings';
import {
    TamaguiProvider,
    Button, Card, CardProps, H2, Image, Paragraph, XStack, YStack,
    ListItem, Separator, YGroup
} from 'tamagui'
import { ChevronRight, Cloud, Moon, Star, Sun } from '@tamagui/lucide-icons'
import config from '../../tamagui.config'
import { SelectItem } from '../components/selectItem';
import { createStackNavigator } from '@react-navigation/stack';
import Theme from '../styles/theme';
import images from '../../assets/images';
import { Ionicons } from '@expo/vector-icons';
import theme from '../styles/theme';

import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from '@ui-kitten/components';

function Conversation({title, }) {
    return(
        <YGroup.Item>
          <ListItem
            hoverTheme
            pressTheme
            
            title="Star"
            subTitle="Subtitle"
            width="100%"
            icon={Star}
            iconAfter={ChevronRight}
          />
        </YGroup.Item>
    );
}

function ListItemDemo2() {
    return (
      <YGroup alignSelf="center" bordered size="$5" separator={<Separator />} themeInverse>
        <YGroup.Item>
          <ListItem
            hoverTheme
            pressTheme
            title="Star"
            subTitle="Subtitle"
            icon={Star}
            iconAfter={ChevronRight}
          />
        </YGroup.Item>
        <YGroup.Item>
          <ListItem
            hoverTheme
            pressTheme
            title="Moon"
            subTitle="Subtitle"
            icon={Moon}
            iconAfter={ChevronRight}
          />
        </YGroup.Item>
      </YGroup>
    )
  }

// __________________________________ MAIN APP __________________________________ 
export default function ConversationsPage({ navigation }) {

    return (
        <TamaguiProvider config={config}>
            <View style={styles.container}>
                <ListItemDemo2 />
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
        padding: Theme.spacing.bottomGap - 20,
        paddingTop: 80,
    } as ViewStyle,
});
