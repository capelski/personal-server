var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.customAuthentication = function(strategyName) {
	return function(req, res, next) {

		function authenticationHandler(err, user, info) {
	        var error = err || info;
	        if (error) return res.status(401).json(error);

	        req.logIn(user, function(err) {
	            if (err) return res.send(err);
	            res.json(req.user);
	        });
	    }

	    passport.authenticate(strategyName, authenticationHandler)(req, res, next);
	};
}

module.exports = function (server) {

    server.use(passport.initialize());
    server.use(passport.session());

    passport.serializeUser(function (user, done) {
        return done(null, user.id);
    });

    passport.deserializeUser(function (userId, authenticationHandler) {
        return OWN_RETRIVING_METHOD(userId)
        .then(user => {
            return authenticationHandler(null, user);
        });
    });

    // Local Strategy

    function userValidator(username, password, authenticationHandler) {
	    return OWN_VALIDATION_METHOD(username, password)
	    .then(user => {
	        return authenticationHandler(null, user);
	    });
	}

	var localStrategy = new LocalStrategy({
	    usernameField: 'username',
	    passwordField: 'password'
	}, userValidator);

	passport.use('users-template', localStrategy);
};

//TEMP Methods

var users = [{
	id: 1,
	username: 'Cookieman',
	password: 'unhashed'
}, {
	id: 2,
	username: 'fucker.boy',
	password: 'silly1'
}];

function OWN_RETRIVING_METHOD(userId) {
	var user = users.find(user => user.id === userId);
	return Promise.resolve(user);
}

function OWN_VALIDATION_METHOD(username, password) {
	var user = users.find(user => user.username === username && user.password === password);
	return Promise.resolve(user);
}