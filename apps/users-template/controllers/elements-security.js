var security = require('../../../utils/security');

function elementAccess (req, res, accessType, element) {
	var allowedAccess = !elementAccessCriteria(element, req); //TODO Invert the expression
	if (accessType === 'view') {
		return securizeView(res, allowedAccess, 'users-template-unauthorized');
	}
	else if (accessType == 'api') {
		return securizeApi(res, allowedAccess, 'You are not allowed to view the element');
	}
}

function elementAccessCriteria(element, user) {
	return element && (
		(!element.public && (!req.user || req.user.id !== element.ownerId)) ||
		(element.restricted && (!req.user || !security.hasUserPermission(req.user, 'view-restricted')))
	);
}

function securizeView (res, allowedAccess, unauthorizedView) {
	return new Promise(function(resolve, reject) {
		if (!allowedAccess) {
			return res.render(unauthorizedView);
		}
		return resolve();
	});
}

function securizeApi (res, allowedAccess, unauthorizedMessage) {
	return new Promise(function(resolve, reject) {
		if (!allowedAccess) {
			return res.json(unauthorizedMessage);
		}
		return resolve();
	});
}

module.exports = {
	elementAccess
};
