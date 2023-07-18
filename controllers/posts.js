const Post = require('../models/post');
const Prompt = require('../models/prompt');
const User = require('../models/user');
let randomPrompt = null;

module.exports = {
    index,
    show,
    new: newPost,
    create,
    edit,
    delete: deletePost,
    update,
};


async function index(req, res){
    try{
    const posts = await Post.find({})
    .populate('user')
    .populate('prompt');
    res.render('posts/index', {posts, user: req.user});
    } catch (err) {
        console.log(err)
        res.render('/posts')
    }
};


async function show(req, res) {
    try{
    const post = await Post.findById(req.params.id)
    .populate({
        path: 'user',
        select: 'name avatar'
    })
    .populate('prompt')
    .exec();
    res.render('posts/show', { 
        title: 'Post View', 
        post, 
        comment: {}, 
        user: req.user, 
   });
    } catch (err) {
        console.log(err);
        res.render('/posts')
    }
}


async function newPost(req, res){
    try{
        if (!randomPrompt){
            randomPrompt = await Prompt.aggregate([{ $sample: {size: 1} }]);
        }
        const prompt = randomPrompt[0];
        randomPrompt= null;
        res.render('posts/new', {prompt, promptTitle: prompt.title, promptContent: prompt.content});
    } catch(err) {
        console.log(err);
        res.render('posts/new', {errorMsg: err.message});
    }
};

async function create(req, res){
    try{
        if (!randomPrompt){
            randomPrompt = await Prompt.aggregate([{ $sample: {size: 1} }]);
        }
        const promptTitle = randomPrompt[0].title;
        const promptContent = randomPrompt[0].content;
        const prompt= randomPrompt[0]._id;
       
        const post = await Post.create({
            ...req.body,
            user: req.user._id
        });
       
        const user = await User.findById(req.user._id);
        user.posts.push(post);
        await user.save();
       
        await Post.create(post);
        res.redirect('/posts');
    } catch (err){
        console.log(err);
        res.render('posts/new', {errorMsg: err.message});
    }
}

async function update(req, res){
    try{
        await Post.updateOne({_id: req.params.id}, req.body);
        res.redirect(`/posts/${req.params.id}`);
    }catch (err){
        console.log(err);
        res.redirect('/posts')
    }
}

async function edit(req, res){
    try{
        const post = await Post.findById(req.params.id)
        .populate('prompt')
        .populate('user');
        const prompt= post.prompt;
        res.render('posts/edit', {post, prompt});
    } catch (err){
        console.log(err);
        res.redirect('/posts')
    }
}

async function deletePost(req, res){
    try{
    await Post.deleteOne({_id: req.params.id});
    res.redirect('/posts');
    }catch (err){
        console.log(err);
        res.redirect('/posts')
    }
}
