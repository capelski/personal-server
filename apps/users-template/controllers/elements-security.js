var security = require('../../../utils/security');

function filterElementAccess (element, req, res, accessType) {
	return new Promise(function(resolve, reject) {
		if (element && (
			(!element.public && (!req.user || req.user.id !== element.ownerId)) ||
			(element.restricted && (!req.user || !security.hasUserPermission(req.user, 'view-restricted')))
		)) {
			if (accessType === 'view') {
				return res.render('users-template-unauthorized', {
					user: req.user
				});
			}
			else if (accessType == 'api') {
				return res.json('You are not allowed to view the element');
			}
		}
		resolve();
	});
}

module.exports = {
	filterElementAccess
};
