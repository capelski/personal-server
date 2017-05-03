var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');

router.get('/', function (req, res, next) {
  res.render('users-template-index');
});

var authenticationHandler = passport.createStrategy('users-template', 'users-template', OWN_VALIDATION_METHOD, OWN_RETRIVING_METHOD);
router.post('/log-in', authenticationHandler);

module.exports = router;

//TEMP Methods -> REMOVE

var users = [{
	id: 1,
	username: 'Cookieman',
	password: 'unhashed'
}, {
	id: 2,
	username: 'fucker.boy',
	password: 'silly1'
}];

function OWN_RETRIVING_METHOD(userId) {
	var user = users.find(user => user.id === parseInt(userId));
	return Promise.resolve(user);
}

function OWN_VALIDATION_METHOD(username, password) {
	var user = users.find(user => user.username === username && user.password === password);
	return Promise.resolve(user);
}