const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Doubt = require('../models/Doubt');
const Answer = require('../models/Answer');

// ✅ REGISTER USER
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        
        // Create new user
        const newUser = new User({
            name,
            email,
            password, // Note: In production, hash password!
            role: role || 'student'
        });
        
        await newUser.save();
        res.status(201).json({ 
            message: 'Registration successful', 
            user: {
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        });
        
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ✅ LOGIN USER
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user by email and password
        const user = await User.findOne({ email, password });
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        
        // Return user data (without password)
        res.json({
            message: 'Login successful',
            user: {
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
        
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ✅ ADD NEW DOUBT
router.post('/addDoubt', async (req, res) => {
    try {
        const { title, description, postedBy, postedByName } = req.body;
        
        const newDoubt = new Doubt({
            title,
            description,
            postedBy,
            postedByName
        });
        
        await newDoubt.save();
        res.status(201).json({ 
            message: 'Doubt posted successfully', 
            doubt: newDoubt 
        });
        
    } catch (error) {
        console.error('Add doubt error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ✅ GET ALL DOUBTS WITH ANSWERS
router.get('/getDoubts', async (req, res) => {
    try {
        // Get all doubts
        const doubts = await Doubt.find().sort({ createdAt: -1 });
        
        // Get answers for each doubt
        const doubtsWithAnswers = [];
        
        for (const doubt of doubts) {
            const answers = await Answer.find({ doubtId: doubt._id });
            doubtsWithAnswers.push({
                ...doubt._doc,
                answers: answers
            });
        }
        
        res.json(doubtsWithAnswers);
        
    } catch (error) {
        console.error('Get doubts error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ✅ ADD ANSWER TO DOUBT
router.post('/addAnswer', async (req, res) => {
    try {
        const { doubtId, answer, answeredBy, answeredByName } = req.body;
        
        // Check if doubt exists
        const doubt = await Doubt.findById(doubtId);
        if (!doubt) {
            return res.status(404).json({ message: 'Doubt not found' });
        }
        
        const newAnswer = new Answer({
            doubtId,
            answer,
            answeredBy,
            answeredByName
        });
        
        await newAnswer.save();
        res.status(201).json({ 
            message: 'Answer posted successfully', 
            answer: newAnswer 
        });
        
    } catch (error) {
        console.error('Add answer error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;