var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var config = require('./config');

var authenticatedApps = config.hostedApps.filter(app => app.enableAuthentication);
var deserializers = {};
var userPrefixSeparator = '||->';

function getUserFromPrefixedUserId(prefixedUserId) {
	var decomposition = prefixedUserId.split(userPrefixSeparator);
	var namespace = decomposition[0];
	var userId = decomposition[1];
    return deserializers[namespace](userId);
}

function isStaticContent(relativeUrl) {
	return relativeUrl.indexOf('/js/') > -1 || relativeUrl.indexOf('/css/') > -1 ;
}

function prefixUserId(currentApp, userSession) {
	if (userSession.passport && userSession.authDomains[currentApp.namespace]) {
		userSession.passport.user = currentApp.namespace + userPrefixSeparator + userSession.authDomains[currentApp.namespace];
	}
	else {
		delete userSession.passport;
	}
}

function userRetrievedHandler(userAuthenticated) {
	return function (user) {
    	if (!user) return userAuthenticated({
    		message: 'Incorrect username or password'
    	}, null);
		// console.log('Retrieved user:', user);
    	return userAuthenticated(null, user);
    };
}

module.exports = function (server) {
	server.use(passport.initialize());
	server.use(function (req, res, next) {

		if (isStaticContent(req.url)) return next();

		var currentApp = authenticatedApps.find(app => req.url.startsWith('/' + app.namespace));
		if (!currentApp) return next();

		prefixUserId(currentApp, req.session);
		return passport.session()(req, res, next);
	});

	passport.serializeUser(function (user, done) {
    	return done(null, user.id);
	});

	passport.deserializeUser(function (prefixedUserId, userAuthenticated) {
	    return getUserFromPrefixedUserId(prefixedUserId)
	    .then(userRetrievedHandler(userAuthenticated));
	});
};

// TODO Securize access through namespace

passport.createStrategy = function (namespace, authenticator, deserializer, successfulAuthentication) {

	if (namespace.indexOf(userPrefixSeparator) > -1) {
		throw 'The namespace ' + namespace + ' is not valid!';
	}

	deserializers[namespace] = deserializer;

	var localStrategy = new LocalStrategy({
	    usernameField: 'username',
	    passwordField: 'password'
	}, function (username, password, userAuthenticated) {
	    return authenticator(username, password)
	    .then(userRetrievedHandler(userAuthenticated));
	});

	passport.use(namespace, localStrategy);

	return function (req, res, next) {

		function userAuthenticated(error, user, info) {
	        if (error) return res.status(401).json(error);

	        req.logIn(user, function (error) {
	            if (error) return res.send(error);

				req.session.authDomains = req.session.authDomains || {};
	            req.session.authDomains[namespace] = user.id;
	            successfulAuthentication(req, res, next);
	        });
	    }

	    passport.authenticate(namespace, userAuthenticated)(req, res, next);
	};
}