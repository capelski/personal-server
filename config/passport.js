var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// TODO If 404 -> Error

//TODO It is returning succcess for a failed auth

var strategies = [];

//TODO Add the application path. Securize access
passport.createStrategy = function(strategyName, authenticator, deserializer) {

	//TODO Control strategy doesn't exist
	// TODO Control the app name doesn't contain the APP token (||)

	var localStrategy = new LocalStrategy({
	    usernameField: 'username',
	    passwordField: 'password'
	}, function (username, password, userAuthenticated) {
	    return authenticator(username, password)
	    .then(user => {
	        return userAuthenticated(null, user);
	    });
	});

	passport.use(strategyName, localStrategy);

	strategies.push({
		name: strategyName,
		deserializer: deserializer
	});

	return function(req, res, next) {

		function userAuthenticated(error, user, info) {
	        if (error) return res.status(401).json(error);

			user._strategyName = strategyName;
	        req.logIn(user, function(error) {
	            if (error) return res.send(error);
	            res.json(req.user);
	        });
	    }

	    passport.authenticate(strategyName, userAuthenticated)(req, res, next);
	};
}

passport.serializeUser(function (user, done) {
	var strategyName = user._strategyName;
	delete user._strategyName;
    return done(null, strategyName + '||' + user.id);
});

passport.deserializeUser(function (userToken, userAuthenticated) {
	var decomposition = userToken.split('||');
	var strategyName = decomposition[0];
	var userId = decomposition[1];
	var strategy = strategies.find(strategy => strategy.name === strategyName);

    return strategy.deserializer(userId)
    .then(user => {
        return userAuthenticated(null, user);
    });
});

module.exports = function (server) {

	server.use(passport.initialize());
	server.use(passport.session()); // TODO Selectively apply
};

/*******************

passport.customAuthentication = function(strategyName) {
	return function(req, res, next) {

		function userAuthenticated(error, user) {
	        if (error) return res.status(401).json(error);

	        req.logIn(user, function(error) {
	            if (error) return res.send(error);
	            res.json(req.user);
	        });
	    }

	    passport.authenticate(strategyName, userAuthenticated)(req, res, next);
	};
}

passport.serializeUser(function (user, done) {
	// TODO Branch between apps
    return done(null, user.id);
});

passport.deserializeUser(function (userId, authenticationHandler) {
	// TODO Branch between apps
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

module.exports = function (server) {

	server.use(passport.initialize());
	server.use(passport.session()); // TODO Selectively apply
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

*/