const Video = require('../models/Video');

exports.addComment = async (req, res) => {
  const { text } = req.body;
  const { videoId } = req.params;

  try {
    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    const newComment = {
      user: req.user.id,
      text,
      createdAt: new Date()
    };

    video.comments.push(newComment);
    await video.save();

    res.status(201).json(video.comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};