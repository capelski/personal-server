var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');
var authenticationService = require('./services/authentication-service');
var templateController = require('./controllers/template-controller');
var elementsController = require('./controllers/elements-controller');
var authenticationHandler = passport.createStrategy('users-template',
	authenticationService.authenticator, authenticationService.retriever, authenticationService.logIn, authenticationService.logOut);

router.get('/', templateController.index);
router.get('/secured', templateController.secured);
router.get('/restricted', templateController.restricted);
router.post('/log-in', authenticationHandler.logIn);
router.post('/log-out', authenticationHandler.logOut);

router.get('/api/elements', elementsController.getAll);
router.get('/api/elements/getById', elementsController.getById);

router.get('/client-side', function (req, res, next) {
	res.set('Content-Type', 'application/javascript');
	return res.json({
		user: {
			id: req.user && req.user.id,
			username: req.user && req.user.username
		}
	});
});

module.exports = router;
