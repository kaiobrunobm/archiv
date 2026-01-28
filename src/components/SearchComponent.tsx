import { Keyboard, Text, TouchableWithoutFeedback, View } from "react-native"
import Animated from "react-native-reanimated"
import { IconButton } from "@/src/components/IconButton"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { LinearGradient } from "expo-linear-gradient"
import Input from "@/src/components/Input"
import { useEffect, useState } from "react"
import { interpolate, useAnimatedKeyboard, useAnimatedStyle, useSharedValue, withTiming, Easing } from "react-native-reanimated"
import { useRouter } from "expo-router"
import { FolderIcon, MagnifyingGlassIcon, NoteIcon, PlusIcon } from "phosphor-react-native"
import { useSearch } from "@/src/context/SearchContext"


export function SearchComponent() {
  const { searchValue, setSearchValue } = useSearch();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false)

  const isFloatButtonOpen = useSharedValue(0);
  const route = useRouter();

  const keyboard = useAnimatedKeyboard();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const toggleMenu = () => {
    const target = isFloatButtonOpen.value === 0 ? 1 : 0;

    const config = {
      duration: 200,
      easing: Easing.out(Easing.quad),
    };

    isFloatButtonOpen.value = withTiming(target, config);
    setMenuOpen(!menuOpen)
  };


  const fabIconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${interpolate(isFloatButtonOpen.value, [0, 1], [0, 45])}deg` },
      ],
    };
  });

  const backdropStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(isFloatButtonOpen.value, [0, 1], [0, 0.3]),
    };
  });

  const menuItemStyle = (delay: number) =>
    useAnimatedStyle(() => {
      const opacity = interpolate(isFloatButtonOpen.value, [0, 1], [0, 1]);
      const translateY = interpolate(isFloatButtonOpen.value, [0, 1], [15, 0]);

      return {
        opacity,
        transform: [{ translateY }],
      };
    });

  const translateStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -keyboard.height.value + 20 }],
    };
  });

  const newNoteStyle = menuItemStyle(1);
  const newFolderStyle = menuItemStyle(0);
  const insets = useSafeAreaInsets();

  return (
    <>
      <TouchableWithoutFeedback
        disabled={!menuOpen}
        onPress={toggleMenu}>
        <Animated.View
          pointerEvents={menuOpen ? "auto" : "none"}
          style={[
            {
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "#050A10",
              zIndex: 50,
            },
            backdropStyle,
          ]}
        />
      </TouchableWithoutFeedback>

      <Animated.View
        className="absolute bottom-0 left-0 right-0 z-50"
        style={[{ paddingBottom: !isKeyboardVisible ? insets.bottom : 0 }, translateStyle]}>

        <LinearGradient
          colors={["transparent", "rgba(255,255,255,0)", "rgba(5,10,16,0.3)"]}
          locations={[0, 0.6, 1]}
          className="absolute left-0 right-0 bottom-0 h-48"
          pointerEvents="none"
        />

        <View className="absolute right-[24px] bottom-32 items-end gap-8 pointer-events-box-none" style={{ paddingBottom: insets.bottom }}>

          <Animated.View
            style={[
              newNoteStyle,
              { flexDirection: "row", alignItems: "center" },
            ]}
          >
            <View className="mr-4 bg-light rounded-2xl px-5 py-2">
              <Text className="font-poppins-semibold text-dark">
                New Note
              </Text>
            </View>
            <IconButton
              variant="elevated"
              className="p-7"
              onPress={() => {
                toggleMenu();
                route.push('/textEditor')
              }}
            >
              <NoteIcon size={24} color="#FF7043" />
            </IconButton>
          </Animated.View>

          <Animated.View
            style={[
              newFolderStyle,
              { flexDirection: "row", alignItems: "center" },
            ]}
          >
            <View className="mr-4 bg-light rounded-2xl px-5 py-2">
              <Text className="font-poppins-semibold text-dark">
                New Folder
              </Text>
            </View>
            <IconButton variant="elevated" className="p-7"
              onPress={() => {
                toggleMenu();
              }}>
              <FolderIcon size={24} color="#FF7043" />
            </IconButton>
          </Animated.View>
        </View>

        <View className="px-5 pt-4 pb-8 flex-row items-center gap-4">

          <View className="flex-1">
            <Input
              type="search"
              LeftIcon={MagnifyingGlassIcon}
              value={searchValue}
              onChangeText={setSearchValue}
              placeholder="Search"
              className="rounded-full py-3 px-6 shadow-md"
            />
          </View>


          <IconButton
            onPress={toggleMenu}
            className="h-16 w-16 bg-brand rounded-full shadow-md   items-center justify-center"
          >
            <Animated.View style={fabIconStyle}>
              <PlusIcon size={32} color='#fff' weight="regular" />
            </Animated.View>
          </IconButton>
        </View>
      </Animated.View>
    </>
  )
};

