import React from 'react';
import { Pressable, type PressableProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated';

// 1. Create an animated version of the standard Pressable
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const ScaleButton = ({ style, disabled, ...props }: PressableProps) => {
  // 2. Shared values to drive the animation
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  // 3. Configure the physics of the spring (the "bouncy" feel)
  const springConfig = { damping: 10, stiffness: 300, mass: 0.5 };

  // 4. Create the animated style object
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value
  }));

  // 5. Handlers for press events
  const handlePressIn = () => {
    if (disabled) return;
    // Shrink to 96% size with a spring
    scale.value = withSpring(0.96, springConfig);
    // Fade to 80% opacity quickly
    opacity.value = withTiming(0.8, { duration: 100 });
  };

  const handlePressOut = () => {
    if (disabled) return;
    // Spring back to full size
    scale.value = withSpring(1, springConfig);
    // Fade back to full opacity
    opacity.value = withTiming(1, { duration: 100 });
  };

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      // 6. Combine your NativeWind styles with the animated styles
      style={[style, animatedStyle]}
      {...props}
    />
  );
};
