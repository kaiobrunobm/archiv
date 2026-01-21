import { useRouter } from 'expo-router';
import { EnvelopeIcon, LockIcon } from 'phosphor-react-native';
import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';


import AppleLogo from '@/src/components/AppleIcon';
import Button from '@/src/components/Button';
import GoogleLogo from '@/src/components/GoogleIcon';
import Input from '@/src/components/Input';
import MainLogo from '@/src/components/MainLogo';
import { Keyboard } from 'react-native';


const TEXTS = {
  HEADER_TITLE: 'Welcome back',
  HEADER_SUBTITLE: 'Sign in to access your notes across all your devices.',
  PLACEHOLDER_EMAIL: 'Email',
  PLACEHOLDER_PASSWORD: 'Password',
  FORGOT_PASSWORD: 'Forgot password?',
  BTN_LOGIN: 'Login',
  DIVIDER_TEXT: 'Or continue with',
  BTN_APPLE: 'Apple',
  BTN_GOOGLE: 'Google',
  NO_ACCOUNT: "Don't have an account? ",
  SIGN_UP: 'Sign up',
  ERROR_EMPTY_FIELDS: 'Please fill in all fields'
};

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [onError, setOnError] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setOnError(true);
      setTimeout(() => setOnError(false), 5000);
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      
      router.replace('/mainDashboard'); 
    }, 2000);
  };

  const handleForgotPassword = () => {
    router.push('/forgetPassword');
  };

  const handleSignUp = () => {
    router.replace('/');
  };

  return (
    <SafeAreaView className="flex-1 bg-light" style={{ paddingTop: insets.top + 24, paddingBottom: insets.bottom}}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View className="flex-1 flex-col justify-between px-5">

            <View className='gap-5'>
              <MainLogo />

              <View>
                <Text className="text-dark font-roboto-semibold text-3xl">
                  {TEXTS.HEADER_TITLE}
                </Text>
                <Text className="text-lightSutle font-poppins">
                  {TEXTS.HEADER_SUBTITLE}
                </Text>
              </View>       
            </View>

            <View className="w-full gap-6">

              <View className='gap-3 w-full '>

              <Input 
                placeholder={TEXTS.PLACEHOLDER_EMAIL}
                LeftIcon={EnvelopeIcon}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                error={onError}
              />

              <Input
                type='password'
                placeholder={TEXTS.PLACEHOLDER_PASSWORD}
                LeftIcon={LockIcon}
                value={password}
                error={onError}
                onChangeText={setPassword}
              />
              
              <TouchableOpacity 
                onPress={handleForgotPassword}
                className='flex-row items-center justify-end'
              >
                <Text className="text-brand font-poppins text-sm">
                {TEXTS.FORGOT_PASSWORD}
                </Text>
              </TouchableOpacity>

              <Button 
                variant="brand" 
                label={TEXTS.BTN_LOGIN} 
                disabled={isLoading}
                loading={isLoading}
                onPress={handleLogin}
              />
            
              </View>

              <View className="flex-row items-center">
                <View className="flex-1 h-[1px] bg-border-light" />
                  <Text className="mx-4 text-lightSutle font-poppins text-xs uppercase tracking-wider">
                    {TEXTS.DIVIDER_TEXT}
                  </Text>
                <View className="flex-1 h-[1px] bg-border-light" />
              </View>
            
              <View className="flex-row  w-full gap-4 justify-center items-center">

                  <Button 
                    variant="apple" 
                    label={TEXTS.BTN_APPLE}
                    icon={<AppleLogo />} 
                    onPress={() => console.log('Apple Login')}
                  />

                  <Button 
                    variant="google" 
                    label={TEXTS.BTN_GOOGLE}
                    icon={<GoogleLogo />} 
                    onPress={() => console.log('Google Login')}
                  />

              </View>

            </View>
            
            <View className="flex-row justify-center items-center">
              <Text className="text-lightSutle font-poppins text-sm">
                {TEXTS.NO_ACCOUNT}
              </Text>
                
              <TouchableOpacity onPress={handleSignUp}>
                <Text className="text-brand font-poppins-semibold text-sm">
                  {TEXTS.SIGN_UP}
                </Text>
              </TouchableOpacity>
            </View>


          </View>
        </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
