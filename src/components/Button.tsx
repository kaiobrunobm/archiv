import React from 'react'
import { Text, ActivityIndicator } from 'react-native'
import { tv } from 'tailwind-variants'
import { twMerge } from 'tailwind-merge'
import { ScaleButton } from '@/src/components/ScaleButton'
import { ButtonProps } from '@/src/types/types'

export const buttonVariants = tv({
  base: 'flex-row items-center justify-center rounded-2xl border border-transparent',
  variants: {
    variant: {

      brand: 'bg-brand border-brand',

      apple: 'bg-dark border-dark',

      google: 'bg-surface-light border-border-light',

      ghost: 'bg-transparent border-transparent justify-start px-0 active:bg-brand/5',

      drawer: 'border-transparent justify-start items-center px-0 active:bg-brand/5'
    },
    size: {
      default: 'py-5 px-6 gap-3',
      sm: 'h-10 px-3 gap-2',
    },
    disabled: {
      true: 'opacity-50',
      false: 'opacity-100',
    },
    active: {
      true: '',
      false: '',
    }
  },
  slots: {
    text: 'text-base font-poppins-semibold',
    icon: '',
  },

  compoundVariants: [
    {
      variant: 'drawer',
      active: true,
      class: 'bg-brand/10',
    },
  ],

  defaultVariants: {
    variant: 'brand',
    size: 'default',
    disabled: false,
  },
})

export function Button({
  className,
  variant,
  size,
  disabled,
  isLoading,
  active,
  children,
  icon: Icon,
  ...props
}: ButtonProps) {
  const { base, text } = buttonVariants({ variant, size, disabled: disabled || isLoading, active })

  const getContentColor = () => {
    switch (variant) {
      case 'brand':
      case 'apple':
        return '#F0EFF4'
      case 'google':
        return '#050A10'
      case 'ghost':
        return '#FF7043'
      case 'drawer':
        return '#050A10'
      default:
        return '#F0EFF4'
    }
  }

  const contentColor = getContentColor()
  const getTextColorClass = () => {
    switch (variant) {
      case 'brand':
      case 'apple': return 'text-[#F0EFF4]'
      case 'google': return 'text-[#050A10]'
      case 'ghost': return 'text-[#FF7043]'
      case 'drawer': return 'text-[#050A10]'
      default: return 'text-[#F0EFF4]'
    }
  }

  return (
    <ScaleButton
      disabled={disabled || isLoading}
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
              weight={active && variant === 'drawer' ? 'fill' : 'regular'}
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
