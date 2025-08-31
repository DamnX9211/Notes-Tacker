import { Router } from 'express';
import { getNotes, createNote, deleteNote } from '../controllers/notesController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// All note routes require authentication
router.use(authenticateToken);

router.get('/', getNotes);
router.post('/', createNote);
router.delete('/:id', deleteNote);

export default router;