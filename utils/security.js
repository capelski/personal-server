function security() {

	function isUserAuthenticated(user) {
		return user;
	}

	function hasUserPermission(user, permission) {
		return user && user.permissions.indexOf(permission) > -1;
	}

	function securizeApi (res, allowedAccess, unauthorizedMessage) {
		return new Promise(function(resolve, reject) {
			if (!allowedAccess) {
				return res.status(401).json(unauthorizedMessage);
			}
			return resolve();
		});
	}

	function securizeView (res, allowedAccess, unauthorizedView) {
		return new Promise(function(resolve, reject) {
			if (!allowedAccess) {
				return res.status(401).render(unauthorizedView);
			}
			return resolve();
		});
	}

	function securizeMiddleware(accessCriteria, accessType, options) {
		options = options || {};
		options.unauthorizedMessage = options.unauthorizedMessage || 'You are not allowed to access this resource';
		options.unauthorizedView = options.unauthorizedView || 'unauthorized';

		return function(req, res, next) {
			if (accessCriteria(req)) {
				return next();
			}
			else {
				if (accessType === 'view') {
					return res.status(401).render(options.unauthorizedView);
				}
				else if (accessType === 'api') {
					return res.status(401).json(options.unauthorizedMessage);
				}
			}
		};
	}

	return {
		hasUserPermission,
		isUserAuthenticated,
		securizeApi,
		securizeMiddleware,
		securizeView
	};
}

module.exports = security();