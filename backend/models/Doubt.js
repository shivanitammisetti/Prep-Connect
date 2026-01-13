const mongoose = require('mongoose');

const DoubtSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    postedBy: {
        type: String, // Store user email
        required: true
    },
    postedByName: {
        type: String // Store user name
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Doubt = mongoose.model('Doubt', DoubtSchema);

module.exports = Doubt;