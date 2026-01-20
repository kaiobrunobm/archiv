import CustomDrawerContent from '@/src/components/CustomDrawer';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function DrawerLayout() {
  return (
  <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
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
