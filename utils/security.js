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

	return {
		hasUserPermission,
		isUserAuthenticated,
		securizeApi,
		securizeView
	};
}

module.exports = security();