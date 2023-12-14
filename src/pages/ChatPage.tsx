import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { BOT_PROFILE, languages, levels } from '../constants/settings';
// import theme from './src/styles/theme';
import {
  TamaguiProvider,
  XStack,
  H3,
} from 'tamagui'
import config from '../../tamagui.config'
import CustomBubble from '../components/bubble';
import CustomInputToolbar from '../components/inputToolbar';
import theme from '../styles/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomSend from '../components/send';
import CustomComposer from '../components/composer';
import CustomMessageText from '../components/MessageText';
import RenderTime from '../components/renderTime';


// __________________________________ MAIN APP __________________________________ 
export default function ChatPage({ navigation }) {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true);

  // Set initial messages
  useEffect(() => {
    setMessages([
      // {
      //   _id: 2,
      //   text: 'Hello developer',
      //   createdAt: new Date(),
      //   user: BOT_PROFILE
      // },
      {
        _id: 1,
        text: 'Start chatting with Ade.',
        createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
        system: true,
      }
    ])
  }, [])

  // API ENDPOINT 2: Send new messages to the chat
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    const userMessage = messages[0].text; // Get user message
    fetch('http://127.0.0.1:5000/chat', { // Generate bot message
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage }),
    })
      .then(response => {
        if (!response.ok) { throw new Error(`Response failed with status: ${response.status}`); }
        return response.json();
      })
      .then(data => { // Append the chatbot's response to the messages
        console.log("data is: ", data);
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, [
            {
              _id: Math.random().toString(),
              text: data.message,
              createdAt: new Date(),
              user: BOT_PROFILE,
            },
          ])
        );

      })
      .catch(error => {
        console.log('There was a problem with the fetch operation: ', error);
      });
  }, []);

  // API ENDPOINT 4: Translate message - only return output
  async function translateText(msg) {
    console.log("TranslateText entered. Input: ", msg)
    try {
      const response = await fetch('http://127.0.0.1:5000/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({msg: msg}),
      });
      
      if (!response.ok){throw new Error(`Response failed with status: ${response.status}`);}
      const data = await response.json();
      console.log("response is: ", data);
      return data;
    } catch (Error){
      console.log('There was a problem analyzing text ', Error);
    }


  }

  // API ENDPOINT 3: Translate message input - only return output
  async function analyzeText(msg) {
    console.log("message is: ", msg);
    try {
      const response = await fetch('http://127.0.0.1:5000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ msg: msg }),
      });

      if (!response.ok) {
        throw new Error(`Response failed with status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (Error) {
      console.log('There was a problem analyzing text ', Error);
    }
    
  }
  
  // API ENDPOINT 5: Summarise conversation history - only return output
  async function summarise(){
    console.log("Summarise text entered. Input is conversation history.")
    try {
      const response = await fetch('http://127.0.0.1:5000/summarise', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {throw new Error(`Response failed with status: ${response.status}`)}

      const data = await response.json();
      return data;
    } catch(Error) {
      console.log('There was a problem analyzing text ', Error);
    }
  }
  // __________________________________ RENDER FORM PAGE __________________________________ 
  return (
    <TamaguiProvider config={config}>

      {/* HEADER */}
      <XStack style={styles.header}>
        <XStack style={{ justifyContent: "center", alignItems: "center" }}>
          <View>
            <TouchableOpacity onPress={() => { navigation.goBack() }}>
              <Icon name="arrow-back" size={theme.size.bigIcon} color="white" />
            </TouchableOpacity>
          </View>

          <XStack style={styles.headerText}>
            <View><Image source={require('../../assets/images/pizza.png')} style={{ width: 28, height: 32 }}></Image></View>
            <H3 color={'white'}>Ordering Food</H3>
            
          </XStack>
          <TouchableOpacity onPress={() => summarise()}>
          <Icon name="star" size={20} color="white" />
          </TouchableOpacity>
        </XStack>
      </XStack>

      {/* GIFTEDCHAT */}
      <View style={{ flex: 1, marginBottom: theme.spacing.gap, backgroundColor: theme.colors.white}}>
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: 1,
          }}
          renderInputToolbar={props => <CustomInputToolbar {...props} />}
          renderBubble={(bubbleProps) => <CustomBubble {...bubbleProps} />}
          renderSend={(Props) => <CustomSend {...Props} />}
          renderComposer={props => <CustomComposer {...props} />}
          renderMessageText={(messageProps) => <CustomMessageText {...messageProps} />}
          // NOTE: Pass in analysis message and response to RenderTime
          renderTime={(timeProps) => 
          <RenderTime {...timeProps}
            clickFuncL={translateText} // function called if icon clicked of left message
            clickFuncR={analyzeText} // function called if icon clicked of right message
            />}
        />
      </View>
    </TamaguiProvider>
  );
}


// __________________________________ STYLES __________________________________ 

const styles = StyleSheet.create({

  header: {
    height: 124,
    backgroundColor: theme.colors.main,
    paddingTop: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.gap,
    position: 'relative'
  },

  headerIcon: {
    position: 'absolute',
  },

  headerText: {
    justifyContent: 'center',
    flex: 1,
    marginRight:10,
    // backgroundColor: theme.colors.white,
    gap: theme.spacing.iconTextgap,
    alignItems: 'center',
  }
});
