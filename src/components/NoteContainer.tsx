import { NoteContainerProps } from '@/src/types/types';
import { ArchiveIcon, FolderIcon, TrashIcon } from 'phosphor-react-native';
import React from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import type { SharedValue } from 'react-native-reanimated';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const ActionBridge = ({ 
  drag, 
  syncDrag, 
  children 
}: { 
  drag: SharedValue<number>, 
  syncDrag: SharedValue<number>, 
  children: React.ReactNode 
}) => {
  useAnimatedReaction(
    () => drag.value,
    (value) => {
      syncDrag.value = value;
    }
  );
  return <>{children}</>;
};

export default function NoteContainer({
  title,
  excerpt,
  folderName,
  timestamp,
  variant = 'alone',
  onPress,
  onArchive,
  onDelete,
}: NoteContainerProps) {

  const dragX = useSharedValue(0);

  const getContainerStyle = () => {
    switch (variant) {
      case 'top': return 'rounded-t-2xl';
      case 'middle': return 'rounded-none';
      case 'bottom': return 'rounded-b-2xl';
      case 'alone': default: return 'rounded-2xl';
    }
  };

  const animatedCardStyle = useAnimatedStyle(() => {
    const leftOffset = interpolate(
      dragX.value, 
      [-100, 0], 
      [12, 0],   
      Extrapolation.CLAMP
    );

    return {
      left: leftOffset,
    };
  });

  const renderRightActions = (
    progress: SharedValue<number>, 
    drag: SharedValue<number>
  ) => {
    return (
      <ActionBridge drag={drag} syncDrag={dragX}>
        <View className="flex-row w-52 h-full">
          <TouchableOpacity
            onPress={onArchive}
            activeOpacity={0.9}
            className="bg-info justify-center items-center flex-1"
          >
            <ArchiveIcon size={24} color="white" weight="fill" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onDelete}
            activeOpacity={0.9}
            className="bg-danger justify-center items-center flex-1"
          >
            <TrashIcon size={24} color="white" weight="fill" />
          </TouchableOpacity>
        </View>
      </ActionBridge>
    );
  };

  return (
    <View className={`bg-light border-b-2 border-light overflow-hidden ${getContainerStyle()}`}>
      <Swipeable 
        renderRightActions={renderRightActions}
        friction={2}
        overshootRight={false}
      >
        <AnimatedPressable
          onPress={onPress}
          style={[animatedCardStyle]} 
          className={`bg-surface-light px-5 py-4 gap-1 w-full justify-center ${getContainerStyle()}`}
        >
            <Text className="text-dark font-poppins-semibold text-lg">
              {title}
            </Text>

            <Text 
              numberOfLines={1} 
              className="text-lightSutle font-poppins text-sm leading-5"
            >
              {excerpt}
            </Text>

          <View className="flex-row items-center gap-3 mt-2">
            <View className='flex-row items-center gap-1'>
              <FolderIcon size={16} color="#6B7280" weight="fill" />
            <Text className="text-sutle font-poppins text-xs ">
              {folderName}
            </Text>

            </View>
            <Text className="text-sutle font-poppins text-xs">
              {timestamp}
            </Text>
          </View>
        </AnimatedPressable>
      </Swipeable>
    </View>
  );
}
