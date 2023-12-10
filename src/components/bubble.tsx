import { Bubble } from 'react-native-gifted-chat';
import theme from '../styles/theme';

const CustomBubble = (props) => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
          backgroundColor: theme.colors.main, // Custom background color for left bubble
          marginRight: 60,
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