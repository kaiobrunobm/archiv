import { IconProps } from 'phosphor-react-native';
import React, { ComponentProps } from 'react';
import { PressableProps, TextInputProps, ViewProps } from 'react-native';
import { VariantProps } from 'tailwind-variants';
import { toastVariants } from '@/src/components/Toast';
import { ScaleButton } from '@/src/components/ScaleButton';
import { buttonVariants } from '@/src/components/Button';



type IconComponent = React.ComponentType<IconProps>

export interface ButtonProps
  extends Omit<ComponentProps<typeof ScaleButton>, 'style' | 'children' | 'disabled'>,
  VariantProps<typeof buttonVariants> {
  children: string
  icon?: IconComponent
  active?: boolean
  isLoading?: boolean
  className?: string
}

export interface ScaleButtonProps extends PressableProps {
  pressEffect?: 'scale' | 'none';
}

export interface AuthOption {
  id: string;
  label: string;
  variant: 'apple' | 'google' | 'brand';
  icon: IconComponent;
  action: () => void;
}

type InputVariant = 'text' | 'password' | 'search';

export interface InputProps extends TextInputProps {
  type?: InputVariant;
  error?: boolean;
  LeftIcon?: React.FC<IconProps>;
  RightIcon?: React.FC<IconProps>;
  onRightIconPress?: () => void;
}

export type InputVisualState = {
  container: string;
  text: string;
  iconColor: string;
};

type NoteVariant = 'alone' | 'top' | 'middle' | 'bottom';

export interface NoteContainerProps {
  title: string;
  excerpt: string;
  folderName: string;
  timestamp: string;
  variant?: NoteVariant;
  onPress?: () => void;
  onArchive?: () => void;
  onDelete?: () => void;
}

export type Note = {
  id: string;
  title: string;
  noteBrief: string;
  folder: string;
  updatedAt: Date;
};

export type ToastVariant = 'default' | 'success' | 'danger';

export interface ToastProps extends ViewProps, VariantProps<typeof toastVariants> {
  title?: string;
  description?: string;
  onClose?: () => void;
}
