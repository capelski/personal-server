var users = [{
	id: 1,
	username: 'Cookieman',
	password: 'unhashed',
	permissions: ['view', 'view-restricted']
}, {
	id: 2,
	username: 'fucker.boy',
	password: 'silly1',
	permissions: ['view']
}];

function successfulAuthentication(req, res, next) {
	return res.json({
		message: 'Successfully authenticated',
		username: req.user.username
	});
}

function userAuthenticator(username, password) {
	var user = users.find(user => user.username === username && user.password === password);
	return Promise.resolve(user);
}

function userRetriever(userId) {
	var user = users.find(user => user.id === parseInt(userId));
	return Promise.resolve(user);
}

module.exports = {
	successfulAuthentication,
	userAuthenticator,
	userRetriever
};
