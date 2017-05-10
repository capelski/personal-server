var security = require('../../../utils/security');

function elementAccess (req, res, accessType, element) {
	var allowedAccess = !elementAccessCriteria(element, req); //TODO Invert the expression
	if (accessType === 'view') {
		return securizeView(res, allowedAccess);
	}
	else if (accessType == 'api') {
		return securizeApi(res, allowedAccess);
	}
}

function elementAccessCriteria(element, user) {
	return element && (
		(!element.public && (!req.user || req.user.id !== element.ownerId)) ||
		(element.restricted && (!req.user || !security.hasUserPermission(req.user, 'view-restricted')))
	);
}

function securizeView (res, allowedAccess) {
	return new Promise(function(resolve, reject) {
		if (!allowedAccess) {
			// TODO Allow parameter to configure
			return res.render('users-template-unauthorized');
		}
		resolve();
	});
}

function securizeApi (res, allowedAccess) {
	return new Promise(function(resolve, reject) {
		if (!allowedAccess) {
			// TODO Allow parameter to configure
			return res.json('You are not allowed to view the element');
		}
		resolve();
	});
}

module.exports = {
	elementAccess
};
