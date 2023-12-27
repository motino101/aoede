import { FlatList, StyleSheet, View, ViewStyle, Animated, Easing } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import {
  TamaguiProvider,
  Button, Card, H6, CardProps, H2, H3, Image, Paragraph, XStack, YStack
} from 'tamagui'
import config from '../../tamagui.config'
import Theme from '../styles/theme';
import { Ionicons } from '@expo/vector-icons';
import theme from '../styles/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { getUserSavedMessages } from '../apis/msgConvoAPI';
import { Message } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/Ionicons';


interface DemoCardProps extends CardProps {
  title: string;
  language: string;
  level: string;
}

export function DemoCard({ title, language, level, ...props }: DemoCardProps) {
  return (

    <Card size="$4" bordered {...props} themeInverse
      style={{
        // padding: theme.spacing.cardPadding,
        // borderRadius: theme.spacing.cardBorderRadius,
        // backgroundColor: theme.colors.dark,
      }}
    >
      <Card.Header padded>
        
        <XStack style={{ justifyContent: 'space-between'}}>
        
          <YStack style={{ gap: 5 }}>
            <H3>{title}</H3>
            <XStack style={{ gap: 5 }}>
              <View style={styles.tag}>
                <Paragraph >{language}</Paragraph>
              </View>
              <View style={styles.tag}>
                <Paragraph >{level}</Paragraph>
              </View>

            </XStack>
          </YStack>
          
          <Icon name="analytics-outline" size={theme.size.bigIcon} color="white" />
        </XStack>
        
      </Card.Header>
      <Card.Background
      >
        
        {/* <Image
          resizeMode="contain"
          alignSelf="center"
          source={{
            width: 300,
            height: 300,
            
          }}
        /> */}
      </Card.Background>
    </Card>
  )
}

// __________________________________ MAIN APP __________________________________ 
export default function MessagesPage({ navigation }) {

  const [savedMessages, setSavedMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state


  // load message
  useEffect(() => {
    getUserSavedMessages("testUser")
      .then((data) => {
        console.log("data", data);
        setSavedMessages(data as any[]);
        // Convert the object to an array
        const messageArray = Object.entries(data).map(([key, value]) => ({
          key, ...value
        }));
        setSavedMessages(messageArray);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      }).finally(() => { setIsLoading(false); }); // End loading}));
    console.log("data loaded")
    console.log("savedMessages", savedMessages)
  }, []);


  return (
    <TamaguiProvider config={config}>
      {(!isLoading) ?
        <View style={styles.container}>
          <FlatList
            data={savedMessages}
            keyExtractor={(message) => message.key}
            renderItem={({ item }) =>
              // <MessageComponent message={item} 
              // <H6>Hi</H6>
              <DemoCard title={item["Content"]} language={item["Language"]} level={item["Level"]}
                animation="bouncy"
                size="$4"
                hoverStyle={{ scale: 0.925 }}
                pressStyle={{ scale: 0.875 }}
              />
            }
          />
        </View>
        :
        <View style={styles.container}>
          <H6>Loading</H6>
        </View>}
    </TamaguiProvider>
  );

}


// __________________________________ STYLES __________________________________ 

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Theme.colors.dark,
    justifyContent: 'space-between',
    padding: Theme.spacing.bottomGap - 20,
    paddingTop: 80,
  } as ViewStyle,

  tag: { justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: "white", borderRadius: 10, paddingVertical: 3, paddingHorizontal: 10, }
});
