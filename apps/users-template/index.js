var express = require('express');
var router = express.Router();
var path = require('path');
var { createStrategy } = require('../../utils/passport');
var authenticationService = require('./services/authentication-service');
var authenticationHandler = createStrategy('users-template', authenticationService.handlers);

const configureRouter = (middleware) => {
	router.get('/', middleware.passport, function (req, res, next) {
		return res.render('users-template-index');
	});

	router.post('/log-in', middleware.passport, authenticationHandler.logIn);
	router.post('/log-out', middleware.passport, authenticationHandler.logOut);

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
