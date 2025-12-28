import express from 'express';
import userRouter from './features/user/user.router.js'
import studentRouter from './features/student/student.router.js';

const router = express.Router();


router.use('/users', userRouter);
router.use('/students', studentRouter);


export default router;