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
