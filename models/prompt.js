const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const promptSchema = new Schema({
    title:{
        type: String,
        required: true,
        unique: true
    },
    content:{
       type: String,
       required: true 
    },
});

module.exports = mongoose.model('Prompt', promptSchema);