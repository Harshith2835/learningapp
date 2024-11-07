// models/lessonModel.js
import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  language: { type: String, required: true },
  difficulty: { type: String, required: true },  // E.g., beginner, intermediate, advanced
  points: { type: Number, required: true },  // Points awarded for completing the lesson
}, {
  timestamps: true,
});

export default mongoose.model('Lesson', lessonSchema);
