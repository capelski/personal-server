var security = require('../../../../utils/security');
var apiController = require('./restricted-api-controller');
var viewsController = require('./restricted-views-controller');

function getAll() {
	return function(req, res, next) {
		if (security.userHasPermission(req.user, 'restricted:view')) {
			return next();
		}
		else {
			return res.status(401).json('You are not allowed to access this resource');
		}
	};
}

function getById() {
	return function(req, res, next) {
		if (security.userHasPermission(req.user, 'restricted:view')) {
			return next();
		}
		else {
			return res.status(401).json('You are not allowed to access this resource');
		}
	};
}

var restrictedControllers = {
	api: {
		getAll: [getAll(), apiController.getAll],
		getById: [getById(), apiController.getById]
	},
	views: {
		list: viewsController.list,
		details: viewsController.details,
	}
};

module.exports = restrictedControllers