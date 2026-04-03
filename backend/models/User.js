const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Student', 'Alumni'], default: 'Student' },
  profilePic: { type: String, default: '' },
  phoneNumber: { type: String },
  bio: { type: String },
  isVerified: { type: Boolean, default: false },
  otp: String,
  otpExpires: Date
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     college: {
//         type: String,
//         default: ''
//     },
//     branch: {
//         type: String,
//         default: ''
//     },
//     year: {
//         type: String,
//         default: ''
//     },
//     role: {
//         type: String,
//         enum: ['student', 'alumni'],
//         default: 'student'
//     },
//     skills: [{
//         type: String
//     }],
//     profilePhoto: {
//         type: String,
//         default: ''
//     },
//     company: {
//         type: String,
//         default: ''
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// });

// // Create User model
// const User = mongoose.model('User', UserSchema);

// module.exports = User;