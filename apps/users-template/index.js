var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');
var authenticationService = require('./services/authentication-service');
var authenticationHandler = passport.createStrategy('users-template',
	authenticationService.authenticator, authenticationService.retriever, authenticationService.logIn, authenticationService.logOut);

router.get('/', function (req,res,next) {
	return res.render('users-template-index');
});

router.post('/log-in', authenticationHandler.logIn);
router.post('/log-out', authenticationHandler.logOut);

router.get('/client-side', function (req, res, next) {
	res.set('Content-Type', 'application/javascript');
	
	var user = null;
	if (req.user) {
		user = {
			id: req.user.id,
			username: req.user.username
		};
	}

	return res.json({
		user: user
	});
});

var publicControllers = require('./controllers/public')(router);
var restrictedControllers = require('./controllers/restricted')(router);

module.exports = router;
