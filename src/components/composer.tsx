import {Composer, ComposerProps } from 'react-native-gifted-chat';

const CustomComposer = (props) => {
  return (
    <Composer
      {...props}
      textInputStyle={{
        justifyContent: 'center',
        alignItems: 'center',
        lineHeight: 20,
      }}
    />
  );
};

export default CustomComposer;