import { IconButton } from '@/src/components/IconButton';
import { ScaleButton } from '@/src/components/ScaleButton';
import SettingsItem from '@/src/components/SettingsItem';
import { useRouter } from 'expo-router';
import {
  BellIcon,
  CaretLeftIcon,
  CaretRightIcon,
  GearSixIcon,
  HeadsetIcon,
  PaintBrushHouseholdIcon,
  PlusIcon,
  SignOutIcon,
  StarIcon,
  TwitterLogoIcon
} from "phosphor-react-native";
import React from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView className="flex-1" edges={['top']}>
      <View className="px-5 py-4 flex-row items-center">
        <IconButton
          variant='elevated'
          icon={<CaretLeftIcon size={24} color="#050A10" />}
          onPress={() => router.back()}
        /> 
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        className='px-5 pb-5'
      >
        
        <Text className="text-3xl font-roboto-semibold text-dark mb-6 text-center">
          Settings
        </Text>


      <SafeAreaView style={{ paddingBottom: insets.bottom - 40}}>
        <Pressable className="flex-row items-center bg-surface-light px-5 py-4 rounded-2xl mb-4 shadow-md">
          <View className="relative rounded-full border-2 border-brand">
            <Image 
                source={{ uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" }}
                className="w-16 h-16 rounded-full bg-gray-200 m-[2px]"
            />
            <View className="absolute bottom-0 -right-1 bg-white rounded-full p-1 border border-gray-100">
              <PlusIcon size={14} color="#FF7043" />
            </View>
          </View>
          
          <View className="ml-4 flex-1">
              <Text className="text-lg font-poppins-semibold  text-dark">Kaio Bruno</Text>
              <View className="flex-row items-center">
                <Text className="text-border-dark font-poppins text-sm mr-1">Edit Profile</Text>
                <CaretRightIcon size={14} color="#908F92" weight="bold" />
              </View>
          </View>
        </Pressable>

          <SettingsItem 
            icon={GearSixIcon} 
            label="Account settings" 
            isLast={true} 
            onPress={() => console.log('Account')} 
            className='shadow-md mb-4'
          />

        <View className="mb-4 bg-surface-light shadow-md rounded-2xl">
          <Text className="font-poppins-semibold text-border-light pt-4 pb-1 px-5">Preferences</Text>
            <SettingsItem icon={BellIcon} label="Notifications" />
            <SettingsItem icon={PaintBrushHouseholdIcon} label="Appearance" isLast={true} />
        </View>

        <View className="mb-4 bg-surface-light shadow-md rounded-2xl">
          <Text className="font-poppins-semibold text-border-light pt-4 pb-1 px-5">Resources</Text>
            <SettingsItem icon={HeadsetIcon} label="Contact Support" />
            <SettingsItem icon={StarIcon} label="Rate in App Store" />
            <SettingsItem icon={TwitterLogoIcon} label="Follow @kaiobrunobm" isLast={true} />
        </View>

        {/* --- 5. Sign Out --- */}
        <ScaleButton 
          className="flex-row items-center justify-center gap-4 px-5 py-6 rounded-2xl bg-red-50 shadow-md"
        >
          <SignOutIcon size={24} color="#EF4444" weight="bold"  />
          <Text className="text-red-500 font-poppins-bold text-base">Sign Out</Text>
        </ScaleButton>
      </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  );
}

interface SettingsItemProps {
  icon: any;
  label: string;
  isLast?: boolean;
  onPress?: () => void;
}

