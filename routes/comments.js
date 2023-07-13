var express = require('express');
var router = express.Router();
const commentsCtrl = require('../controllers/comments');
const ensureLoggedIn = require('../config/ensureLoggedIn');

//POST /posts/:id/comments - create comment for post
router.post('/posts/:id/comments', ensureLoggedIn, commentsCtrl.create)
//DELETE /reviews
router.delete('/reviews/:id', ensureLoggedIn, commentsCtrl.delete)

module.exports = router;