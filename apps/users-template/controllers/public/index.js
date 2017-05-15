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

var publicControllers = {
	api: {
		getAll: [view(), apiController.getAll],
		getById: [view(), apiController.getById],
		update: [edit(), apiController.update]
	},
	views: {
		list: viewsController.list,
		details: viewsController.details,
		edit: viewsController.edit
	}
};

module.exports = publicControllers