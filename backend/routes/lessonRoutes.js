import express from 'express';
import { createLessons, getLessonsByTopic } from '../controllers/lessonController.js';
import { authenticate } from '../middleware/authMidleware.js';

const router = express.Router();

// Route to generate lessons (protected)
router.post('/generate', authenticate, createLessons);

// Route to fetch lessons by topic (public or protected based on your needs)
router.get('/:topic', authenticate, getLessonsByTopic);

export default router;
