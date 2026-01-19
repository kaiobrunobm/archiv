import { Note } from "@/src/types/types";
import { useNotes } from "@/src/utils/NotesProvider";
import { useMemo } from "react";

// 1. Change this to a function (Custom Hook)
export const useGroupedNotes = () => {
  // 2. Get the notes from context INSIDE the hook
  const { notes } = useNotes();

  // 3. Perform the calculation
  const groupedSections = useMemo(() => {
    const now = new Date();
    const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const today = startOfDay(now);
    
    // Calculate time thresholds
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    const sections = {
      today: [] as Note[],
      last7Days: [] as Note[],
      last30Days: [] as Note[],
      older: [] as Note[],
    };

    // Sort notes by date descending
    const sortedNotes = [...notes].sort((a, b) => {
        const dateA = new Date(a.updatedAt).getTime();
        const dateB = new Date(b.updatedAt).getTime();
        return dateB - dateA;
    });

    sortedNotes.forEach((note) => {
      // Ensure we are working with Date objects
      const noteDateObj = new Date(note.updatedAt);
      const noteDate = startOfDay(noteDateObj);

      if (noteDate.getTime() === today.getTime()) {
        sections.today.push(note);
      } else if (noteDateObj > sevenDaysAgo) {
        sections.last7Days.push(note);
      } else if (noteDateObj > thirtyDaysAgo) {
        sections.last30Days.push(note);
      } else {
        sections.older.push(note);
      }
    });

    return [
      { title: "Today", data: sections.today },
      { title: "Last 7 Days", data: sections.last7Days },
      { title: "Last 30 Days", data: sections.last30Days },
      { title: "Older", data: sections.older },
    ].filter(section => section.data.length > 0);

  }, [notes]); // 4. Add 'notes' to the dependency array so it updates when notes change

  return groupedSections;
};
