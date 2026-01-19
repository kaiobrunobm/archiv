import { LinearGradient } from "expo-linear-gradient";
import {
  DotsThreeIcon,
  FolderIcon,
  MagnifyingGlassIcon,
  NoteIcon,
  PlusIcon
} from "phosphor-react-native";
import React, { useState } from "react";
import {
  Image,
  Keyboard,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedKeyboard,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useGroupedNotes } from "@/src/components/GroupedNotes";
import { IconButton } from "@/src/components/IconButton";
import Input from "@/src/components/Input";
import NoteContainer from "@/src/components/NoteContainer";
import { Note } from "@/src/types/types";
import { useNotes } from "@/src/utils/NotesProvider";
import getNoteVariant from "@/src/utils/getNoteVariant";


export default function DashboardScreen() {
  const [searchValue, setSearchValue] = useState('')
	const isOpen = useSharedValue(0);
  const keyboard = useAnimatedKeyboard();


	const toggleMenu = () => {
		const target = isOpen.value === 0 ? 1 : 0;

		const config = {
			duration: 200,
			easing: Easing.out(Easing.quad), 
		};

		isOpen.value = withTiming(target, config);
	};

	const fabIconStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{ rotate: `${interpolate(isOpen.value, [0, 1], [0, 45])}deg` },
			],
		};
	});	

	const backdropStyle = useAnimatedStyle(() => {
		return {
			opacity: interpolate(isOpen.value, [0, 1], [0, 0.3]),
			pointerEvents: isOpen.value > 0.1 ? "auto" : "none",
		};
	});

	const useMenuItemStyle = (index: number) => {
		return useAnimatedStyle(() => {

			const translateY = interpolate(isOpen.value, [0, 1], [15, 0]);

			const opacity = interpolate(isOpen.value, [0, 1], [0, 1]);

			return {
				opacity,
				transform: [{ translateY }],
				pointerEvents: isOpen.value > 0.8 ? "auto" : "none",
			};
		});
	};

  const translateStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -keyboard.height.value }],
    };
  });

	const newNoteStyle = useMenuItemStyle(1);
	const newFolderStyle = useMenuItemStyle(0);
  const groupedNotes = useGroupedNotes(); 
  const { deleteNote, notes } = useNotes();
  const insets = useSafeAreaInsets();

	return (
		<TouchableWithoutFeedback className="flex-1 bg-light" onPress={Keyboard.dismiss}>
			<View style={{ paddingTop: insets.top }}>
				<ScrollView
					contentContainerStyle={{ paddingBottom: 50 + insets.bottom}}
					showsVerticalScrollIndicator={false}
				>
					<View className="px-5 pt-2 mb-4 mt-4">

						<View className="flex-row justify-between items-center mb-6">
							<IconButton variant="elevated" className="p-8">
								<DotsThreeIcon size={28} color="#606062" weight="bold" />
							</IconButton>

							<View className="h-16 w-16 rounded-full p-0.5 overflow-hidden border-2 border-brand ">
								<Image
									source={{
										uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
									}}
									className="h-full w-full rounded-full"
								/>
							</View>

						</View>

						<Text className="text-3xl font-roboto-semibold text-dark">
							All Notes
						</Text>

						<Text className="text-subtle font-poppins text-base">{notes.length} Notes</Text>

					</View>
          
          {notes.length > 0 ? (
            <View className="pb-4">
              {groupedNotes.map((section) => (
                <View key={section.title} className="px-5 mb-6">
                  
                  {/* Section Header */}
                  <Text className="text-lg font-poppins-semibold text-dark mb-4">
                    {section.title}
                  </Text>

                  {/* Notes List */}
                  <View>
                    {section.data.map((note: Note, index: number) => (
                      <NoteContainer
                        key={note.id}
                        title={note.title}
                        excerpt={note.noteBrief}
                        folderName={note.folder}
                        // Simple date formatting
                        timestamp={note.updatedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        // LOGIC FOR VARIANTS
                        variant={getNoteVariant(index, section.data.length)}
                        onPress={() => console.log('Open note', note.id)}
                        onArchive={() => console.log('Archive', note.id)}
                        onDelete={() => console.log('Delete', note.id)}
                      />
                    ))}
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <View className="flex-1 items-center justify-center py-24">
              <Text className="text-xl text-gray-400 font-poppins-semibold mb-2">No notes yet</Text>
              <Text className="text-base text-gray-300">Create your first note to get started!</Text>
            </View>
          )}
				</ScrollView>

				<TouchableWithoutFeedback onPress={toggleMenu}>
					<Animated.View
						style={[
							{
								position: "absolute",
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
								backgroundColor: "#050A10",
								zIndex: 40,
							},
							backdropStyle,
						]}
					/>
				</TouchableWithoutFeedback>

				<Animated.View 
        className="absolute bottom-0 left-0 right-0 z-50" 
        style={[{paddingBottom: insets.bottom - 20}, translateStyle]}>

					<LinearGradient
						colors={["transparent", "rgba(255,255,255,0)", "rgba(5,10,16,0.3)"]}
						locations={[0, 0.6, 1]}
						className="absolute left-0 right-0 bottom-0 h-48"
						pointerEvents="none"
					/>

					<View className="absolute right-[24px] bottom-32 items-end gap-8 pointer-events-box-none" style={{paddingBottom: insets.bottom }}>

						<Animated.View
							style={[
								newNoteStyle,
								{ flexDirection: "row", alignItems: "center" },
							]}
						>
							<View  className="mr-4 bg-light rounded-2xl px-5 py-2">
								<Text className="font-poppins-semibold text-dark">
									New Note
								</Text>
							</View>
							<IconButton variant="elevated" className="p-7">
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
							<IconButton variant="elevated" className="p-7">
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
			</View>
		</TouchableWithoutFeedback>
	);
}
