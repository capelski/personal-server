var security = require('../../../../utils/security');
var apiController = require('./public-api-controller');
var viewsController = require('./public-views-controller');

function view() {
	return function(req, res, next) {
		if (security.userHasPermission(req.user, 'public:view')) {
			return next();
		}
		else {
			return res.status(401).json('You are not allowed to perform the requested operation');
		}
	};
}

function edit() {
	return function(req, res, next) {
		if (security.userHasPermission(req.user, 'public:edit')) {
			return next();
		}
		else {
			return res.status(401).json('You are not allowed to perform the requested operation');
		}
	};
}

module.exports = function(router) {
	router.get('/public', viewsController.list);
	router.get('/public/details', viewsController.details);
	router.get('/public/edit', viewsController.edit);
	
	router.get('/api/public', [view(), apiController.getAll]);
	router.put('/api/public', [edit(), apiController.update]);
	router.get('/api/public/getById', [view(), apiController.getById]);
};