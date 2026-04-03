const express = require('express');
const router = express.Router();
const { updateProfile, getUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateProfile);

module.exports = router;