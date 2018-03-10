var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

const userPrefixSeparator = '||->';
var deserializers = {};

const getUserFromPrefixedUserId = prefixedUserId => {
	var decomposition = prefixedUserId.split(userPrefixSeparator);
	var namespace = decomposition[0];
	var userId = decomposition[1];
    return deserializers[namespace](userId);
};

const userPrefixerMiddleware = (appNamespace) =>
	(req, res, next) => {
		if (req.session.passport && req.session.authDomains[appNamespace]) {
			req.session.passport.user = appNamespace +
				userPrefixSeparator + req.session.authDomains[appNamespace];
		}
		else {
			delete req.session.passport;
		}
		return next();
	};

const userResolver = doneCallback => {
	return user => {
    	if (!user) {
			var error = {
    			message: 'Incorrect username or password'
			};
			return doneCallback(error, null);
		}
    	return doneCallback(null, user);
    };
};

const userSerializer = (user, doneCallback) => doneCallback(null, user.id);

const userDeserializer = (prefixedUserId, doneCallback) =>
	getUserFromPrefixedUserId(prefixedUserId).then(userResolver(doneCallback));

const configurePassport = (server) => {
	passport.serializeUser(userSerializer);
	passport.deserializeUser(userDeserializer);
}

const createStrategy = function (namespace, authenticator, deserializer, logInHandler, logOutHandler) {

	if (namespace.indexOf(userPrefixSeparator) > -1) {
		throw 'The namespace ' + namespace + ' is not valid!';
	}

	deserializers[namespace] = deserializer;

	var localStrategy = new LocalStrategy({
	    usernameField: 'username',
	    passwordField: 'password'
	}, function (username, password, userAuthenticated) {
	    return authenticator(username, password)
	    .then(userResolver(userAuthenticated));
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
};

module.exports = { configurePassport, userPrefixerMiddleware, createStrategy };
