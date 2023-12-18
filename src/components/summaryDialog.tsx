import {
    Adapt,
    Dialog,
    Sheet,
    Unspaced,
    H6, H5, YStack, Paragraph,

} from 'tamagui'
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import PaddedBox from "./paddedBox";
import { useState } from 'react'
import theme from '../styles/theme';


// import { SelectDemoItem } from './SelectDemo' 
export default function SummaryDialogue() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [analyzedText, setAnalyzedText] = useState('');

    // API ENDPOINT 5: Summarise conversation history - only return output
  async function summarise(){
    console.log("Summarise text entered. Input is conversation history.")
    try {
      const response = await fetch('http://127.0.0.1:5000/summarise', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {throw new Error(`Response failed with status: ${response.status}`)}

      const data = await response.json();
      return data;
    } catch(Error) {
      console.log('There was a problem analyzing text ', Error);
    }
  }

    

    const onClick = async () => {
        setLoading(true);
        try {
            const result = await summarise();
            console.log("result:", result);
            setAnalyzedText(result.summary.trim()); // Assuming result.analysis contains the text you need
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
                <Icon name="star" size={20} color="white" />
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
                    <Dialog.Title>Summary</Dialog.Title>

                    {loading ? (
                        <H5 style={{ gap: 15 }}>Loading...</H5>
                    ) : (
                        
                        <YStack style={{ gap: 10 }}>
                            <YStack style={{ gap: 10 }}>
                                <Paragraph>{analyzedText}</Paragraph>
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
