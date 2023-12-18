import { Time } from 'react-native-gifted-chat'
import Icon from 'react-native-vector-icons/Ionicons';
import React, { useState } from 'react';
import { XStack } from 'tamagui';
import theme from '../styles/theme';
import { DialogDemo } from './dialogInstance';

const RenderTime = ({
    ...timeProps }) => {
    return (
        <XStack style={{ justifyContent: 'center', alignItems: 'flex-end', marginRight: 5, marginTop: 0 }}>
            <Time
                {...timeProps}
            />
            <DialogDemo
                message={timeProps.currentMessage.text}
            />
        </XStack>
    )
}

export default RenderTime;

