const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
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
    userName: String,
    userAvatar: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', postSchema)