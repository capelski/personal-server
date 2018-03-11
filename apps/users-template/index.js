var express = require('express');
var router = express.Router();
var path = require('path');
var authenticationService = require('./services/authentication-service');

const configureRouter = (middleware, { userManagementUtils }) => {

	userManagementUtils.createStrategy(authenticationService.handlers);

	router.get('/', middleware.passport, function (req, res, next) {
		return res.render('index');
	});

	router.post('/log-in', middleware.passport, userManagementUtils.logInMiddleware, (req, res, next) => {
		return res.json(authenticationService.getClientSideInfo(req.user, req.body.permissions));
	});
	router.post('/log-out', middleware.passport, userManagementUtils.logOutMiddleware, (req, res, next) => {
		return res.send('Successfully logged out');
	});

	router.get('/client-side', middleware.passport, function (req, res, next) {
		res.set('Content-Type', 'application/javascript');
		return res.json({
			user: authenticationService.getClientSideInfo(req.user, req.query.permissions)
		});
	});

	var publicControllers = require('./controllers/public')(router, middleware);
	var restrictedControllers = require('./controllers/restricted')(router, middleware);
	return router;
}

module.exports = { configureRouter };
