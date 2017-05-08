var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');
var templateController = require('./controllers/template-controller');
var authenticationHandler = passport.createStrategy('users-template', userAuthenticator, userRetriever, successfulAuthentication);

router.get('/', templateController.index);

router.get('/secured', templateController.secured);

router.get('/restricted', templateController.restricted);

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