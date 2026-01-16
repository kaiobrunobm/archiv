import { EyeIcon, EyeSlashIcon, XCircleIcon } from 'phosphor-react-native';
import React, { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { InputProps } from '../types/types';

const COLORS = {
  placeholder: '#C0BFC3',
  activeBorder: '#908F92',
  error: '#EF233C',
  textDefault: '#1F1F1F'
};

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
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev);
  };

  const handleClearSearch = () => {
    if (onChangeText) {
      onChangeText('');
    }
  };

  const getBorderColorClass = () => {
    if (error) return 'border-danger border-2';
    if (isFocused) return 'border-border-light border-2';
    return 'border-transparent border';
  };

  const getBgColorClass = () => {
    if (error) return 'bg-input-error';
    return 'bg-surface-light';
  };

  const getIconColor = () => {
    if (error) return COLORS.error;
    if (!editable) return COLORS.placeholder;
    return COLORS.placeholder;
  };

  const getTextColorClass = () => {
    if (error) return 'text-danger';
    if (!editable) return 'text-dark';
    return 'text-subtle';
  };

  const renderRightIcon = () => {
    const iconColor = getIconColor();
    const iconSize = 24;

    if (type === 'password') {
      const IconComponent = isPasswordVisible ? EyeIcon : EyeSlashIcon;
      return (
        <Pressable onPress={togglePasswordVisibility}>
          <IconComponent color={iconColor} size={iconSize} />
        </Pressable>
      );
    }

    if (type === 'search' && value && value.length > 0) {
      return (
        <Pressable onPress={handleClearSearch}>
          <XCircleIcon color={iconColor} size={iconSize} weight='fill' />
        </Pressable>
      );
    }

    if (RightIcon) {
      return (
        <Pressable onPress={onRightIconPress} disabled={!onRightIconPress}>
          <RightIcon color={iconColor} size={iconSize} />
        </Pressable>
      );
    }

    return null;
  };

  const isSecure = type === 'password' && !isPasswordVisible;

  return (
    <View
      className={`w-full flex-row items-center justify-center rounded-2xl px-4 py-3.5 ${getBgColorClass()} ${getBorderColorClass()} ${!editable ? 'opacity-80' : ''} ${className} `}
    >
      {LeftIcon && (
        <View className='mr-2'>
          <LeftIcon color={getIconColor()} size={24} />
        </View>
      )}

      <TextInput
        {...props}
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        secureTextEntry={isSecure}
        placeholderTextColor={error ? COLORS.error : COLORS.placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`flex-1 text-base font-medium ${getTextColorClass()} `}
        style={{ includeFontPadding: false }}
      />
      <View className='ml-2'>{renderRightIcon()}</View>
    </View>
  );
};

export default Input;
