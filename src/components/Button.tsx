import { cn } from '@/src/utils/utils';
import { cva } from 'class-variance-authority';
import React, { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import { ButtonType } from '../types/types';
import { ScaleButton } from './ScaleButton';

const SPINNER_COLORS: Record<NonNullable<ButtonType['variant']>, string> = {
  brand: '#F0EFF4',
  google: '#050A10',
  apple: '#F0EFF4',
  ghost: '#FF7043',
  drawer: '#050A10',
  danger: '#F0EFF4',
};

const buttonVariants = cva(
  'flex-row items-center justify-center rounded-2xl px-6 py-4 gap-3 disabled:opacity-50',
  {
    variants: {
      variant: {
        brand: 'bg-brand',
        google: 'bg-surface-light border border-border-light active:bg-gray-100',
        apple: 'bg-dark',
        ghost: 'bg-transparent active:bg-button-brandDisable',
        drawer: 'bg-transparent justify-start active:bg-button-brandDisable',
        danger: 'bg-button-danger'
      }
    },
    defaultVariants: {
      variant: 'brand'
    }
  }
);

const textVariants = cva('text-base font-poppins-semibold text-center py-1.5', {
  variants: {
    variant: {
      brand: 'text-light',
      google: 'text-dark',
      apple: 'text-light',
      ghost: 'text-brand',
      drawer: 'text-dark',
      danger: 'text-danger'
    }
  }
});

const Button = ({
  label,
  variant = 'brand',
  className,
  loading = false,
  icon,
  active,
  pressEffect = 'scale',
  disabled,
  ...props
}: ButtonType) => {
  const contentOpacity = useSharedValue(1);
  const spinnerOpacity = useSharedValue(0);

  useEffect(() => {
    // Manager Note: Simplified boolean logic
    contentOpacity.value = withTiming(loading ? 0 : 1, { duration: 200 });
    spinnerOpacity.value = withTiming(loading ? 1 : 0, { duration: 200 });
  }, [loading]);

  const contentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value
  }));

  const spinnerStyle = useAnimatedStyle(() => ({
    opacity: spinnerOpacity.value,
    transform: [{ scale: spinnerOpacity.value }]
  }));

  return (
    <ScaleButton
      // Manager Note: Passing pressEffect allows disabling animation for specific lists/drawers
      pressEffect={pressEffect} 
      className={cn(
        buttonVariants({ variant, className }),
        active && "bg-button-tab-active"
      )}
      disabled={loading || disabled}
      {...props}
    >
      <Animated.View
        style={[spinnerStyle, { position: 'absolute' }]}
        pointerEvents='none'
      >
        <ActivityIndicator size='small' color={SPINNER_COLORS[variant]} />
      </Animated.View>

      <Animated.View
        className='flex-row items-center gap-3'
        style={contentStyle}
      >
        {icon && <View className='h-8 w-8 items-center justify-center'>{icon}</View>}
        <Text className={cn(textVariants({ variant }))}>{label}</Text>
      </Animated.View>
    </ScaleButton>
  );
};

export default Button;
