import { cn } from '@/src/utils/utils';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ActionSheetProps {
  children: React.ReactNode;
  title?: string;
  snapPoints?: string[];
  onClose?: () => void;
  className?: string;
  sheetRef?: React.RefObject<BottomSheet>;
}

const ActionSheet = ({
  children,
  title,
  snapPoints = ['50%'],
  onClose,
  className,
  sheetRef

}: ActionSheetProps) => {

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
      ref={sheetRef} // Pass it manually to the library
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
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
});

export default ActionSheet;
