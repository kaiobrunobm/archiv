import {
  CaretRightIcon,
  ListBulletsIcon,
  ListNumbersIcon,
  TextBIcon,
  TextItalicIcon,
  TextStrikethroughIcon,
  TextUnderlineIcon
} from 'phosphor-react-native';
import React from 'react';
import { ScrollView, View, useWindowDimensions } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import { IconButton } from './IconButton';

interface EditorToolbarProps {
  activeFormats: {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strike?: boolean;
    bulletList?: boolean;
    numberList?: boolean;
  };
  onToggleFormat: (format: string) => void;
  onAddLink?: () => void;
  onAddImage?: () => void;
}

// Create an animated version of View to apply styles
const AnimatedView = Animated.createAnimatedComponent(View);

export function EditorToolbar({ 
  activeFormats, 
  onToggleFormat,
}: EditorToolbarProps) {
  const iconColor = "#FF7043"; 
  const iconSize = 24;

  // 1. Calculate specific widths for the animation
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  // w-56 is 224px (14rem). 
  const COLLAPSED_WIDTH = 224; 
  // Parent has px-5 (20px left + 20px right = 40px). 
  const EXPANDED_WIDTH = SCREEN_WIDTH - 40; 

  // 2. Shared Values for Reanimated
  const width = useSharedValue(COLLAPSED_WIDTH);
  const rotation = useSharedValue(0);
  const isExpanded = useSharedValue(false);

  const handleToggleExpand = () => {
    // Determine target values
    const targetWidth = isExpanded.value ? COLLAPSED_WIDTH : EXPANDED_WIDTH;
    const targetRotation = isExpanded.value ? 0 : 180;

    // Apply smooth timing
    const config = {
      duration: 300,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    };

    width.value = withTiming(targetWidth, config);
    rotation.value = withTiming(targetRotation, config);
    
    // Toggle state
    isExpanded.value = !isExpanded.value;
  };

  // 3. Animated Styles
  const containerStyle = useAnimatedStyle(() => {
    return {
      width: width.value,
    };
  });

  const caretStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <View className="w-full pb-2 pt-2 px-5 items-start">
      <AnimatedView 
        className="bg-surface-light py-4 px-2 flex-row gap-3 rounded-full shadow-md shadow-dark/50 overflow-hidden"
        style={containerStyle}
      >
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 8, gap: 8, paddingRight: 48 }}
          className="flex-1"
        >
          <IconButton
            variant="action"
            active={activeFormats.bold}
            onPress={() => onToggleFormat('bold')}
            icon={<TextBIcon size={iconSize} color={iconColor} weight={activeFormats.bold ? "bold" : "regular"} />}
          />
          
          <IconButton
            variant="action"
            active={activeFormats.italic}
            onPress={() => onToggleFormat('italic')} 
            icon={<TextItalicIcon size={iconSize} color={iconColor} weight={activeFormats.italic ? "bold" : "regular"} />} 
          />
          
          <IconButton
            variant="action"
            active={activeFormats.underline}
            onPress={() => onToggleFormat('underline')}
            icon={<TextUnderlineIcon size={iconSize} color={iconColor} weight={activeFormats.underline ? "bold" : "regular"}/>}
          />

          <IconButton
            variant="action"
            active={activeFormats.strike}
            onPress={() => onToggleFormat('strike')}
            icon={<TextStrikethroughIcon size={iconSize} color={iconColor} weight={activeFormats.strike ? "bold" : "regular"}/>}
          />

          <IconButton
            variant="action"
            active={activeFormats.bulletList}
            onPress={() => onToggleFormat('bulletList')}
            icon={<ListBulletsIcon size={iconSize} color={iconColor} weight={activeFormats.bulletList ? "bold" : "regular"}/>}
          />

          <IconButton
            variant="action"
            active={activeFormats.numberList}
            onPress={() => onToggleFormat('numberList')}
            icon={<ListNumbersIcon size={iconSize} color={iconColor} weight={activeFormats.numberList ? "bold" : "regular"}/>}
          />
        </ScrollView>

        {/* Toggle Button: Positioned absolute to stay right-anchored inside the animated container */}
        <View className="absolute right-2 top-[14px] bg-surface-light">
          <IconButton
            onPress={handleToggleExpand}
            icon={
              <AnimatedView style={caretStyle}>
                <CaretRightIcon size={iconSize} color={iconColor}/>
              </AnimatedView>
            } 
          />
        </View>
      </AnimatedView>
    </View>
  );
}
