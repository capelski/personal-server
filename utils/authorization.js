function authorization() {

	function isAuthenticated(user) {
		return user;
	}

	function hasPermission(user, permission) {
		return isAuthenticated(user) && user.permissions.indexOf(permission) > -1;
	}

	return {
		hasPermission,
		isAuthenticated
	};
}

module.exports = authorization();