const Doubt = require('../models/Doubt');
const Video = require('../models/Video');

exports.getHomeFeed = async (req, res) => {
  try {
    const doubts = await Doubt.find().populate('student', 'name profilePic').limit(10);
    const videos = await Video.find().populate('postedBy', 'name profilePic').limit(10);
    
    // Combine and sort by date
    const feed = [...doubts, ...videos].sort((a, b) => b.createdAt - a.createdAt);
    res.json(feed);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};