import { Request, Response } from 'express';
import { Note } from '../models/Note';
import { CreateNoteRequest } from '../types';

export const getNotes = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    
    const notes = await Note.find({ userId })
      .sort({ createdAt: -1 })
      .select('title content createdAt updatedAt');

    res.json({ notes });
  } catch (error: any) {
    console.error('Get notes error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createNote = async (req: Request<{}, {}, CreateNoteRequest>, res: Response): Promise<void> => {
  try {
    const { title, content } = req.body;
    const userId = (req as any).user?.id;

    // Validation
    if (!title || !content) {
      res.status(400).json({ error: 'Title and content are required' });
      return;
    }

    if (title.length > 100) {
      res.status(400).json({ error: 'Title must be less than 100 characters' });
      return;
    }

    if (content.length > 1000) {
      res.status(400).json({ error: 'Content must be less than 1000 characters' });
      return;
    }

    // Create note
    const note = new Note({
      title,
      content,
      userId
    });

    await note.save();

    res.status(201).json({
      message: 'Note created successfully',
      note: {
        id: note._id,
        title: note.title,
        content: note.content,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt
      }
    });
  } catch (error: any) {
    console.error('Create note error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = (req as any).user?.id;

    const note = await Note.findOne({ _id: id, userId });
    if (!note) {
      res.status(404).json({ error: 'Note not found' });
      return;
    }

    await Note.findByIdAndDelete(id);

    res.json({ message: 'Note deleted successfully' });
  } catch (error: any) {
    console.error('Delete note error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};