import Button from '@/src/components/Button';
import GoogleIcon from '@/src/components/GoogleIcon';
import { useState } from 'react';
import { View } from 'react-native';

export default function Index() {
  const [isLoading, setLoading] = useState(false);

  return (
    <View className='bg-light flex-1 items-center justify-center gap-2 p-4'>
      <Button
        onPress={() => setLoading(true)}
        disabled={isLoading}
        loading={isLoading}
        label='Continue with Google'
        variant='google'
        className='w-full'
        icon={<GoogleIcon />}
      />
    </View>
  );
}
