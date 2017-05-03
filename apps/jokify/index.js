var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport'); // -> REMOVE
var jokesController = require('./controllers/joke-controller');

router.get('/', jokesController.indexView);
router.get('/random', jokesController.randomJoke);

// -> REMOVE
var authenticationHandler = passport.createStrategy('jokify', 'jokify', OWN_VALIDATION_METHOD_2, OWN_RETRIVING_METHOD_2);
router.post('/log-in', authenticationHandler);
// -> REMOVE

module.exports = router;

//TEMP Methods -> REMOVE

var users = [{
	id: 3,
	username: 'JohnBoy',
	password: 'unjohned'
}];

function OWN_RETRIVING_METHOD_2(userId) {
	var user = users.find(user => user.id === parseInt(userId));
	return Promise.resolve(user);
}

function OWN_VALIDATION_METHOD_2(username, password) {
	var user = users.find(user => user.username === username && user.password === password);
	return Promise.resolve(user);
}