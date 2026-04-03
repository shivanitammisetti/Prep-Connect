const Video = require('../models/Video'); // Create this model below

exports.uploadVideo = async (req, res) => {
  const { title, description, videoURL, category } = req.body;
  try {
    const video = await Video.create({
      title,
      description,
      videoURL,
      category,
      postedBy: req.user.id
    });
    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().populate('postedBy', 'name role profilePic');
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};