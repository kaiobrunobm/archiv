import { IconProps } from 'phosphor-react-native';
import React from 'react';
import { PressableProps, TextInputProps } from 'react-native';

type ButtonVariant = 'brand' | 'google' | 'apple' | 'ghost';

export interface ButtonType extends PressableProps {
  label: string;
  variant?: ButtonVariant;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export interface InputProps extends TextInputProps {
  type?: 'text' | 'password' | 'search';
  error?: boolean;
  LeftIcon?: React.FC<IconProps>;
  RightIcon?: React.FC<IconProps>;
  onRightIconPress?: () => void;
}
