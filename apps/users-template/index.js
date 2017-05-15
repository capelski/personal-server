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

var publicControllers = require('./controllers/public');
router.get('/api/public', publicControllers.api.getAll);
router.put('/api/public', publicControllers.api.update);
router.get('/api/public/getById', publicControllers.api.getById);
router.get('/public', publicControllers.views.list);
router.get('/public/details', publicControllers.views.details);

var restrictedControllers = require('./controllers/restricted');
router.get('/api/restricted', restrictedControllers.api.getAll);
router.put('/api/restricted', restrictedControllers.api.update);
router.get('/api/restricted/getById', restrictedControllers.api.getById);
router.get('/restricted', restrictedControllers.views.list);
router.get('/restricted/details', restrictedControllers.views.details);

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

module.exports = router;
