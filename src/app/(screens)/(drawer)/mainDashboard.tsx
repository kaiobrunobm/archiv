import {
  Keyboard,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View
} from "react-native";


import { useGroupedNotes } from "@/src/components/GroupedNotes";
import NoteContainer from "@/src/components/NoteContainer";
import { Note } from "@/src/types/types";
import { useNotes } from "@/src/utils/NotesProvider";
import getNoteVariant from "@/src/utils/getNoteVariant";
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export default function DashboardScreen() {

  const groupedNotes = useGroupedNotes();
  const { deleteNote, notes } = useNotes();
  const insets = useSafeAreaInsets();

  return (
    <TouchableWithoutFeedback className="flex-1 bg-light" onPress={Keyboard.dismiss}>
      <View className="h-full" >
        <ScrollView
          contentContainerStyle={{ paddingBottom: 50 + insets.bottom }}
          showsVerticalScrollIndicator={false}
        >
          <View className="px-5 pt-2 mb-4 mt-4">

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
                        timestamp={note.updatedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
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
      </View>

    </TouchableWithoutFeedback>

  );
}
