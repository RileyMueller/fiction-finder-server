const mongoose = require('mongoose')

const FictionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        embedding_name: {
            type: String,
            required: true
        },
        embedding_version: {
            type: Number,
            required: true
        },
        n_sample_tokens: {
            type: Number,
            required: true
        },
        embedding: {
            type: String,
            required: true
        }
    }
);

const Fiction = mongoose.model('Fiction', FictionSchema);

module.exports = {Fiction}