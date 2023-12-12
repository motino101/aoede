import { MessageText } from "react-native-gifted-chat";
import {
    Adapt,
    Button,
    Dialog,
    Fieldset,
    Input,
    Label,
    Paragraph,
    Sheet,
    TooltipSimple,
    Unspaced,
    XStack,
} from 'tamagui'
import theme from "../styles/theme";
import { X } from '@tamagui/lucide-icons'
import { DialogDemo } from './dialogInstance';
import { StyleSheet } from "react-native";

const PaddedBox = ({text, backgroundColor, textColor}) => {
    return (
        <XStack style={{
            padding: theme.spacing.cardPadding,
            borderRadius: theme.spacing.cardBorderRadius,
            backgroundColor: backgroundColor,
            
        }}>
            <Paragraph style={{color: textColor}}>{text}</Paragraph>
        </XStack>
    );
}

export default PaddedBox;