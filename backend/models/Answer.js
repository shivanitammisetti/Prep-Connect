const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
    doubtId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doubt',
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    answeredBy: {
        type: String, // Store alumni email
        required: true
    },
    answeredByName: {
        type: String // Store alumni name
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Answer = mongoose.model('Answer', AnswerSchema);

module.exports = Answer;