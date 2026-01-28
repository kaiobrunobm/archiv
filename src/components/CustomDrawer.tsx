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
import { Button } from './Button';
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
          <MainLogo />
        </View>

        <Button
          variant='drawer'
          icon={HouseIcon}
          active={isActive('/mainDashboard')}
          onPress={() => router.push('/mainDashboard')}
        >Notes</Button>

        <View className="gap-2 mt-6">

          <Text className='font-poppins text-base text-lightSutle'>Folders</Text>

          <Button
            variant='drawer'
            icon={FolderIcon}
            active={isActive('/draft')}
            onPress={() => router.push('/draft')}
          >Draft</Button>

          <Button
            variant='ghost'
            icon={PlusIcon}
            onPress={() => sheetRef.current?.expand()}
          >
            Create new folder
          </Button>

        </View>

        <View className='w-full bg-border-light/40 h-[1px] rounded-full my-3' />
        <View>
          <Button
            icon={TrashIcon}
            variant='drawer'
            active={isActive('/trashDashboard')}
            onPress={() => router.push('/trashDashboard')}
          >Trash</Button>

          <Button
            variant='drawer'
            icon={ArchiveIcon}
            active={isActive('/archiveDashboard')}
            onPress={() => router.push('/archiveDashboard')}
          >Archive</Button>

        </View>

      </DrawerContentScrollView>

    </View>
  );
}
