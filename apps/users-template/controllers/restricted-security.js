var security = require('../../../utils/security');

function getAll(accessType) {
	return function(req, res, next) {
		if (security.userHasPermission(req.user, 'restricted:view')) {
			return next();
		}
		else {
			if (accessType === 'api') {
				return res.status(401).json('You are not allowed to access this resource');
			}
			else if (accessType === 'view') {
				return res.status(401).render('users-template-unauthorized');
			}
		}
	};
}

function getById(accessType) {
	return function(req, res, next) {
		if (security.userHasPermission(req.user, 'restricted:view')) {
			return next();
		}
		else {
			if (accessType === 'api') {
				return res.status(401).json('You are not allowed to access this resource');
			}
			else if (accessType === 'view') {
				return res.status(401).render('users-template-unauthorized');
			}
		}
	};
}

module.exports = {
	getAll,
	getById
}