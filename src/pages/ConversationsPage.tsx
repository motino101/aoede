import { StyleSheet, View, ViewStyle, Animated, Easing } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { languages, levels, scenarios } from '../constants/settings';
import {
  TamaguiProvider,
  Button, Card, CardProps, H6, H2, Image, Paragraph, XStack, YStack,
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
import { FlatList } from 'react-native';
import { getUserConversations } from '../apis/msgConvoAPI';

function ListItem1({ scenario, language, level }) {
  return (
    <ListItem
      hoverTheme
      pressTheme
      title={scenario}
      subTitle={`${language} - ${level}`}
      icon={Star}
      iconAfter={ChevronRight}
      style={{ backgroundColor: Theme.colors.dark, borderRadius: 0 }}

    />
  )
}

// __________________________________ MAIN APP __________________________________ 
export default function ConversationsPage({ navigation }) {
  const [conversations, setConversations] = useState([]);
  const [savedConversations, setSavedConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  ///
  useEffect(() => {
    getUserConversations("testUser")
      .then((data) => {
        console.log("getUserConversation returns data:", data);
        // Convert the object to an array
        let convos = Object.entries(data).map(([key, value]) => ({
          key, ...value
        }));

        // get saved messages
        const savedConvos = convos.filter(convo => convo.Saved === true);
        convos = convos.filter(convo => convo.Saved === false);
        setConversations(convos);
        setSavedConversations(savedConvos);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      }).finally(() => { setIsLoading(false); }); // End loading}));
    console.log("Conversation data loaded, data is: ", savedConversations)
  }, [])

  function ConvoBlock({name, convos}) {
    return (
      <YStack>
        <H6>{name}</H6>
        <YGroup alignSelf="center" separator={<Separator />} themeInverse>
          <FlatList
            data={convos}
            keyExtractor={(convo) => convo.key}
            renderItem={() =>
              <YGroup.Item>
                <ListItem1 scenario="Ordering Food" language="English" level="Beginner" />
              </YGroup.Item>
            }
          />
        </YGroup>
      </YStack>
    );
  }

  return (
    <TamaguiProvider config={config}>
      <View style={styles.container}>
      
      {
        (isLoading) ?
        <H6 color="white">LOADING</H6>
        :
          <YStack>
<ConvoBlock name="Saved" convos={savedConversations} />
        <ConvoBlock name="Conversations" convos={conversations} />
          </YStack>
      }
      </View>
    </TamaguiProvider>
  );
}


// __________________________________ STYLES __________________________________ 

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Theme.colors.dark,
    justifyContent: 'space-between',
    // padding: Theme.spacing.bottomGap - 20,
    paddingTop: 80,
  } as ViewStyle,
});
