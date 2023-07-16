var express = require('express');
var router = express.Router();
const passport = require('passport');
const postsCtrl = require('../controllers/posts');
const ensureLoggedIn= require('../config/ensureLoggedIn');

//GET /posts
router.get('/', postsCtrl.index)
//GET posts/new
router.get('/new', ensureLoggedIn, postsCtrl.new);
//GET /posts/:id/edit
router.get('/:id/edit', ensureLoggedIn, postsCtrl.edit);
//GET posts/:id
router.get('/:id', postsCtrl.show);
//POST /posts
router.post('/', ensureLoggedIn, postsCtrl.create);
//DELETE /posts
router.delete('/:id', ensureLoggedIn, postsCtrl.delete);
//PUT /posts/:id
router.put('/:id',ensureLoggedIn, postsCtrl.update)

module.exports = router;