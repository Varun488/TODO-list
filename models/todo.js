const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    Task: {
        type: String,
        required: true
    },
    Category: {
        type: String,
        required: true
    },
    Date: {
        type: Date,
        required: true
    },
    Done: {
        type: Boolean,
        default: false
    }
});

const TODO = mongoose.model('TODO', TaskSchema);
module.exports = TODO;