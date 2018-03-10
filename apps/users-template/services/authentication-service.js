var security = require('../../../utils/security');

var users = [{
	id: 1,
	username: 'public',
	password: 'public',
	permissions: ['public:view', 'public:create', 'public:edit', 'public:delete']
}, {
	id: 2,
	username: 'restricted',
	password: 'restricted',
	permissions: ['restricted:view', 'restricted:create', 'restricted:edit', 'restricted:delete']
}];

function userAuthenticator(username, password) {
	var user = users.find(user => user.username === username && user.password === password);
	return Promise.resolve(user);
}

function userDeserializer(userId) {
	var user = users.find(user => user.id === parseInt(userId));
	return Promise.resolve(user);
}

function getClientSideInfo(user, permissions) {
	var parsedUser = null;
	if (user) {
		parsedUser = {
			id: user.id,
			username: user.username,
			permissions: []
		};
		permissions = permissions || [];
		permissions.forEach(permission => {
			if (typeof permission === "string" && security.userHasPermission(user, permission)) {
				parsedUser.permissions.push(permission);
			}
		});
	}
	return parsedUser;
}

module.exports = {
	getClientSideInfo,
	handlers: {
		userAuthenticator,
		userDeserializer
	}
};
