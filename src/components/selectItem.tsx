import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import {
  TamaguiProvider, Adapt,
  FontSizeTokens,
  Label,
  SelectProps,
  Sheet,
  getFontSize,
  Button, Select, Input, SizeTokens, TextArea, XStack, YStack, H1, H2, H3, H4, H5, H6, Heading
} from 'tamagui'
import { LinearGradient } from 'tamagui/linear-gradient'
import theme from '../styles/theme';

export function SelectItem({
  id,
  placeholder,
  items,
  isSelected,
  onValueChange,
  ...props
}: SelectProps & {
  id: string;
  items: { name: string; }[];
  placeholder: string;
  onValueChange: (value: string) => void;
  isSelected: boolean; // Add this line
}) {
  const [val, setVal] = useState('')

  // style if selected by user
  // const selectedItemStyle = {}
  // console.log("isSelected: ", isSelected)
  const selectedItemStyle = isSelected ? 
  {
    backgroundColor: theme.colors.input,
    // borderColor: theme.colors.dark,
    borderWidth: 1
  } : {
    borderColor: theme.colors.label,
    borderWidth: 1.5,
    backgroundColor: theme.colors.input,
    // color: 'transparent',
  };

  const handleChange = (value: string) => {
    console.log("value is: ", value);
    setVal(value)
    onValueChange(value)
    console.log("onvaluechange: ", value);
  }
  
  return (
    <Select
      id={id}
      value={val}
      onValueChange={handleChange}
      disablePreventBodyScroll
      {...props}
    >
      <Select.Trigger iconAfter={ChevronDown} style={selectedItemStyle}>
        <Select.Value placeholder={placeholder} />
      </Select.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet
          native={!!props.native}
          modal
          dismissOnSnapToBottom
          animationConfig={{
            type: 'spring',
            damping: 20,
            mass: 1.2,
            stiffness: 250,
          }}
        >
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Select.Content zIndex={200000}>
        <Select.ScrollUpButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronUp size={20} />
          </YStack>
          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            fullscreen
            colors={['$background', 'transparent']}
            borderRadius="$4"
          />

        </Select.ScrollUpButton>

        <Select.Viewport
          // to do animations:
          animation="quick"
          animateOnly={['transform', 'opacity']}
          enterStyle={{ o: 0, y: -10 }}
          exitStyle={{ o: 0, y: 10 }}
          minWidth={200}
        >
          <Select.Group>
            {/* for longer lists memoizing these is useful */}
            {useMemo(
              () =>
                items.map((item, i) => {
                  return (
                    <Select.Item
                      index={i}
                      key={item.name}
                      value={item.name.toLowerCase()}
                    >
                      <Select.ItemText>{item.name}</Select.ItemText>
                      <Select.ItemIndicator marginLeft="auto">
                        <Check size={16} />
                      </Select.ItemIndicator>
                    </Select.Item>
                  )
                }),
              [items]
            )}
          </Select.Group>
          {/* Native gets an extra icon */}
          {props.native && (
            <YStack
              position="absolute"
              right={0}
              top={0}
              bottom={0}
              alignItems="center"
              justifyContent="center"
              width={'$4'}
              pointerEvents="none"
            >
              {/* <ChevronDown
                  size={getFontSize((props.size as FontSizeTokens) ?? '$true')}
                /> */}
            </YStack>
          )}
        </Select.Viewport>
        <Select.ScrollDownButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronDown size={20} />
          </YStack>
          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            fullscreen
            colors={['$background', 'transparent']}
            borderRadius="$4"
          />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select>
  )
}