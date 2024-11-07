const express = require('express');
const { generateChapters } = require('../controllers/generateContentController');
const router = express.Router();

router.post('/generate_chapters', generateChapters);

module.exports = router;
