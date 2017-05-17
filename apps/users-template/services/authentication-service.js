var security = require('../../../utils/security');

var users = [{
	id: 1,
	username: 'public',
	password: 'public',
	permissions: ['public:view', 'public:edit']
}, {
	id: 2,
	username: 'restricted',
	password: 'restricted',
	permissions: ['restricted:view', 'restricted:edit']
}];

function logIn(req, res, next) {
	return res.json(getClientSideInfo(req.user, req.body.permissions));
}

function logOut(req, res, next) {
	return res.send('Successfully logged out');
}

function authenticator(username, password) {
	var user = users.find(user => user.username === username && user.password === password);
	return Promise.resolve(user);
}

function retriever(userId) {
	var user = users.find(user => user.id === parseInt(userId));
	return Promise.resolve(user);
}

function getClientSideInfo(user, permissions) {
	var parsedUser = null;
	if (user) {
		parsedUser = {
			id: user.id,
			username: user.username,
			permissions: {}
		};
		permissions = permissions || [];
		permissions.forEach(permission => {
			if (typeof permission === "string" && security.userHasPermission(user, permission)) {
				var splittedPermission = permission.split(':');
				var entity = splittedPermission[0];
				var right = splittedPermission[1];
				parsedUser.permissions[entity] = parsedUser.permissions[entity] || {};
				parsedUser.permissions[entity][right] = true;
			}
		});
	}
	return parsedUser;
}

module.exports = {
	logIn,
	logOut,
	authenticator,
	retriever,
	getClientSideInfo
};
