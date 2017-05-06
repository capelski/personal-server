var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');
var authenticationHandler = passport.createStrategy('users-template', userAuthenticator, userRetriever, successfulAuthentication);

router.get('/', function (req, res, next) {
	res.render('users-template-index', {
		user: req.user
	});
});

router.get('/secured', function (req, res, next) {
	var view = req.user ?
		'users-template-secured' : 'users-template-unauthorized';

	res.render(view, {
		user: req.user
	});
});

router.get('/restricted', function (req, res, next) {
	var view = req.user && req.user.permissions.indexOf('view-restricted') > -1 ?
		'users-template-restricted' : 'users-template-unauthorized';

	res.render(view, {
		user: req.user
	});
});

router.post('/log-in', authenticationHandler);

module.exports = router;

var users = [{
	id: 1,
	username: 'Cookieman',
	password: 'unhashed',
	permissions: ['view', 'view-restricted']
}, {
	id: 2,
	username: 'fucker.boy',
	password: 'silly1',
	permissions: ['view']
}];

function successfulAuthentication(req, res, next) {
	return res.json({
		message: 'Successfully authenticated',
		username: req.user.username
	});
}

function userRetriever(userId) {
	var user = users.find(user => user.id === parseInt(userId));
	return Promise.resolve(user);
}

function userAuthenticator(username, password) {
	var user = users.find(user => user.username === username && user.password === password);
	return Promise.resolve(user);
}