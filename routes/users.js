var express = require('express');
var router = express.Router();

const usersCtrl = require('../controllers/users');
const ensureLoggedIn= require('../config/ensureLoggedIn');


//GET /users/:id/edit
router.get('/users/:id/edit', ensureLoggedIn, usersCtrl.edit);
//GET posts/:id
router.get('/users/:id', usersCtrl.show);
//PUT users/:id
router.put('/users/:id', usersCtrl.update)

module.exports = router;
