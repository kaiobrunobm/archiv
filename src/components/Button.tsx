import { cn } from '@/src/utils/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import React, { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import { ScaleButton } from './ScaleButton';

const buttonVariants = cva(
  'flex-row items-center justify-center rounded-2xl px-6 py-4 gap-3 disabled:opacity-50',
  {
    variants: {
      variant: {
        brand: 'bg-brand',
        google:
          'bg-surface-light border border-border-light active:bg-gray-100',
        apple: 'bg-dark',
        ghost: 'bg-transparent active:bg-button-brandDisable',
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
      danger: 'text-danger'
    }
  }
});

interface ButtonProps
  extends
    React.ComponentProps<typeof ScaleButton>,
    VariantProps<typeof buttonVariants> {
  label: string;
  loading?: boolean;
  icon?: React.ReactNode;
}

const Button = ({
  label,
  variant,
  className,
  loading,
  icon,
  ...props
}: ButtonProps) => {
  const contentOpacity = useSharedValue(1);
  const spinnerOpacity = useSharedValue(0);

  useEffect(() => {
    if (loading) {
      contentOpacity.value = withTiming(0, { duration: 200 });
      spinnerOpacity.value = withTiming(1, { duration: 200 });
    } else {
      contentOpacity.value = withTiming(1, { duration: 200 });
      spinnerOpacity.value = withTiming(0, { duration: 200 });
    }
  }, [loading]);

  const contentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value
  }));

  const spinnerStyle = useAnimatedStyle(() => ({
    opacity: spinnerOpacity.value,
    transform: [{ scale: spinnerOpacity.value }]
  }));

  const getSpinnerColor = () => {
    switch (variant) {
      case 'google':
        return '#050A10';
      case 'ghost':
        return '#FF7043';
      default:
        return '#F0EFF4';
    }
  };

  return (
    <ScaleButton
      className={cn(buttonVariants({ variant, className }))}
      disabled={loading || props.disabled}
      {...props}
    >
      <Animated.View
        style={[spinnerStyle, { position: 'absolute' }]}
        pointerEvents='none'
      >
        <ActivityIndicator size='small' color={getSpinnerColor()} />
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
