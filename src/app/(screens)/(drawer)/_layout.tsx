import CustomDrawerContent from '@/src/components/CustomDrawer';
import { DrawerHeader } from '@/src/components/DrawerHeader';
import { useRoute } from '@react-navigation/native';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function DrawerLayout() {
  const navigation = useRoute();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
    </GestureHandlerRootView>
  );
}
