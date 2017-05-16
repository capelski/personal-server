var security = require('../../../../utils/security');
var apiController = require('./restricted-api-controller');
var viewsController = require('./restricted-views-controller');

function view() {
	return function(req, res, next) {
		if (security.userHasPermission(req.user, 'restricted:view')) {
			return next();
		}
		else {
			return res.status(401).json('You are not allowed to perform the requested operation');
		}
	};
}

function edit() {
	return function(req, res, next) {
		if (security.userHasPermission(req.user, 'restricted:edit')) {
			return next();
		}
		else {
			return res.status(401).json('You are not allowed to perform the requested operation');
		}
	};
}

module.exports = function(router) {
	router.get('/api/restricted', [view(), apiController.getAll]);
	router.put('/api/restricted', [edit(), apiController.update]);
	router.get('/api/restricted/getById', [view(), apiController.getById]);
	router.get('/api/restricted/getForEditById', [edit(), apiController.getById]);

	router.get('/restricted', viewsController.list);
	router.get('/restricted/details', viewsController.details);
	router.get('/restricted/edit', viewsController.edit);
};