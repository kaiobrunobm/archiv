import { NoteItemProps } from '@/src/types/types';
import { ArchiveIcon, FolderIcon, TrashIcon } from 'phosphor-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import type { SharedValue } from 'react-native-reanimated';



export default function NoteContainer({
  title,
  excerpt,
  folderName,
  timestamp,
  variant = 'alone',
  onPress,
  onArchive,
  onDelete,
}: NoteItemProps) {

  // Determine Border Radius & Spacing based on Variant
  const getContainerStyle = () => {
    switch (variant) {
      case 'top':
        return 'rounded-t-3xl rounded-b-[2px] mb-[2px]';
      case 'middle':
        return 'rounded-none mb-[2px]';
      case 'bottom':
        return 'rounded-b-3xl rounded-t-[2px] mb-4';
      case 'alone':
      default:
        return 'rounded-3xl mb-4';
    }
  };

  // 3. Update the signature to use SharedValue<number>
  const renderRightActions = (
    progress: SharedValue<number>, 
    drag: SharedValue<number>
  ) => {
    return (
      <View className="flex-row w-36 h-full">
        {/* Archive Action (Blue) */}
        <TouchableOpacity
          onPress={onArchive}
          activeOpacity={0.8}
          className="bg-[#3B82F6] justify-center items-center w-18 flex-1"
        >
          <ArchiveIcon size={24} color="white" weight="bold" />
        </TouchableOpacity>

        {/* Delete Action (Red) */}
        <TouchableOpacity
          onPress={onDelete}
          activeOpacity={0.8}
          className="bg-[#EF4444] justify-center items-center w-18 flex-1"
        >
          <TrashIcon size={24} color="white" weight="bold" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View className={`bg-transparent overflow-hidden ${getContainerStyle()}`}>
      <Swipeable 
        renderRightActions={renderRightActions}
        // Optional: Add friction/overshoot for a better feel
        friction={2}
        overshootRight={false}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onPress}
          className="bg-[#F2F4F7] p-5 w-full justify-center"
        >
          <View className="mb-1">
            <Text className="text-gray-900 font-bold text-lg font-roboto">
              {title}
            </Text>
          </View>

          <View className="mb-4">
            <Text 
              numberOfLines={1} 
              className="text-gray-500 font-poppins text-sm leading-5"
            >
              {excerpt}
            </Text>
          </View>

          <View className="flex-row items-center">
            <FolderIcon size={16} color="#6B7280" weight="fill" />
            <Text className="text-gray-500 font-poppins text-xs ml-2">
              {folderName}
            </Text>
            <Text className="text-gray-400 font-poppins text-xs ml-3">
              {timestamp}
            </Text>
          </View>
        </TouchableOpacity>
      </Swipeable>
    </View>
  );
}
