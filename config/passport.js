var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var config = require('./config');
var strategies = {};

// TODO If 404 -> Error
// TODO Securize access through namespace
passport.createStrategy = function(strategyName, namespace, authenticator, deserializer) {

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

	strategies[namespace] = {
		deserializer: deserializer
	};

	return function(req, res, next) {
		function userAuthenticated(error, user, info) {
	        if (error) return res.status(401).json(error);

	        req.logIn(user, function(error) {
	            if (error) return res.send(error);
	            
	            req.session.authDomains[namespace] = user.id;
	            res.json(req.user);
	        });
	    }

	    passport.authenticate(strategyName, userAuthenticated)(req, res, next);
	};
}

passport.serializeUser(function (user, done) {
    return done(null, user.id);
});

passport.deserializeUser(function (userToken, userAuthenticated) {
	console.log('User token (inside)', userToken);
	var decomposition = userToken.split('||');
	var strategyNamespace = decomposition[0];
	var userId = decomposition[1];
	var strategy = strategies[strategyNamespace];

    return strategy.deserializer(userId)
    .then(user => {
    	if (!user) return userAuthenticated({
    		message: 'Incorrect username or password'
    	}, null);
		console.log(userToken, user);
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

				req.session.authDomains = req.session.authDomains || {};
				if (req.session.passport) {
					if(req.session.authDomains[app.namespace]) {
						req.session.passport.user = app.namespace + '||' + req.session.authDomains[app.namespace];
						console.log('User token', req.session.passport.user);
					}
					else {
						delete req.session.passport;
					}
				} 
				passport.session()(req, res, next)
			}
		});
		
		if (!matched) {
			next();
		}
	});
};