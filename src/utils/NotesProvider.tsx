import { Note } from '@/src/types/types';
import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react';



// 2. Define the Context Context Shape
interface NotesContextType {
  notes: Note[];
  addNote: (note: Omit<Note, 'id' | 'updatedAt'>) => void;
  deleteNote: (id: string) => void;
  updateNote: (id: string, updates: Partial<Omit<Note, 'id' | 'updatedAt'>>) => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

// 3. The Provider
export const NotesProvider = ({ children }: { children: ReactNode }) => {
  // Initialize state with your dummy data
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "Daily Journal",
      noteBrief: "Reflected on today’s accomplishments and lessons.",
      folder: "Personal",
      updatedAt: new Date("2026-01-18T23:21:40.000Z")
    },
    {
      id: "2",
      title: "Grocery List",
      noteBrief: "Bread, apples, and chicken for dinner.",
      folder: "Personal",
      updatedAt: new Date("2026-01-18T18:42:00.000Z")
    },
    {
      id: "3",
      title: "Workout Plan",
      noteBrief: "Leg day exercises: squats and lunges.",
      folder: "Fitness",
      updatedAt: new Date("2026-01-13T15:30:00.000Z")
    },
    {
      id: "4",
      title: "Read Later",
      noteBrief: "Saved interesting Medium articles for reading.",
      folder: "Reading",
      updatedAt: new Date("2025-12-29T20:12:00.000Z")
    },
    {
      id: "5",
      title: "Travel Checklist",
      noteBrief: "Confirm hotels and print copies of reservations.",
      folder: "Travel",
      updatedAt: new Date("2025-12-28T09:50:00.000Z")
    },
    {
      id: "6",
      title: "Book Quotes",
      noteBrief: "'It does not do to dwell on dreams and forget to live.'",
      folder: "Quotes",
      updatedAt: new Date("2025-12-28T09:50:00.000Z")
    },
    {
      id: "7",
      title: "Project Ideas",
      noteBrief: "Brainstormed new app for habit tracking.",
      folder: "Work",
      updatedAt: new Date("2024-06-19T11:25:00.000Z")
    },
    {
      id: "8",
      title: "Meeting Notes",
      noteBrief: "Discussed product launch and deadlines.",
      folder: "Work",
      updatedAt: new Date("2024-03-29T17:05:00.000Z")
    },
    {
      id: "9",
      title: "Old Invoice",
      noteBrief: "Check payment status for April invoice.",
      folder: "Finance",
      updatedAt: new Date("2024-05-05T16:08:00.000Z")
    },
    {
      id: "10",
      title: "Recipe Ideas",
      noteBrief: "Try making homemade pasta this weekend.",
      folder: "Cooking",
      updatedAt: new Date("2024-04-14T07:53:00.000Z")
    },
  ]);

  // ACTION: Add Note
  const addNote = (newNoteData: Omit<Note, 'id' | 'updatedAt'>) => {
    const newNote: Note = {
      id: Date.now().toString(), // Simple ID generation
      ...newNoteData,
      updatedAt: new Date(),
    };
    // Prepend to top of list
    setNotes((prev) => [newNote, ...prev]);
  };

  // ACTION: Delete Note
  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  // ACTION: Update Note
  const updateNote = (id: string, updates: Partial<Omit<Note, 'id' | 'updatedAt'>>) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, ...updates, updatedAt: new Date() } : n
      )
    );
  };

  const value = useMemo(() => ({
    notes,
    addNote,
    deleteNote,
    updateNote
  }), [notes]);

  return (
    <NotesContext.Provider value={value}>
      {children}
    </NotesContext.Provider>
  );
};

// 4. Custom Hook
export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};

export default NotesProvider
