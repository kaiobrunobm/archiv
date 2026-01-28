import {
  BBHSansBartle_400Regular
} from '@expo-google-fonts/bbh-sans-bartle';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  useFonts,
} from '@expo-google-fonts/poppins';
import {
  RobotoCondensed_400Regular,
  RobotoCondensed_500Medium,
  RobotoCondensed_600SemiBold,
  RobotoCondensed_700Bold,
} from '@expo-google-fonts/roboto-condensed';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import '@/global.css';
import NotesProvider from '@/src/utils/NotesProvider';
import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Poppins: Poppins_400Regular,
    'Poppins-Medium': Poppins_500Medium,
    'Poppins-SemiBold': Poppins_600SemiBold,
    Roboto: RobotoCondensed_400Regular,
    'Roboto-Medium': RobotoCondensed_500Medium,
    'Roboto-Semibold': RobotoCondensed_600SemiBold,
    'Roboto-Bold': RobotoCondensed_700Bold,
    BBHSans: BBHSansBartle_400Regular
  });


  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <GestureHandlerRootView className='flex-1'>
      <NotesProvider>
        <Stack screenOptions={{ headerShown: false }} initialRouteName='index'>

          <Stack.Screen
            name="(drawer)"
            options={{
              gestureEnabled: false,
              animation: 'slide_from_bottom'
            }}
          />
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="settings" options={{
            gestureEnabled: false,
            animation: 'slide_from_bottom'
          }} />

        </Stack>
      </NotesProvider>
      <StatusBar barStyle='dark-content' />
    </GestureHandlerRootView>
  )
}
