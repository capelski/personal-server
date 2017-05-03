var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var config = require('./config');

// TODO If 404 -> Error

var strategies = [];

// TODO Securize access through appPath
passport.createStrategy = function(strategyName, appPath, authenticator, deserializer) {

	// TODO Control strategy doesn't exist
	// TODO Control the app name doesn't contain the APP token (||)

	var localStrategy = new LocalStrategy({
	    usernameField: 'username',
	    passwordField: 'password'
	}, function (username, password, userAuthenticated) {
	    return authenticator(username, password)
	    .then(user => {
	    	if (!user) return userAuthenticated({
	    		message: 'Incorrect username or password'
	    	}, null);
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

// TODO Remove the strategyName approach; the token is overriden, so we can't rely on it
passport.deserializeUser(function (userToken, userAuthenticated) {
	var decomposition = userToken.split('||');
	var strategyName = decomposition[0];
	var userId = decomposition[1];
	var strategy = strategies.find(strategy => strategy.name === strategyName);

	//TODO Instead of the strategyName, use the application path to get the strategy

    return strategy.deserializer(userId)
    .then(user => {
    	if (!user) return userAuthenticated({
    		message: 'Incorrect username or password'
    	}, null);
    	return userAuthenticated(null, user);
    });
});

module.exports = function (server) {

	server.use(passport.initialize());

	var authenticatedApps = config.hostedApps.filter(app => app.enableAuthentication);
	server.use(function(req, res, next) {
		// TODO Exclude static resources

		var matched = false;
		authenticatedApps.forEach(app => {
			if (req.url.startsWith('/' + app.namespace)) {
				matched = true;
				// TODO Manipulate the request so the deserialize will work
				passport.session()(req, res, next)
			}
		});
		
		if (!matched) {
			next();
		}
	});
};