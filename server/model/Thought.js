
const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
    author : {
        type: String,
        required: true,
        max: 20,
        min: 3
    },
    message: {
        type: String,
        required: true,
        max: 370,
    },
    date : {
        type: String,
        default: Date.now
    }
})

module.exports = mongoose.model('Thought', thoughtSchema);