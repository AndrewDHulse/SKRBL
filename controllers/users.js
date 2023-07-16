const User = require ('../models/user.js');

async function  show (req,res){
    try{
      const user = await User.findById(req.user._id);
      
      res.render('users/show', {user});
    } catch (err){
        console.log(err)
        res.render('/posts')
    }
}

async function edit(req, res){
    try{
        const user = await User.findById(req.user._id);
        res.render('users/edit', {user})
    } catch (err){
        console.log(err);
        res.redirect('users/show')
    }
}

async function update(req, res){
    try{
        const {name, avatar} = req.body;
        await User.updateOne({_id: req.user._id}, {name, avatar});
        res.redirect('/users/show');
    }catch (err) {
        console.log(err);
        res.redirect('users/show');
    }
}


module.exports = {
    show,
    edit,
    update
}