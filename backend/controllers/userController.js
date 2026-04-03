const User = require('../models/User');

exports.updateProfile = async (req, res) => {
  try {
    const { name, bio, phoneNumber, profilePic } = req.body;
    const user = await User.findById(req.user.id);

    if (user) {
      user.name = name || user.name;
      user.bio = bio || user.bio;
      user.phoneNumber = phoneNumber || user.phoneNumber;
      user.profilePic = profilePic || user.profilePic;

      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
};