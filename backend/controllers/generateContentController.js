import axios from 'axios'

const LLAMA_API_KEY = process.env.LLAMA_API_KEY;
const LLAMA_API_URL = 'https://api.llama.com/generate';

const generateChapters = async (req, res) => {
  const { language } = req.body;
  if (!language) {
    return res.status(400).json({ error: 'Language is required' });
  }
  
  try {
    const chapters = [];
    for (let i = 0; i < 10; i++) {
      const chapterResponse = await axios.post(
        LLAMA_API_URL,
        {
          prompt: `Generate a chapter for learning ${language} at level ${i + 1}`,
          max_tokens: 1500, // Adjust token count as needed
        },
        {
          headers: { Authorization: `Bearer ${LLAMA_API_KEY}` },
        }
      );
      const chapterContent = chapterResponse.data.text;

      const questionsResponse = await axios.post(
        LLAMA_API_URL,
        {
          prompt: `Generate 5-10 questions based on the following content:\n\n${chapterContent}`,
          max_tokens: 500, // Adjust token count as needed
        },
        {
          headers: { Authorization: `Bearer ${LLAMA_API_KEY}` },
        }
      );
      const questions = questionsResponse.data.text.split('\n');

      chapters.push({
        content: chapterContent,
        questions: questions,
      });
    }
    res.json({ chapters });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate chapters' });
  }
};

module.exports = {
  generateChapters,
};
