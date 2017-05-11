var elementsService = require('../services/elements-service');
var security = require('../../../utils/security');

function allowedElementPromise (req, res, accessType, element) {
	var allowedAccess = !element || (
		(element.public || (req.user && req.user.id === element.ownerId)) &&
		(!element.restricted || (req.user && security.hasUserPermission(req.user, 'view-restricted')))
	);
	if (accessType === 'view') {
		return security.securizeView(res, allowedAccess, 'users-template-unauthorized');
	}
	else if (accessType === 'api') {
		return security.securizeApi(res, allowedAccess, 'You are not allowed to view the element');
	}
}

function allowedElementMiddleware(accessType) {

	function accessCriteria(req) {
		req.element = elementsService.getById(parseInt(req.query.id));
		return !req.element || (
			(req.element.public || (req.user && req.user.id === req.element.ownerId)) &&
			(!req.element.restricted || (req.user && security.hasUserPermission(req.user, 'view-restricted')))
		);
	}

	return security.securizeMiddleware(accessCriteria, accessType, {
		unauthorizedView: 'users-template-unauthorized'
	});
}

module.exports = {
	allowedElementPromise,
	allowedElementMiddleware
};
