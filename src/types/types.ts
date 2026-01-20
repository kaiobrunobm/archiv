import { IconProps } from 'phosphor-react-native';
import React, { ReactNode } from 'react';
import { PressableProps, TextInputProps } from 'react-native';

type ButtonVariant = 'brand' | 'google' | 'apple' | 'ghost' | 'drawer'  | 'danger';

export interface ButtonType extends PressableProps {
  label: string;
  variant?: ButtonVariant;
  loading?: boolean;
  icon?: ReactNode;
  active?: boolean;
  className?: string; 
  pressEffect?: 'scale' | 'none';
}

export interface ScaleButtonProps extends PressableProps {
  pressEffect?: 'scale' | 'none';
}

export interface AuthOption {
  id: string;
  label: string;
  variant: 'apple' | 'google' | 'brand';
  icon: React.ReactNode;
  action: () => void;
}

export interface InputProps extends TextInputProps {
  type?: 'text' | 'password' | 'search';
  error?: boolean;
  LeftIcon?: React.FC<IconProps>;
  RightIcon?: React.FC<IconProps>;
  onRightIconPress?: () => void;
}

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
