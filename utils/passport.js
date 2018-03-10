const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const userPrefixSeparator = '||->';
var deserializers = {};

const configurePassport = (server) => {

	const userSerializer = (user, doneCallback) => {
		var namespace = user._namespace;
		delete user._namespace;
		var serializedUserId = namespace + userPrefixSeparator + user.id;
		return doneCallback(null, serializedUserId);
	};
	
	const userDeserializer = (serializedUserId, doneCallback) => {
		var parts = serializedUserId.split(userPrefixSeparator);
		var namespace = parts[0];
		var userId = parts[1];
		return deserializers[namespace](userId)
		.then(user => {
			if (!user) {
				var error = {
					message: 'Incorrect username or password'
				};
				return doneCallback(error, null);
			}
			return doneCallback(null, user);
		});
	}

	passport.serializeUser(userSerializer);
	passport.deserializeUser(userDeserializer);
}

// TODO retrieve the namespace automatically
const createStrategy = (namespace, handlers) => {
	if (namespace.indexOf(userPrefixSeparator) > -1) {
		// todo winston error instead
		throw 'The namespace ' + namespace + ' is not valid!';
	}

	deserializers[namespace] = handlers.userDeserializer;

	var localStrategy = new LocalStrategy({
	    usernameField: 'username',
	    passwordField: 'password'
	}, function (username, password, doneCallback) {
	    return handlers.userAuthenticator(username, password)
	    .then(user => {
			if (!user) {
				var error = {
					message: 'Incorrect username or password'
				};
				return doneCallback(error, null);
			}
			
			user._namespace = namespace;
			return doneCallback(null, user);
		});
	});

	passport.use(namespace, localStrategy);
};

const logInMiddleware = (namespace) => (req, res, next) => {

	function doneCallback(error, user, info) {
		if (error) {
			return res.status(401).json(error);
		}

		req.logIn(user, function (error) {
			if (error) {
				return res.send(error);
			}
			return next();
		});
	}

	passport.authenticate(namespace, doneCallback)(req, res, next);
};

const logOutMiddleware = (req, res, next) => {
	delete req.session.passport;
	return next();
};

module.exports = { configurePassport, createStrategy, logInMiddleware, logOutMiddleware };
