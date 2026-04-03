const express = require('express');
const router = express.Router();
const { createDoubt, answerDoubt } = require('../controllers/doubtController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createDoubt);
router.post('/:id/answer', protect, answerDoubt); // :id is the Doubt ID

module.exports = router;