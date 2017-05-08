var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');
var authenticationService = require('./services/authentication-service');
var templateController = require('./controllers/template-controller');
var authenticationHandler = passport.createStrategy('users-template',
	authenticationService.authenticator, authenticationService.retriever, authenticationService.logIn, authenticationService.logOut);

router.get('/', templateController.index);
router.get('/secured', templateController.secured);
router.get('/restricted', templateController.restricted);
router.post('/log-in', authenticationHandler.logIn);
router.post('/log-out', authenticationHandler.logOut);

module.exports = router;
