import { cn } from '@/src/utils/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { View } from 'react-native';
import { ScaleButton } from './ScaleButton';

const iconButtonVariants = cva(
  'items-center justify-center rounded-full h-12 w-12',
  {
    variants: {
      variant: {
        action: 'bg-transparent',
        elevated: 'bg-surface-light active:bg-transparent'
      },
      active: {
        true: 'bg-button-tab-active',
        false: ''
      }
    },
    defaultVariants: {
      variant: 'action',
      active: false
    },
    compoundVariants: [
      {
        variant: 'elevated',
        active: true,
        class: 'bg-border-light'
      }
    ]
  }
);

interface IconButtonProps
  extends
    React.ComponentProps<typeof ScaleButton>,
    VariantProps<typeof iconButtonVariants> {
  icon?: React.ReactNode;
  active?: boolean;
}

export const IconButton = ({
  icon,
  className,
  variant,
  active,
  children,
  ...props
}: IconButtonProps) => {
  return (
    <ScaleButton
      className={cn(iconButtonVariants({ variant, active, className }))}
      {...props}
    >
      {icon ? <View>{icon}</View> : children}
    </ScaleButton>
  );
};
