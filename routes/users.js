var express = require('express');
var router = express.Router();
const passport = require('passport');

const usersCtrl = require('../controllers/users');
const ensureLoggedIn= require('../config/ensureLoggedIn');


//GET /users/:id/edit
router.get('/:id/edit', ensureLoggedIn, usersCtrl.edit);
//GET posts/:id
router.get('/:id', usersCtrl.show);
//PUT users/:id
router.put('/:id', ensureLoggedIn, usersCtrl.update)

module.exports = router;
