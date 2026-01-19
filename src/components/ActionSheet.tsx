import { cn } from '@/src/utils/utils'; // Using your existing utility
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ActionSheetProps {
  children: React.ReactNode;
  title?: string;
  snapPoints?: string[];
  onClose?: () => void;
  className?: string; 
}

const ActionSheet = forwardRef<BottomSheet, ActionSheetProps>(({ 
  children, 
  title,
  snapPoints = ['50%'], 
  onClose,
  className
}, ref) => {

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    ),
    []
  );

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      onClose={onClose} 
      backgroundStyle={{ backgroundColor: '#F0EFF4' }}
      handleIndicatorStyle={{ backgroundColor: '#908F92', borderRadius: 999 }} 
    >
      <BottomSheetView style={styles.contentContainer}>
        <SafeAreaView edges={['bottom', 'left', 'right']} className={cn("flex-1 px-5 pt-2 pb-8", className)}>
          
          {title && (
              <Text className="text-3xl font-roboto-semibold text-dark text-center mt-3">
                {title}
              </Text>
          )}
          <View className="flex-1 gap-4">
              {children}
          </View>
        </SafeAreaView>
      </BottomSheetView>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
});

export default ActionSheet;
