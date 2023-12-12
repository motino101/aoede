import {Time} from 'react-native-gifted-chat'
import Icon from 'react-native-vector-icons/Ionicons';
import { XStack } from 'tamagui';
import theme from '../styles/theme';
import { DialogDemo } from './dialogInstance';

const RenderTime = ({
    title,
    subtitleBottom,
    subtitleTop,
    bubbleTextTop,
    bubbleTextBottom,
    bubbleColorTop,
    bubbleColorBottom,
    textColorTop,
    textColorBottom,
    ...timeProps }) => {
    return (
        <XStack style={{justifyContent: 'center', alignItems: 'flex-end', marginRight: 5, marginTop: 0}}>
            <Time
        {...timeProps}
        />
        <DialogDemo
            title={title}
            subtitleTop={subtitleTop}
            subtitleBottom={subtitleBottom}
            bubbleTextTop={bubbleTextTop}
            bubbleTextBottom={bubbleTextBottom}
            bubbleColorTop={bubbleColorTop}
            textColorTop={textColorTop}
            textColorBottom={textColorBottom}
            bubbleColorBottom={bubbleColorBottom}
        />
        </XStack>
    )
}

export default RenderTime;