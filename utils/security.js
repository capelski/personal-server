function security() {

	function isUserAuthenticated(user) {
		return user;
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

	function userHasPermission(user, permission) {
		return user && user.permissions.indexOf(permission) > -1;
	}

	return {
		isUserAuthenticated,
		securizeApi,
		securizeMiddleware,
		securizeView,
		userHasPermission
	};
}

module.exports = security();