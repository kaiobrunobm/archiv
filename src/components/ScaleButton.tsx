import React from 'react';
import { Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated';
import { ScaleButtonProps } from '../types/types';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const ScaleButton = ({
  style,
  disabled,
  pressEffect = 'scale',
  ...props
}: ScaleButtonProps) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const springConfig = { damping: 10, stiffness: 300, mass: 0.5 };

  const animatedStyle = useAnimatedStyle(() => {
    if (pressEffect === 'none') return {};

    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value
    };
  });

  const handlePressIn = () => {
    if (disabled || pressEffect === 'none') return;
    scale.value = withSpring(0.96, springConfig);
    opacity.value = withTiming(0.9, { duration: 100 });
  };

  const handlePressOut = () => {
    if (disabled || pressEffect === 'none') return;
    scale.value = withSpring(1, springConfig);
    opacity.value = withTiming(1, { duration: 100 });
  };

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={[style, animatedStyle]}
      {...props}
    />
  );
};
