import { Bubble } from 'react-native-gifted-chat';
import theme from '../styles/theme';
import { StyleSheet, View, Image, ViewStyle } from 'react-native';
import { TamaguiProvider, Label, Button, TextArea, XStack, YStack, Text} from 'tamagui'
import Icon from 'react-native-vector-icons/Ionicons';

const CustomBubble = (props) => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
          backgroundColor: theme.colors.input, // Custom background color for right bubble
          padding: theme.spacing.chat.bubblePadding,
          borderRadius: theme.spacing.chat.bubbleBorderRadius,
          marginHorizontal: 5,
        },
        right: {
          backgroundColor: theme.colors.main, // Custom background color for right bubble
          padding: theme.spacing.chat.bubblePadding,
          borderRadius: theme.spacing.chat.bubbleBorderRadius,
          marginHorizontal: 5,
        },
      }}
    />
  );
};

export default CustomBubble;