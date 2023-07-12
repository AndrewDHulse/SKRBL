const Post = require('../models/post');
const Prompt = require('../models/prompt');

module.exports = {
    index,
    show,
    new: newPost,
    create,
    delete: deletePost
};

//store random prompt
let randomPrompt = null;

async function index(req, res){
    const posts = await Post.find({});
    res.render('posts/index', {posts});
};

async function show(req, res) {
    const post = await Post.findById(req.params.id);
    res.render('posts/show', {title: 'Post View', post,});
};

async function newPost(req, res){
    try{
        //ensures randomPrompt is empty first
        if (!randomPrompt){
            //grab a semi random prompt, limited to 1 
            randomPrompt = await Prompt.aggregate([{ $sample: {size: 1} }]);
        }
        const promptTitle = randomPrompt[0].title;
        const promptContent = randomPrompt[0].content;

        res.render('posts/new', {promptTitle, promptContent});
    } catch(err) {
        console.log(err);
        res.render('posts/new', {errorMsg: err.message});
    }

};

async function create(req, res){
    try{
        //ensures randomPrompt is empty first
        if (!randomPrompt){
            //grab a semi random prompt, limited to 1 
            randomPrompt = await Prompt.aggregate([{ $sample: {size: 1} }]);
        }
        const promptTitle = randomPrompt[0].title;
        const promptContent = randomPrompt[0].content;

        const post ={...req.body, promptTitle, promptContent};
        await Post.create(post);
        res.redirect('/posts');
    } catch (err){
        console.log(err);
        res.render('posts/new', {errorMsg: err.message});
    }
}

async function deletePost(req, res){
    Post.deleteOne(req.params.id);
    res.redirect('/posts');
}