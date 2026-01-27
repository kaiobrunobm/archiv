import React, { ComponentProps } from 'react'
import { Text, View, ActivityIndicator } from 'react-native'
import { tv, type VariantProps } from 'tailwind-variants'
import { twMerge } from 'tailwind-merge'
import { IconProps, Icon } from 'phosphor-react-native'
import { ScaleButton } from '@/src/components/ScaleButton'

const buttonVariants = tv({
  base: 'flex-row items-center justify-center rounded-2xl border border-transparent',
  variants: {
    variant: {

      brand: 'bg-brand border-brand', 
      
      apple: 'bg-dark border-dark',
      
      google: 'bg-surface-light border-border-light', 
      
      ghost: 'bg-transparent border-transparent justify-start px-0', 
    },
    size: {
      default: 'py-5 px-6 gap-3',
      sm: 'h-10 px-3 gap-2',
    },
    disabled: {
      true: 'opacity-50',
      false: 'opacity-100',
    }
  },
  slots: {
    text: 'text-base font-poppins-semibold',
    icon: '',

  },

  defaultVariants: {
    variant: 'brand',
    size: 'default',
    disabled: false,
  },
})

type IconComponent = React.ComponentType<IconProps>

export interface ButtonProps
  extends Omit<ComponentProps<typeof ScaleButton>, 'style' | 'children'>,
    VariantProps<typeof buttonVariants> {
  children: string
  icon?: IconComponent

  isLoading?: boolean
  className?: string
}

export function Button({
  className,
  variant,
  size,
  disabled,
  isLoading,
  children,
  icon: Icon,
  ...props
}: ButtonProps) {
  const { base, text } = buttonVariants({ variant, size, disabled: disabled || isLoading })

  const getContentColor = () => {
    switch (variant) {
      case 'brand':
      case 'apple':
        return '#FFFFFF'
      case 'google':
        return '#050A10'
      case 'ghost':
        return '#FF7043'
      default:
        return '#FFFFFF'
    }
  }

  const contentColor = getContentColor()
  const getTextColorClass = () => {
     switch (variant) {
      case 'brand':
      case 'apple': return 'text-white'
      case 'google': return 'text-[#050A10]'
      case 'ghost': return 'text-[#FF7043]'
      default: return 'text-white'
    }
  }

  return (
    <ScaleButton
      disabled={disabled || isLoading}
      pressEffect={variant === 'ghost' ? 'none' : 'scale'}
      style={undefined}
      className={twMerge(base(), className)}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color={contentColor} />
      ) : (
        <>
          {Icon && (
            <Icon 
              size={24} 
              color={contentColor} 
              weight={variant === 'google' ? 'bold' : 'regular'}
            />
          )}

          <Text className={twMerge(text(), getTextColorClass())}>
            {children}
          </Text>
        </>
      )}
    </ScaleButton>
  )
}
