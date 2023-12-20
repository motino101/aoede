import { View, Image, YStack, XStack, H5} from "tamagui";
import { StyleSheet } from "react-native";
import { ImageStyle } from "react-native";

export default function LogoHeader() {
    return (
        <YStack>
            <XStack style={{ justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                <Image
                    source={require('../../assets/images/AIDI_TEXT_LOGO.png')}
                    style={{ width: 20, height: 20, resizeMode: 'contain' } as ImageStyle}
                />
                <H5>Ask Aidi</H5>
            </XStack>
        </YStack>
    );
}

const styles = StyleSheet.create({
   
})