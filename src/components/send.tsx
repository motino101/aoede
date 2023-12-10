import Icon from 'react-native-vector-icons/Ionicons';
import { SendProps, IMessage} from 'react-native-gifted-chat';
import theme from '../styles/theme';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const CustomSend = <TMessage extends IMessage>({
    text = '',
  onSend = () => {},
}: SendProps<TMessage>) => {
    const handleSend = () => {
        if (text.trim()) {
          onSend({ text: text.trim()} as Partial<TMessage>, true);
        }
      };
    return (
        <TouchableOpacity style={styles.container} onPress={handleSend}>
          <Icon name="send" size={theme.size.medIcon} color={theme.colors.white} />
        </TouchableOpacity>
      );
}

// const CustomSend = (props) => {
//   return (
//     <Send
//       {...props}
//       containerStyle={{
//         backgroundColor: theme.colors.input, // Custom background color for input toolbar
//         borderTopColor: theme.colors.input, // Custom border color for input toolbar
//         padding: 0,
//         borderRadius: 20,
//         marginHorizontal: 15,
//       }}
//     />
//   );
// };


const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.main,
      padding: 10,
      borderRadius: 18,
    },
    icon: {
      width: 30, // Adjust as needed
      height: 30, // Adjust as needed
      // Additional icon styling
    },
  });

export default CustomSend;