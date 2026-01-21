import {
  EyeIcon,
  EyeSlashIcon,
  XCircleIcon
} from 'phosphor-react-native';
import React, { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { colors } from '../theme/nativewind';
import { InputProps } from '../types/types';

const Input: React.FC<InputProps> = ({
  type = 'text',
  error = false,
  LeftIcon,
  RightIcon,
  onRightIconPress,
  value,
  onChangeText,
  editable = true,
  className,
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const isPassword = type === 'password';
  const isSearch = type === 'search';

  const secureTextEntry = isPassword && !passwordVisible;

  const renderRightIcon = () => {
    if (isPassword) {
      return (
        <Pressable onPress={() => setPasswordVisible(v => !v)}>
          {
            passwordVisible ? (
              <EyeIcon
                size={24}
                color={error ? colors.danger : colors.lightSutle}
                weight="regular"
              />
            ) : (
              <EyeSlashIcon
                size={24}
                color={error ? colors.danger : colors.lightSutle}
                weight="regular"
              />
            )
          }
        </Pressable>
      );
    }

    if (isSearch && value) {
      return (
        <Pressable onPress={() => onChangeText?.('')}>
          <XCircleIcon
            size={24}
            color={error ? colors.danger : colors.sutle}
            weight="fill"
          />
        </Pressable>
      );
    }

    if (RightIcon) {
      return (
        <Pressable
          onPress={onRightIconPress}
          disabled={!onRightIconPress}
        >
          <RightIcon
            size={24}
            color={error ? colors.danger : colors.lightSutle}
          />
        </Pressable>
      );
    }

    return null;
  };

  return (
    <View
      className={`
        w-full flex-row items-center rounded-2xl px-4 py-3.5
        ${focused ? 'border-border-light border-2 bg-surface-light' : 'border-transparent border-2'}
        ${error ? 'border-danger border-2 bg-input-error' : 'bg-surface-light'}
        ${!editable ? 'opacity-80' : ''}
        ${className}
      `}
    >
      {LeftIcon && (
        <View className="mr-2">
          <LeftIcon
            size={24}
            color={error ? colors.danger : colors.lightSutle}
          />
        </View>
      )}

      <TextInput
        {...props}
        value={value}
        editable={editable}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={
          error ? colors.danger : colors.lightSutle
        }
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`
          flex-1 text-base font-medium
          ${focused && 'text-dark'}
          ${error && 'text-danger'}
          `}
        style={{ includeFontPadding: false }}
      />

      <View className="ml-2">{renderRightIcon()}</View>
    </View>
  );
};

export default Input;
