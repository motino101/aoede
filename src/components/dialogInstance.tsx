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
    Card,
    TextArea,
    H6, H5, YStack,

} from 'tamagui'
import theme from "../styles/theme";
import Icon from 'react-native-vector-icons/Ionicons';
import { X, Sparkle, TextCursor } from '@tamagui/lucide-icons'
import { TouchableOpacity } from 'react-native';
import PaddedBox from "./paddedBox";
import { useState } from 'react'


// import { SelectDemoItem } from './SelectDemo' 
export function DialogDemo({
    title, type,
    subtitleBottom, subtitleTop,
    bubbleColorTop, bubbleColorBottom,
    textColorTop, textColorBottom,
    clickFunction, message, // function that runs if icon is clicked, and message to be analyzed by function
}) {

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [analyzedText, setAnalyzedText] = useState('');


    const onClick = async () => {
        setLoading(true);
        console.log("message: hi2", message);
        try {
            const result = await clickFunction({ msg: message });
            console.log("result:", result);
            setAnalyzedText(result.analysis.trim()); // Assuming result.analysis contains the text you need
        } catch (error) {
            console.error('Error in clickFunction:', error);
            // Optionally handle the error state here
        } finally {
            setLoading(false);
        }
    };


    return (

        <Dialog
            modal
            onOpenChange={(open) => {
                setOpen(open)
            }}
        >

            <Dialog.Trigger asChild>
                <TouchableOpacity onPress={() => onClick()} >
                    {type === 'right' ? (
                        <Icon name="analytics-outline" size={20} color="white" />
                    ) : (
                        <Icon name="text-outline" size={20} color="white" />
                    )}
                    {/* <Sparkle size={theme.size.medIcon} color="white"/> */}
                </TouchableOpacity>
            </Dialog.Trigger>
            <Adapt when="sm" platform="touch">
                <Sheet animation="medium" zIndex={200000} modal dismissOnSnapToBottom>
                    <Sheet.Frame padding="$4" gap="$4">
                        <Adapt.Contents />
                    </Sheet.Frame>
                    <Sheet.Overlay
                        animation="lazy"
                        enterStyle={{ opacity: 0 }}
                        exitStyle={{ opacity: 0 }}
                    />
                </Sheet>
            </Adapt>
            <Dialog.Portal>
                <Dialog.Overlay
                    key="overlay"
                    animation="quick"
                    opacity={0.5}
                    enterStyle={{ opacity: 0 }}
                    exitStyle={{ opacity: 0 }}
                />
                {/* THIS IS THE DISPLAYED CONTENT */}
                <Dialog.Content
                    bordered
                    elevate
                    key="content"
                    animateOnly={['transform', 'opacity']}
                    animation={[
                        'quick',
                        {
                            opacity: {
                                overshootClamping: true,
                            },
                        },
                    ]}
                    enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
                    exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
                    gap="$4"
                >
                    <Dialog.Title>{title}</Dialog.Title>

                    {loading ? (
                        <H5 style={{ gap: 10 }}>Loading...</H5>
                    ) : (
                        <YStack style={{ gap: 10 }}>
                            <YStack style={{ gap: 10 }}>
                                <H6 style={{ marginLeft: 5 }}>{subtitleTop}</H6>
                                <PaddedBox text={message} backgroundColor={bubbleColorTop} textColor={textColorTop} />
                            </YStack>
                            <YStack style={{ gap: 10 }}>
                                <H6 style={{ marginLeft: 5 }}>{subtitleBottom}</H6>
                                <PaddedBox text={analyzedText} backgroundColor={bubbleColorBottom} textColor={textColorBottom} />
                            </YStack>
                        </YStack>
                    )}
                    <Unspaced>
                        <Dialog.Close asChild>
                            {/* <Button
                                position="absolute"
                                top="$3"
                                right="$3"
                                size="$2"
                                circular
                                icon={X}
                            /> */}
                        </Dialog.Close>
                    </Unspaced>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog>

    )

}
