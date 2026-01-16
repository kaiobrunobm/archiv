import React, { useState } from 'react';
import { View } from 'react-native';
// Assuming you use Lucide Icons or similar

export default function EditorScreen() {
  const [isBold, setIsBold] = useState(false);
  const [password, setPassword] = useState('');
  const [search, setSearch] = useState('');
  const [email, setEmail] = useState('');

  return <View className='bg-background flex-1 px-6 pt-12'></View>;
}
