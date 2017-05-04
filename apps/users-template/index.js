var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');

router.get('/', function (req, res, next) {
	res.render('users-template-index', {
		user: req.user
	});
});

var authenticationHandler = passport.createStrategy('users-template', userAuthenticator, userRetriever);
router.post('/log-in', authenticationHandler);

module.exports = router;

var users = [{
	id: 1,
	username: 'Cookieman',
	password: 'unhashed'
}, {
	id: 2,
	username: 'fucker.boy',
	password: 'silly1'
}];

function userRetriever(userId) {
	var user = users.find(user => user.id === parseInt(userId));
	return Promise.resolve(user);
}

function userAuthenticator(username, password) {
	var user = users.find(user => user.username === username && user.password === password);
	return Promise.resolve(user);
}