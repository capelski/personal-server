var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');
var authenticationService = require('./services/authentication-service');
var templateController = require('./controllers/template-controller');
var authenticationHandler = passport.createStrategy('users-template',
	authenticationService.userAuthenticator, authenticationService.userRetriever, authenticationService.successfulAuthentication);

router.get('/', templateController.index);
router.get('/secured', templateController.secured);
router.get('/restricted', templateController.restricted);
router.post('/log-in', authenticationHandler);

module.exports = router;
