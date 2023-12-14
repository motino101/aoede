import { Time } from 'react-native-gifted-chat'
import Icon from 'react-native-vector-icons/Ionicons';
import React, { useState } from 'react';
import { XStack } from 'tamagui';
import theme from '../styles/theme';
import { DialogDemo } from './dialogInstance';

const RenderTime = ({
    clickFuncL,
    clickFuncR,
    ...timeProps }) => {
    return (
        <XStack style={{ justifyContent: 'center', alignItems: 'flex-end', marginRight: 5, marginTop: 0 }}>
            <Time
                {...timeProps}
            />
            <DialogDemo
                type={timeProps.currentMessage.user._id === timeProps.user._id ? 'right' : 'left'}
                message={timeProps.currentMessage.text}
                clickFunction={timeProps.currentMessage.user._id === timeProps.user._id ? clickFuncR : clickFuncL}
                title={timeProps.currentMessage.user._id === timeProps.user._id ? 'Feedback' : 'Translation'}
                subtitleTop={timeProps.currentMessage.user._id === timeProps.user._id ? 'Your message' : 'Message'}
                subtitleBottom={timeProps.currentMessage.user._id === timeProps.user._id ? 'Feedback' : 'Translation'}
                textColorTop={timeProps.currentMessage.user._id === timeProps.user._id ? theme.colors.white : theme.colors.dark}
                textColorBottom={timeProps.currentMessage.user._id === timeProps.user._id ? theme.colors.white : theme.colors.white}
                bubbleColorTop={timeProps.currentMessage.user._id === timeProps.user._id ? theme.colors.main : theme.colors.input}
                bubbleColorBottom={timeProps.currentMessage.user._id === timeProps.user._id ? theme.colors.dark : theme.colors.dark}
            />
        </XStack>
    )
}

export default RenderTime;

