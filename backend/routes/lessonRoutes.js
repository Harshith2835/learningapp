// routes/lessonRoutes.js
import express from 'express';
import { getAllLessons, addLesson } from '../controllers/lessonController.js';

const router = express.Router();
router.route('/').get(getAllLessons).post(addLesson);

export default router;
