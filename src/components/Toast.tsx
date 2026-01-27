import React, { useEffect } from 'react';
import { Text, Pressable, View } from 'react-native';
import Animated, {
  FadeInUp,
  FadeOutUp,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { scheduleOnRN } from 'react-native-worklets';

import { Gesture, GestureDetector } from 'react-native-gesture-handler';

import { cva } from 'class-variance-authority';
import { CheckCircleIcon, WarningCircleIcon, XCircleIcon, XIcon } from 'phosphor-react-native';

import { cn } from '@/src/utils/utils';
import type { ToastProps } from '@/src/types/types';

const TOAST_ICON_COLORS = {
  default: '#050A10',
  success: '#058B38',
  danger: '#8F1524',
};

export const toastVariants = cva(
  'flex-row items-start w-full rounded-2xl border px-4 py-3.5 gap-3 shadow-sm bg-surface-light',
  {
    variants: {
      variant: {
        default: 'bg-surface-light border-border-light',
        success: 'bg-surface-sucess border-border-sucess',
        danger: 'bg-surface-danger border-border-danger',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const titleVariants = cva('font-poppins-semibold text-sm leading-5', {
  variants: {
    variant: {
      default: 'text-text-on-surface-light',
      success: 'text-text-on-surface-sucess',
      danger: 'text-text-on-surface-danger',
    },
  },
  defaultVariants: {
    variant: 'default',

  },
});

const descriptionVariants = cva('font-poppins-regular text-xs', {
  variants: {
    variant: {
      default: 'text-text-on-surface-light opacity-80',
      success: 'text-text-on-surface-sucess opacity-80',
      danger: 'text-text-on-surface-danger opacity-80',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const DISMISS_THRESHOLD = -40;

export function Toast({
  className,
  variant = 'default',
  title,
  description,
  onClose,
  style,
  ...props
}: ToastProps) {
  const translateY = useSharedValue(0);
  const isDismissing = useSharedValue(false);

  const insets = useSafeAreaInsets();

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const panGesture = Gesture.Pan()
    .enabled(!isDismissing.value && !!onClose)
    .onUpdate((event) => {
      if (event.translationY < 0) {
        translateY.value = event.translationY;
      } else {
        translateY.value = event.translationY / 4;
      }
    })
    .onEnd((event) => {
      if (event.translationY < DISMISS_THRESHOLD || event.velocityY < -600) {
        isDismissing.value = true;
        translateY.value = withTiming(event.translationY - 50, { duration: 1 });
        scheduleOnRN(handleClose)
      } else {
        translateY.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const IconComponent = React.useMemo(() => {
    switch (variant) {
      case 'success': return CheckCircleIcon;
      case 'danger': return XCircleIcon;
      default: return WarningCircleIcon;
    }
  }, [variant]);

  const iconColor = TOAST_ICON_COLORS[variant || 'default'];

  useEffect(() => {
    setTimeout(() => {
      handleClose()
    }, 2000)
  }, [])


  return (

    <View className="absolute left-4 right-4 -top-16 z-50" style={{ paddingTop: insets.top }}>
      <GestureDetector gesture={panGesture}>
        <Animated.View
          entering={FadeInUp.springify(150)}
          exiting={FadeOutUp.springify(150)}
          layout={LinearTransition.springify()}
          className={cn(toastVariants({ variant, className }))}
          style={[style, animatedStyle]}
          {...props}
        >
          <View className="items-center justify-center">
            <IconComponent
              size={24}
              weight="regular"
              color={iconColor}
            />
          </View>

          <View className="flex-1 justify-center">
            <Text className={cn(titleVariants({ variant }))}>
              {title}
            </Text>

            {description && (
              <Text className={cn(descriptionVariants({ variant }))}>
                {description}
              </Text>
            )}
          </View>

          {onClose && (
            <Pressable
              onPress={handleClose}
              hitSlop={12}
              className="items-center justify-center opacity-60 active:opacity-100 p-1 -m-1"
            >
              <XIcon
                size={20}
                color={iconColor}
                weight="bold"
              />
            </Pressable>
          )}
        </Animated.View>
      </GestureDetector>
    </View>
  );
}
