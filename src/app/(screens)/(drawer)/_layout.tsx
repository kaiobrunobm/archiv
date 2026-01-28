import CustomDrawerContent from '@/src/components/CustomDrawer';
import { DrawerHeader } from '@/src/components/DrawerHeader';
import { SearchProvider } from '@/src/context/SearchContext';
import { SearchComponent } from '@/src/components/SearchComponent';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View } from 'react-native';

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SearchProvider>
        <View className='flex-1'>
          <Drawer
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
              header: (props) => <DrawerHeader {...props} />,
              headerTransparent: false,
              headerStyle: { backgroundColor: 'transparent' },
              drawerStyle: {
                width: '85%',
              },
              swipeEdgeWidth: 100,
            }}
          >

            <Drawer.Screen name="mainDashboard" />
            <Drawer.Screen name="draft" />
            <Drawer.Screen name="trashDashboard" />
            <Drawer.Screen name="folderDashboard" />

          </Drawer>

          <SearchComponent />

        </View>
      </SearchProvider>
    </GestureHandlerRootView>
  );
}
