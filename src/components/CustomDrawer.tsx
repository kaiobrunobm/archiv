// src/components/CustomDrawerContent.tsx
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { usePathname, useRouter } from 'expo-router';
import {
  ArchiveIcon,
  FolderIcon,
  HouseIcon,
  PlusIcon,
  TrashIcon
} from 'phosphor-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from './Button';
import MainLogo from './MainLogo';

export default function CustomDrawerContent(props: any) {
  const router = useRouter();
  const pathname = usePathname();
  const { top } = useSafeAreaInsets();

  const isActive = (path: string) => pathname === path;

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

function DrawerButton({ 
  label, 
  icon: Icon, 
  active, 
  onPress,
  isDestructive = false
}: { 
  label: string; 
  icon: any; 
  active?: boolean; 
  onPress: () => void;
  isDestructive?: boolean;
}) {
  return (
    <TouchableOpacity 
      onPress={onPress}
      className={`flex-row items-center p-3.5 rounded-xl mb-1 ${
        active ? 'bg-brand/10' : 'active:bg-gray-50'
      }`}
    >
      <Icon 
        size={22} 
        color={isDestructive ? '#EF4444' : (active ? '#6D28D9' : '#6B7280')} // Adjust #6D28D9 to your 'brand' color
        weight={active ? 'fill' : 'regular'}
      />
      <Text className={`ml-3 font-poppins-medium text-base ${
        isDestructive ? 'text-red-500' : (active ? 'text-brand' : 'text-gray-600')
      }`}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
