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
    YStack,
} from 'tamagui'
import theme from "../styles/theme";
import { X } from '@tamagui/lucide-icons'

const CustomMessageText = (props) => {

    return (
        <MessageText {...props}
            />
    );
};

export default CustomMessageText;


