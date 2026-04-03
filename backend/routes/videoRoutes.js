const express = require('express');
const router = express.Router();
const { uploadVideo, getAllVideos } = require('../controllers/videoController');
const { protect } = require('../middleware/authMiddleware');

// Get all videos (Home Feed)
router.get('/', protect, getAllVideos);

// Upload a new video
router.post('/upload', protect, uploadVideo);

module.exports = router;