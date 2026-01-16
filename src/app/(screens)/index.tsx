import Button from '@/src/components/Button';
import GoogleIcon from '@/src/components/GoogleIcon';
import { IconButton } from '@/src/components/IconButton';
import React, { useState } from 'react';
import { View } from 'react-native';
// Assuming you use Lucide Icons or similar
import { ArrowLeftIcon, PlusIcon, TextBIcon } from 'phosphor-react-native';

export default function EditorScreen() {
  const [isBold, setIsBold] = useState(false);

  return (
    <View className='bg-background flex-1 px-6 pt-12'>
      {/* HEADER ROW */}
      <View className='mb-8 flex-row items-center justify-between'>
        {/* 1. The Elevated "Back" Button */}
        <IconButton
          variant='elevated'
          icon={<ArrowLeftIcon size={24} color='#000' />}
          onPress={() => console.log('Go back')}
        />

        {/* 2. The Elevated "Add" Button (The '+' in your video) */}
        <IconButton
          variant='elevated'
          icon={<PlusIcon size={24} color='#FF7043' />} // Brand color icon
          onPress={() => console.log('Add new')}
        />
      </View>

      <View className='flex-row gap-4'>
        <IconButton
          variant='action'
          active={isBold}
          onPress={() => setIsBold(!isBold)}
        >
          <TextBIcon weight='bold' color='#FF7043' size={24} />
        </IconButton>
      </View>
      <Button
        label='Continue with Google'
        variant='google'
        className='w-full'
        icon={<GoogleIcon />}
      />
    </View>
  );
}
