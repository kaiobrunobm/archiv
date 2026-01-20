import { EyeIcon, EyeSlashIcon, XCircleIcon } from 'phosphor-react-native';
import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { InputProps } from '../types/types';
import { cn } from '../utils/utils';

// Theme constants
const COLORS = {
  placeholder: '#C0BFC3',
  error: '#EF233C',
  activeBorder: '#908F92',
  transparent: 'transparent',
} as const;

const Input = forwardRef<TextInput, InputProps>(({
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
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => setIsFocused(false), []);

  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible((prev) => !prev);
  }, []);

  const handleClearSearch = useCallback(() => {
    onChangeText?.('');
  }, [onChangeText]);

  const containerClasses = useMemo(() => cn(
    "w-full flex-row items-center justify-center rounded-2xl px-4 py-3.5 border",
    error ? "bg-input-error" : "bg-surface-light",
    !editable && "opacity-80",

    error ? "border-danger border-2" 
      : isFocused ? "border-border-light border-2" 
      : "border-transparent",
    className
  ), [error, isFocused, editable, className]);

  const textColorClass = useMemo(() => cn(
    "flex-1 text-base font-medium",
    error && "text-danger",
    !editable && "text-dark",
    !error && editable && "text-subtle"
  ), [error, editable]);

  const iconColor = error ? COLORS.error : COLORS.placeholder;
  const isSecure = type === 'password' && !isPasswordVisible;

  const renderRightIcon = () => {

    if (type === 'password') {
      const IconComponent = isPasswordVisible ? EyeIcon : EyeSlashIcon;
      return (
        <Pressable onPress={togglePasswordVisibility} hitSlop={8}>
          <IconComponent color={iconColor} size={24} />
        </Pressable>
      );
    }

    if (type === 'search' && value && value.length > 0) {
      return (
        <Pressable onPress={handleClearSearch} hitSlop={8}>
          <XCircleIcon color={iconColor} size={24} weight="fill" />
        </Pressable>
      );
    }

    if (RightIcon) {
      return (
        <Pressable 
          onPress={onRightIconPress} 
          disabled={!onRightIconPress}
          hitSlop={8}
        >
          <RightIcon color={iconColor} size={24} />
        </Pressable>
      );
    }

    return null;
  };

  return (
    <View className={containerClasses}>
      {LeftIcon && (
        <View className="h-8 w-8 mr-2 items-center justify-center">
          <LeftIcon color={iconColor} size={24} />
        </View>
      )}

      <TextInput
        ref={ref}
        {...props}
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        secureTextEntry={isSecure}
        placeholderTextColor={error ? COLORS.error : COLORS.placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={textColorClass}
        style={{ includeFontPadding: false }} 
      />

      <View className="ml-2">
        {renderRightIcon()}
      </View>
    </View>
  );
});

Input.displayName = 'Input';

export default Input;
