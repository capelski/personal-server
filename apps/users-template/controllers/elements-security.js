var security = require('../../../utils/security');

function elementAccess (req, res, accessType, element) {
	var allowedAccess = !element || (
		(element.public || (req.user && req.user.id === element.ownerId)) &&
		(!element.restricted || (req.user && security.hasUserPermission(req.user, 'view-restricted')))
	);
	if (accessType === 'view') {
		return security.securizeView(res, allowedAccess, 'users-template-unauthorized');
	}
	else if (accessType == 'api') {
		return security.securizeApi(res, allowedAccess, 'You are not allowed to view the element');
	}
}

module.exports = {
	elementAccess
};
