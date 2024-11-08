import express from 'express';
import Lesson from '../model/lessonModel.js'; // Import the Lesson model
import { createLessons, getLessonsByTopic } from '../controllers/lessonController.js';
import { authenticate } from '../middleware/authMidleware.js';

const router = express.Router();

// Route to generate lessons (protected)
router.post('/generate', authenticate, createLessons);

// Endpoint to get lessons by topic and level
router.get('/:topic/:level', async (req, res) => {
  try {
    const { topic, level } = req.params;
    const lessons = await Lesson.find({ topic, level });
    res.json(lessons);
  } catch (error) {
    console.error('Error retrieving lessons:', error); // Log error details
    res.status(500).json({ message: 'Error retrieving lessons' });
  }
});

export default router;