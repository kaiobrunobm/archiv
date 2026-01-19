import Button from '@/src/components/Button';
import { EditorToolbar } from '@/src/components/EditorToolbar';
import { IconButton } from '@/src/components/IconButton';
import { useRouter } from 'expo-router';
import { ArrowUUpLeftIcon, CaretLeftIcon, ExportIcon } from 'phosphor-react-native';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EditorScreen() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [formats, setFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    strike: false,
    bulletList: false,
    numberList: false,
  })
  const [expandTools, setExpandTools] = useState(false)

  const handleToggleFormat = (format: string) => {
    setFormats(prev => ({ ...prev, [format]: !prev[format as keyof typeof prev] }));
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 " >
        {/* Header */}
        <View className="flex-row items-center px-4 py-2 ">
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

        {/* Editor Area */}
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >

          <Text className='text-center text-sm font-poppins text-lightSutle/40 pb-4'>Janary 19, 2026 at 3:30 PM</Text>
          <ScrollView 
            className="flex-1 px-5"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          >
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

         <EditorToolbar 
            activeFormats={formats}
            onToggleFormat={handleToggleFormat}
            onAddLink={() => console.log('Link')}
            onAddImage={() => console.log('Image')}
          /> 
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}
