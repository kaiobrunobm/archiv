import { View } from "react-native"
import { ScaleButton } from "./ScaleButton"
import { Image } from "react-native"
import { IconButton } from "./IconButton"
import { DotsThreeIcon } from "phosphor-react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { DrawerHeaderProps } from "@react-navigation/drawer"

export function DrawerHeader({ navigation }: DrawerHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-row justify-between items-center px-5" style={{ paddingTop: insets.top + 24 }}>
      <IconButton variant="elevated" className="p-8" onPress={() => navigation.toggleDrawer()}>
        <DotsThreeIcon size={28} color="#606062" weight="bold" />
      </IconButton>

      <ScaleButton className="h-16 w-16 rounded-full p-0.5 overflow-hidden border-2 border-brand ">
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
          }}
          className="h-full w-full rounded-full"
        />
      </ScaleButton>
    </View>
  )
};
