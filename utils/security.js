function security() {

	function isUserAuthenticated(user) {
		return user;
	}

	function hasUserPermission(user, permission) {
		return user && user.permissions.indexOf(permission) > -1;
	}

	return {
		hasUserPermission,
		isUserAuthenticated
	};
}

module.exports = security();