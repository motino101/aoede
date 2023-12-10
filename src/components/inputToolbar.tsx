import { InputToolbar } from 'react-native-gifted-chat';
import theme from '../styles/theme';

const CustomInputToolbar = (props) => {
  return (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: theme.colors.input,// theme.colors.input, // Custom background color for input toolbar
        borderTopColor: theme.colors.input, // Custom border color for input toolbar
        padding: 0,
        borderRadius: 20,
        // marginBottom: theme.spacing.gap,
        marginHorizontal: 15,
      }}
    />
  );
};

export default CustomInputToolbar;