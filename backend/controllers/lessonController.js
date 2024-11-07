// controllers/lessonController.js
import Lesson from '../models/lessonModel.js';

const getAllLessons = async (req, res) => {
  const lessons = await Lesson.find({});
  res.status(200).json(lessons);
};

const addLesson = async (req, res) => {
  const { title, content, language, difficulty, points } = req.body;
  const lesson = await Lesson.create({ title, content, language, difficulty, points });
  res.status(201).json(lesson);
};

export { getAllLessons, addLesson };
