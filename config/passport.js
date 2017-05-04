var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var config = require('./config');
var strategies = {};
var userTokenSeparator = '||->';

// TODO If 404 -> Error
// TODO Securize access through namespace

passport.createStrategy = function(namespace, authenticator, deserializer) {

	if (namespace.indexOf(userTokenSeparator) > -1) {
		throw 'The namespace ' + namespace + ' is not valid!';
	}

	strategies[namespace] = {
		deserializer: deserializer
	};

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

	passport.use(namespace, localStrategy);

	return function(req, res, next) {
		function userAuthenticated(error, user, info) {
	        if (error) return res.status(401).json(error);

	        req.logIn(user, function(error) {
	            if (error) return res.send(error);

	            req.session.authDomains[namespace] = user.id;
	            res.json(req.user);
	        });
	    }

	    passport.authenticate(namespace, userAuthenticated)(req, res, next);
	};
}

passport.serializeUser(function (user, done) {
    return done(null, user.id);
});

passport.deserializeUser(function (userToken, userAuthenticated) {
	var decomposition = userToken.split(userTokenSeparator);
	var strategyNamespace = decomposition[0];
	var userId = decomposition[1];
	var strategy = strategies[strategyNamespace];

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

				req.session.authDomains = req.session.authDomains || {};
				if (req.session.passport) {
					if(req.session.authDomains[app.namespace]) {
						req.session.passport.user = app.namespace + userTokenSeparator + req.session.authDomains[app.namespace];
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