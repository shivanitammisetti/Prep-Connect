const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  videoURL: { type: String, required: true },
  category: { type: String }, // e.g., 'DSA', 'Interview Tips'
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: String,
    createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Video', videoSchema);

// const mongoose = require('mongoose');

// const VideoSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     company: {
//         type: String,
//         required: true
//     },
//     url: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String,
//         default: ''
//     },
//     duration: {
//         type: String,
//         default: '0:00'
//     },
//     uploadedBy: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User'
//     },
//     views: {
//         type: Number,
//         default: 0
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// });

// module.exports = mongoose.model('Video', VideoSchema);
