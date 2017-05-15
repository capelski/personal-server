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

var restrictedControllers = {
	api: {
		getAll: [view(), apiController.getAll],
		getById: [view(), apiController.getById],
		update: [edit(), apiController.update]
	},
	views: {
		list: viewsController.list,
		details: viewsController.details,
	}
};

module.exports = restrictedControllers