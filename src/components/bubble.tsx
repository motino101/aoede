import { Bubble } from 'react-native-gifted-chat';

const CustomBubble = (props) => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
          backgroundColor: '#fff', // Custom background color for left bubble
        },
        right: {
          backgroundColor: '#fdfff', // Custom background color for right bubble
        },
      }}
    />
  );
};

export default CustomBubble;