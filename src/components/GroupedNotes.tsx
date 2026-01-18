import { Note } from "@/src/types/types";
import { useMemo } from "react";
import { dummyNotes } from "../utils/dummyData";

export const groupedNotes = useMemo(() => {
    const now = new Date();
    const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const today = startOfDay(now);
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    const sections = {
      today: [] as Note[],
      last7Days: [] as Note[],
      last30Days: [] as Note[],
      older: [] as Note[],
    };

    // Sort notes by date descending (newest first)
    const sortedNotes = [...dummyNotes].sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());

    sortedNotes.forEach((note) => {
      const noteDate = startOfDay(note.updatedAt);

      if (noteDate.getTime() === today.getTime()) {
        sections.today.push(note);
      } else if (noteDate > sevenDaysAgo) {
        sections.last7Days.push(note);
      } else if (noteDate > thirtyDaysAgo) {
        sections.last30Days.push(note);
      } else {
        sections.older.push(note);
      }
    });

    // Return as an array of sections for easy mapping
    return [
      { title: "Today", data: sections.today },
      { title: "Last 7 Days", data: sections.last7Days },
      { title: "Last 30 Days", data: sections.last30Days },
      { title: "Older", data: sections.older },
    ].filter(section => section.data.length > 0); // Only return sections that have notes
  }, []);
