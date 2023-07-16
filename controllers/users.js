const User = require ('../models/user');
const Post =require ('../models/post')

async function  show (req,res){
    try{
        const userId=req.params.id;
        const user = await User.findById(userId)
        .populate('posts');
        const posts = await Post.find({ user: userId }).sort({ createdAt: -1 }).limit(5);
        res.render('users/show', {user, posts});
    } catch (err){
        console.log(err)
        res.redirect('/posts')
    }
}

async function edit(req, res){
    try{
        const user = await User.findById(req.user._id);
        res.render('users/edit', {user})
    } catch (err){
        console.log(err);
        res.redirect('/users/show')
    }
}

async function update(req, res){
    try{
        const {name, avatar, bio} = req.body;
        const userId=req.params.id;
        await User.updateOne({_id: userId}, {name, avatar, bio});
        res.redirect('/users/show');
    }catch (err) {
        console.log(err);
        res.redirect('/users/show');
    }
}


module.exports = {
    show,
    edit,
    update
}