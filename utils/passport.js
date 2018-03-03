var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var authenticatedApps;
var deserializers = {};
var userPrefixSeparator = '||->';

const getUserFromPrefixedUserId = prefixedUserId => {
	var decomposition = prefixedUserId.split(userPrefixSeparator);
	var namespace = decomposition[0];
	var userId = decomposition[1];
    return deserializers[namespace](userId);
};

const isStaticContent = relativeUrl => 
	relativeUrl.indexOf('/js/') > -1 || relativeUrl.indexOf('/css/') > -1 ;

const prefixUserId = (currentApp, userSession) => {
	if (userSession.passport && userSession.authDomains[currentApp.namespace]) {
		userSession.passport.user = currentApp.namespace + userPrefixSeparator + userSession.authDomains[currentApp.namespace];
	}
	else {
		delete userSession.passport;
	}
};

const userRetrievedHandler = userAuthenticated => {
	return user => {
    	if (!user) {
			return userAuthenticated({
    			message: 'Incorrect username or password'
			}, null);
		}
		// console.log('Retrieved user:', user);
    	return userAuthenticated(null, user);
    };
};

const configurePassport = (server, apps) => {
	var authenticatedApps = apps.filter(app => app.enableAuthentication)

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
}

module.exports = { configurePassport };

// TODO Securize access through namespace

passport.createStrategy = function (namespace, authenticator, deserializer, logInHandler, logOutHandler) {

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

	function logIn (req, res, next) {

		function userAuthenticated(error, user, info) {
	        if (error) return res.status(401).json(error);

	        req.logIn(user, function (error) {
	            if (error) return res.send(error);

				req.session.authDomains = req.session.authDomains || {};
	            req.session.authDomains[namespace] = user.id;
	            logInHandler(req, res, next);
	        });
	    }

	    passport.authenticate(namespace, userAuthenticated)(req, res, next);
	};

	function logOut (req, res, next) {
		req.session.authDomains = req.session.authDomains || {};
        delete req.session.authDomains[namespace];
        delete req.session.passport;
        return logOutHandler(req, res, next);
	};

	return {
		logIn,
		logOut
	};
}