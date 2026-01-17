import Input from '@/src/components/Input';
import { EnvelopeIcon, LockIcon } from 'phosphor-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import AppleLogo from '@/src/components/AppleIcon';
import Button from '@/src/components/Button';
import GoogleLogo from '@/src/components/GoogleIcon';
import MainLogo from '@/src/components/MainLogo';
import { useRouter } from 'expo-router';

export default function LoginScreen() {

  const navigation = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-light px-5 pt-16 pb-4">
        <View className="flex-1 flex-col justify-between">
          
          <View className="mt-6">
            <MainLogo />

            <Text className="text-dark font-roboto-semibold text-3xl mt-2.5">
              Welcome back
            </Text>
            <Text className="text-lightSutle font-poppins text-base leading-6">
              Sign in to access your note across all your devices.
            </Text>
          </View>

          <View className="w-full gap-3 pt-6">

            <Input 
              placeholder="Email"
              LeftIcon={EnvelopeIcon}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <View>
              <Input
              type='password'
                placeholder="Password"
                LeftIcon={LockIcon}
              />
            </View>

            <TouchableOpacity className="self-end" onPress={() => navigation.push('/forgetPassword')}>
              <Text className="text-brand font-poppins text-sm">
                Forgot password?
              </Text>
            </TouchableOpacity>
          </View>

          <View className="my-4">
            <Button 
              variant="brand" 
              label="Login" 
            />
          </View>

          <View className="flex-row items-center mb-8">
            <View className="flex-1 h-[1px] bg-border-light" />
            <Text className="mx-4 text-lightSutle font-poppins text-xs uppercase tracking-wider">
              Or continue with
            </Text>
            <View className="flex-1 h-[1px] bg-border-light" />
          </View>

          <View className="flex-row gap-4 mb-10">
            <View className="flex-1">
              <Button 
                variant="apple" 
                label="Apple" 
                icon={<AppleLogo size={20} />} 
              />
            </View>

            <View className="flex-1">
              <Button 
                variant="google" 
                label="Google" 
                icon={<GoogleLogo size={20} />} 
              />
            </View>
          </View>

          {/* Footer */}
          <View className="flex-row justify-center items-center pb-4">
            <Text className="text-lightSutle font-poppins text-sm">
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity  onPress={() => navigation.push('/')}>
              <Text className="text-brand font-poppins-semibold text-sm">
                Sign up
              </Text>
            </TouchableOpacity>
          </View>

        </View>
    </SafeAreaView>
  );
}
