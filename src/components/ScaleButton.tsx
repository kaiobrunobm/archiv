import React from 'react';
import { Pressable, type PressableProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const ScaleButton = ({ style, disabled, ...props }: PressableProps) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const springConfig = { damping: 10, stiffness: 300, mass: 0.5 };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value
  }));

  const handlePressIn = () => {
    if (disabled) return;
    scale.value = withSpring(0.96, springConfig);
    opacity.value = withTiming(0.8, { duration: 100 });
  };

  const handlePressOut = () => {
    if (disabled) return;
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
