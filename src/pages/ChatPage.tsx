import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Image
  } from 'react-native';
  import { GiftedChat } from 'react-native-gifted-chat';
  import React, { useState, useCallback, useEffect, useMemo } from 'react';
  import { BOT_PROFILE, languages, levels } from '../constants/settings';
  // import theme from './src/styles/theme';
  import {
    TamaguiProvider
  } from 'tamagui'
  import config from '../../tamagui.config'

  
  // __________________________________ MAIN APP __________________________________ 
  export default function ChatPage({navigation}) {
    const [messages, setMessages] = useState([])
  
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
          text: 'Hi! Start chatting with Ade.',
          createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
          system: true,
        }
      ])
    }, [])
  
    // Send new messages to the chat
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
  
    // __________________________________ RENDER FORM PAGE __________________________________ 
    return ( 
        <TamaguiProvider config={config}>
          <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
              _id: 1,
            }}
          />
        </TamaguiProvider>
      );
  }
  
  
  // __________________________________ STYLES __________________________________ 
  
  const styles = StyleSheet.create({
    
  });
  