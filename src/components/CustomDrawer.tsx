// src/components/CustomDrawerContent.tsx
import BottomSheet from '@gorhom/bottom-sheet';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { usePathname, useRouter } from 'expo-router';
import {
  ArchiveIcon,
  FolderIcon,
  HouseIcon,
  PlusIcon,
  TrashIcon
} from 'phosphor-react-native';
import { useRef } from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from './Button';
import MainLogo from './MainLogo';

export default function CustomDrawerContent(props: any) {
  const router = useRouter();
  const pathname = usePathname();
  const { top } = useSafeAreaInsets();

  const isActive = (path: string) => pathname === path;
  const sheetRef = useRef<BottomSheet>(null);

  return (
    <View className="flex-1 bg-light p-5" style={{ paddingTop: top }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
        
        <View className="mt-3 mb-8">
          <MainLogo/>
        </View>

        <Button 
            label="Notes" 
            variant='drawer'
            icon={<HouseIcon weight={isActive('/mainDashboard') ? 'fill' : 'regular'} />} 
            active={isActive('/mainDashboard')}
            onPress={() => router.push('/mainDashboard')}
          />

        <View className="gap-2 mt-6">
          
          <Text className='font-poppins text-base text-lightSutle'>Folders</Text>

          <Button 
            label="Draft" 
            variant='drawer'
            icon={<FolderIcon weight={isActive('/draft') ? 'fill' : 'regular'}/>} 
            active={isActive('/draft')}
            onPress={() => router.push('/draft')} 
          />

          <Button
            label='Create new folder'
            variant='ghost'
            icon={<PlusIcon color='#FF7043'/>}
            onPress={() => sheetRef.current?.expand()}
          />
          
        </View>

        <View className='w-full bg-border-light/40 h-[1px] rounded-full my-3'/>
        <View>
         <Button 
            label="Trash" 
            icon={<TrashIcon weight={isActive('/trashDashboard') ? 'fill' : 'regular'}/>} 
            variant='drawer'
            active={isActive('/trashDashboard')}
            onPress={() => router.push('/trashDashboard')} 
          />

          <Button 
            label="Archive" 
            variant='drawer'
            icon={<ArchiveIcon weight={isActive('/archiveDashboard') ? 'fill' : 'regular'}/>} 
            active={isActive('/archiveDashboard')}
            onPress={() => router.push('/archiveDashboard')} 
          />

        </View>
       
      </DrawerContentScrollView>

    </View>
  );
}
