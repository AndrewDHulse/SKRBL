# SKRBL

SKRBL is a social media application in which users are given randomized prompts from a database and tasked with writing a creative piece of prose or poetry. Users may comment on posts, edit their own posts, or delete their own posts or comments, as with any social media application. 

Additionally, as a social media application, users have profiles in which they may add a brief bio. 

## Getting Started

Click the "Log in" hyperlink displayed in the top-right corner of the screen. To view a post in its entirety, click the "View Post" link. 

To comment, fill out the comment form.

To Post a SKRBL, click the notebook button promintently displayed on the lower portion of the screen.

##

## Technologies Used

<div style="display: flex; justify-content: center;">

<!-- mongodb -->
<img alt="MongoDB badge" src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white"> 

### MongoDB

Database Management is handled through MongoDB. Three schemas are used in the SKRBL application: Prompts, Posts, and Users, as well as an embedded comments model associated with the posts model. The relationships are as follow:

1 User: Many posts
1 Prompt: Many posts
1 Post: Many comments
1 User: Many comments

Additionally, Users and Posts share a denormalized bidirectional relationship. This relationship is established to allow for more efficient data querying, specifically for showing user data on profile pages. 

#### controllers/users.js

The code bellow illustrates that the number of posts rendered on the user profile page is limited to 5.

```

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

```

#### views/users/show.ejs

Additionally, this code demonstrates that the number of posts made by a user itself is displayed

```
           <div class="p-4 text-black" style="background-color: #f8f9fa;">
            <div class="d-flex justify-content-end text-center py-1">
              <div>
                <p class="mb-1 h5"><%= user.posts.length %></p>
                <p class="small text-muted mb-0">SKRBLs</p>
            </div>
            </div>
```

Had a bidirectional relationship not been established, there would be a necessary decision of rendering post snippets, or displaying the total number of posts, as .limit(5) would show that no more than 5 posts had been posted by the user, but by utilizing the flexibility of MongoDB, no compromises are necessary.

<!-- gimp -->
<img alt="" src="https://img.shields.io/badge/Gimp-657D8B?style=for-the-badge&logo=gimp&logoColor=FFFFFF">

### GIMP

The post button was created using GIMP, as a unique and stylzed button was necessary to create a cohesive aesthetic in the application. Loose, gestural strokes were used so as to match the name of "SKRBL".

<img alt="Gimp interface displaying sketch" src="/public/images/GIMP-display.png">


<!--Javascript-->
<img src= "https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E">

### JavaScript

JavaScript is prominently featured in this app, used synergistically with MongoDB and Mongoose. The following code effectively demonstrates this by way of utilizing Mongo's aggregate() function to serve a random prompt to the user, as well as ensure proper relationships are mantained.

#### controllers/posts.js

```
let randomPrompt = null;

//...//

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

```

<!--CSS-->
<img src= "https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white">

<!--express.js-->
<img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB">

<!--nodejs-->
<img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white">

<!--bootstrap-->
<img src="https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white">

</div>