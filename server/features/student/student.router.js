import { Router } from 'express';
import { verifyToken, authorizeRoles } from '../../middleware/auth.middleware.js';
import { createStudent } from './student.controller.js';

const router = Router();

// Only Super, Admin, or Desk can create students
router.post('/create', verifyToken, authorizeRoles('super', 'admin', 'desk'), createStudent);

export default router;