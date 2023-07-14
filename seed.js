require('dotenv').config();
require('./config/database');

const Prompt = require('./models/prompt');
const Post = require ('./models/post');
const data = require('./data');

(async function() {
    const p1 = Post.deleteMany({});
    const p2 = Prompt.deleteMany({});
    let results= await Promise.all([p1, p2]);
    console.log(results);

    results = await Promise.all([
        Prompt.create(data.prompts),
]);
console.log('created prompts:', results[0]);

process.exit();
})();