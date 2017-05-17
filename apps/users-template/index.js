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
router.get('/public/edit', publicControllers.views.edit);

var restrictedControllers = require('./controllers/restricted');
router.get('/api/restricted', restrictedControllers.api.getAll);
router.put('/api/restricted', restrictedControllers.api.update);
router.get('/api/restricted/getById', restrictedControllers.api.getById);
router.get('/restricted', restrictedControllers.views.list);
router.get('/restricted/details', restrictedControllers.views.details);
router.get('/restricted/edit', restrictedControllers.views.edit);

router.post('/log-in', authenticationHandler.logIn);
router.post('/log-out', authenticationHandler.logOut);

router.get('/client-side', function (req, res, next) {
	res.set('Content-Type', 'application/javascript');
	return res.json({
		user: authenticationService.getClientSideInfo(req.user, req.query.permissions)
	});
});

module.exports = router;
