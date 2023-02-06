const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    isbn : {
        type: Number,
        required: true,
    },
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    }

}, {
    timestamp: true
})

module.exports = mongoose.model('Book', bookSchema)