import AppleLogo from '@/src/components/AppleIcon';
import Button from '@/src/components/Button';
import GoogleLogo from '@/src/components/GoogleIcon';
import MainLogo from '@/src/components/MainLogo';
import { AuthOption } from '@/src/types/types';
import { useRouter } from 'expo-router';
import { EnvelopeIcon } from 'phosphor-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets
} from 'react-native-safe-area-context';

const TEXTS = {
  TITLE_PREFIX: 'Welcome to ',
  APP_NAME: 'ARCHIV',
  SUBTITLE: 'Capture your thoughts, ideas, and inspirations in one place.',
  LEGAL: 'By continuing, you acknowledge that you understand and agree to the Terms & conditions and Privacy Policy',
  LOGIN_PROMPT: 'Already have an account? ',
  LOGIN_ACTION: 'Log in',
};

export default function WelcomeScreen() {
  const navigation = useRouter();
  const insets = useSafeAreaInsets();

  const handleAuth = (provider: string) => {
    console.log(`Authenticating with ${provider}`);
  };

  const AUTH_OPTIONS: AuthOption[] = [
    {
      id: 'apple',
      label: 'Continue with Apple',
      variant: 'apple',
      icon: <AppleLogo size={24} />,
      action: () => handleAuth('apple'),
    },
    {
      id: 'google',
      label: 'Continue with Google',
      variant: 'google',
      icon: <GoogleLogo size={24} />,
      action: () => handleAuth('google'),
    },
    {
      id: 'email',
      label: 'Continue with Email',
      variant: 'brand',
      icon: <EnvelopeIcon color="#F0EFF4" size={28} />,
      action: () => navigation.push('/credentialsSignup'),
    },
  ];
  
  return (
    <SafeAreaView className="flex-1 bg-light px-5" style={{ paddingTop: insets.top + 24, paddingBottom: insets.bottom}}>
      <View className="flex-1 flex-col justify-between">
        
        <View className='gap-5'>

          <MainLogo/>

          <View>

            <View className="flex-row items-end flex-wrap">
              <Text className=" text-dark font-roboto-semibold text-3xl">
                {TEXTS.TITLE_PREFIX}
              </Text>

              <Text className=" text-brand font-bbhBartle text-xl">
                {TEXTS.APP_NAME}
              </Text>
            </View>

          <Text className="text-sutle font-poppins">
            {TEXTS.SUBTITLE}
          </Text>

        </View>
      
        </View>

        <View className="w-full gap-3">
        {AUTH_OPTIONS.map((option) => (
            <Button
              key={option.id}
              variant={option.variant}
              label={option.label}
              icon={option.icon}
              onPress={option.action}
            />
          ))}
        </View>

        <View className="items-center gap-10">

          <Text className="text-center text-lightSutle text-xs font-poppins">
          {TEXTS.LEGAL}
          </Text>

          <View className="flex-row items-center">
            <Text className="text-lightSutle text-sm font-poppins">{TEXTS.LOGIN_PROMPT}</Text>
            <TouchableOpacity 
              onPress={() => navigation.push('/login')}
              accessibilityRole="button"
              accessibilityLabel="Go to Login"
            >
              <Text className="text-brand font-poppins-semibold text-base">
                {TEXTS.LOGIN_ACTION}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
}
