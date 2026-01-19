import Button from '@/src/components/Button';
import { EditorToolbar } from '@/src/components/EditorToolbar';
import { IconButton } from '@/src/components/IconButton';
import { useRouter } from 'expo-router';
import { ArrowUUpLeftIcon, CaretLeftIcon, ExportIcon } from 'phosphor-react-native';
import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  View
} from 'react-native';
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle
} from 'react-native-reanimated';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function EditorScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const keyboard = useAnimatedKeyboard();

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

 useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);


  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [formats, setFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    strike: false,
    bulletList: false,
    numberList: false,
  });

  const handleToggleFormat = (format: string) => {
    setFormats(prev => ({ ...prev, [format]: !prev[format as keyof typeof prev] }));
  };

  // Logic from your DashboardScreen: Move UI up by keyboard height
  const translateStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -keyboard.height.value }],
    };
  });

  return (
    <SafeAreaView edges={['bottom', 'top', 'left', 'right']} className="flex-1 bg-white">
      
      <View className="flex-row items-center px-4 py-2 z-10">
        <Button 
          label="Notes" 
          variant="ghost" 
          onPress={() => router.back()} 
          className='pl-2 pr-4'
          icon={<CaretLeftIcon size={24} color="#FF7043" />} 
        />
        <View className='flex-1 flex-row justify-end items-center gap-2.5'>
          <IconButton 
            variant='elevated'
            icon={<ArrowUUpLeftIcon size={24} color="#FF7043" />} 
          />
          <IconButton 
            variant='elevated'
            icon={<ExportIcon size={24} color="#FF7043" />} 
          />
        </View>
      </View>

      <ScrollView 
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 150 }}
      >
        <Text className='text-center text-sm font-poppins text-lightSutle/40 pb-4'>
          January 19, 2026 at 3:30 PM
        </Text>
        
        <TextInput
          className="text-3xl font-roboto-semibold text-dark mt-4 mb-2"
          placeholder="Title"
          placeholderTextColor="#C0BFC3"
          value={title}
          onChangeText={setTitle}
          multiline
        />
        <TextInput
          className="text-base font-poppins text-sutle leading-6"
          placeholder="Start typing..."
          placeholderTextColor="#C0BFC3"
          value={content}
          onChangeText={setContent}
          multiline
          textAlignVertical="top"
          style={{ minHeight: 300 }}
        />
      </ScrollView>

      <Animated.View 
        className="absolute left-0 right-0 bottom-0 bg-white"
        style={[
          translateStyle,
          { 
            paddingBottom: !isKeyboardVisible ? insets.bottom : 0
          }
        ]}
      >
        <EditorToolbar 
          activeFormats={formats}
          onToggleFormat={handleToggleFormat}
          onAddLink={() => console.log('Link')}
          onAddImage={() => console.log('Image')}
        /> 
      </Animated.View>

    </SafeAreaView>
  );
}
