const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const user = await User.create({
      name, email, password: hashedPassword, role, otp,
      otpExpires: Date.now() + 10 * 60 * 1000 // 10 mins
    });

    await sendEmail({
      email: user.email,
      subject: 'Verify your PrepConnect Account',
      message: `Your OTP is: ${otp}`
    });

    res.status(201).json({ message: 'OTP sent to email' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email, otp, otpExpires: { $gt: Date.now() } });
    if (!user) return res.status(400).json({ message: 'Invalid or expired OTP' });

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Account verified successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      if (!user.isVerified) return res.status(401).json({ message: 'Please verify your email first' });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
      res.json({ _id: user._id, name: user.name, role: user.role, token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};