import AppleLogo from '@/src/components/AppleIcon';
import Button from '@/src/components/Button';
import GoogleLogo from '@/src/components/GoogleIcon';
import MainLogo from '@/src/components/MainLogo';
import { EnvelopeIcon } from 'phosphor-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import {
  SafeAreaView
} from 'react-native-safe-area-context';

  

export default function WelcomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white px-5 pt-16 pb-4">
      <View className="flex-1 flex-col justify-between">
        
        <View className="mt-6">
          <MainLogo/>

          <View className="flex-row items-end flex-wrap mt-2.5">
            <Text className=" text-dark font-roboto-semibold text-3xl">Welcome to </Text>
            <Text className=" text-brand font-bbhBartle text-xl">ARCHIV</Text>
          </View>

          <Text className="text-sutle leading-6 font-poppins">
            Capture your thoughts, ideas, and inspirations in one place.
          </Text>
        </View>

        <View className="w-full gap-3">
          <Button 
            variant="apple"
            label="Continue with Apple" 
            icon={<AppleLogo size={24} />} 
          />
          
          <Button 
            variant="google"
            label="Continue with Google" 
            icon={<GoogleLogo size={24} />} 
          />
          
          <Button 
            variant="brand" 
            label="Continue with Email" 
            icon={<EnvelopeIcon color="#F0EFF4" size={28} />} 
          />
        </View>

        <View className="items-center mb-4">
          <Text className="text-center text-subtle text-xs  leading-4 mb-10 font-poppins">
            By continuing, you acknowledge that you understand and agree to the Terms & conditions and Privacy Policy
          </Text>

          <View className="flex-row items-center">
            <Text className="text-subtle text-base">Already have an account? </Text>
            <TouchableOpacity>
              <Text className="text-brand font-poppins-semibold text-base">Log in</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
}
