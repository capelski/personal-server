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


var publicController = {
	api: require('./controllers/public-api-controller'),
	views: require('./controllers/public-views-controller'),
	security: require('./controllers/public-security')
};

router.get('/api/public', publicController.security.getAll('api') ,publicController.api.getAll);
router.get('/api/public/getById', publicController.security.getById('api'), publicController.api.getById);

router.get('/public', publicController.views.list);
router.get('/public/details', publicController.views.details);



var restrictedController = {
	api: require('./controllers/restricted-api-controller'),
	views: require('./controllers/restricted-views-controller'),
	security: require('./controllers/restricted-security')
};

router.get('/api/restricted', restrictedController.security.getAll('api'), restrictedController.api.getAll);
router.get('/api/restricted/getById', restrictedController.security.getById('api'), restrictedController.api.getById);

router.get('/restricted', restrictedController.views.list);
router.get('/restricted/details', restrictedController.views.details);




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
