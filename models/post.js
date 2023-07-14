const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: {
        type: String,
        required: true 
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
        userName: String,
}, {
    timestamps: true
});

const postSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    prompt:{
        type: Schema.Types.ObjectId,
        ref: 'Prompt',
        required: true
    },
    content:{
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comments: [commentSchema],
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', postSchema)