import {
  EyeIcon,
  EyeSlashIcon,
  XCircleIcon
} from 'phosphor-react-native';
import React, { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { colors } from '../theme/nativewind';
import { InputProps } from '../types/types';
import { cn } from '../utils/utils';

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

  const renderRightIcon = () => {
    if (type === 'password') {
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

    if (type === 'search' && value) {
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
        w-full flex-row items-center rounded-2xl px-4 py-4 gap-2
        ${focused ? 'border-border-light border-2 bg-surface-light' : 'border-transparent border-2'}
        ${error ? 'border-danger border-2 bg-input-error' : 'bg-surface-light'}
        ${!editable && 'bg-transparent'}
        ${className}
      `}
    >
      {LeftIcon && (
        <View>
          <LeftIcon
            size={24}
            color={error ? colors.danger : colors.lightSutle}
          />
        </View>
      )}

      <TextInput
        ref={ref}
        {...props}
        value={value}
        editable={editable}
        onChangeText={onChangeText}
        secureTextEntry={type === 'password' && !passwordVisible}
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

      <View>{renderRightIcon()}</View>
    </View>
  );
});

Input.displayName = 'Input';

export default Input;
