import React from 'react';
import { PressableProps } from 'react-native';

type ButtonVariant = 'brand' | 'google' | 'apple' | 'ghost';

export interface ButtonType extends PressableProps {
  label: string;
  variant?: ButtonVariant;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
