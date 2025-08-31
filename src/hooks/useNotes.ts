import { useState, useEffect } from 'react';
import { Note } from '../types/auth';
import { apiClient } from '../lib/api';
import toast from 'react-hot-toast';

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getNotes();
      
      // Transform MongoDB notes to match frontend interface
      const transformedNotes = response.notes.map((note: any) => ({
        id: note._id,
        title: note.title,
        content: note.content,
        created_at: note.createdAt,
        user_id: note.userId,
      }));
      
      setNotes(transformedNotes);
    } catch (error: any) {
      toast.error('Failed to fetch notes');
      console.error('Error fetching notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const createNote = async (title: string, content: string) => {
    try {
      const response = await apiClient.createNote(title, content);
      
      // Transform and add to state
      const newNote = {
        id: response.note.id,
        title: response.note.title,
        content: response.note.content,
        created_at: response.note.createdAt,
        user_id: response.note.userId,
      };
      
      setNotes(prev => [newNote, ...prev]);
      toast.success('Note created successfully');
      return newNote;
    } catch (error: any) {
      toast.error('Failed to create note');
      throw error;
    }
  };

  const deleteNote = async (id: string) => {
    try {
      await apiClient.deleteNote(id);
      setNotes(prev => prev.filter(note => note.id !== id));
      toast.success('Note deleted successfully');
    } catch (error: any) {
      toast.error('Failed to delete note');
      throw error;
    }
  };

  return {
    notes,
    loading,
    createNote,
    deleteNote,
    refetch: fetchNotes,
  };
}