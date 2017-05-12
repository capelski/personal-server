var users = [{
	id: 1,
	username: 'Cookieman',
	password: 'unhashed',
	permissions: ['public:view', 'restricted:view']
}, {
	id: 2,
	username: 'fucker.boy',
	password: 'silly1',
	permissions: ['public:view']
}];

function logIn(req, res, next) {
	return res.json({
		message: 'Successfully authenticated',
		username: req.user.username
	});
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

module.exports = {
	logIn,
	logOut,
	authenticator,
	retriever
};
