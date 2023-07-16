var express = require('express');
var router = express.Router();
const commentsCtrl = require('../controllers/comments');
const ensureLoggedIn = require('../config/ensureLoggedIn');
const passport = require('passport');
//POST /posts/:id/comments - create comment for post
router.post('/posts/:id/comments', ensureLoggedIn, commentsCtrl.create)
//DELETE /reviews
router.delete('/comments/:id', ensureLoggedIn, commentsCtrl.delete)

module.exports = router;