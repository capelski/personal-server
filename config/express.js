var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');

const configureExpress = (config, apps) => {
	var server = express();

	server.use(bodyParser.json());

	server.use(session({
		secret: config.sessionSecret,
		resave: false,
		saveUninitialized: true
	}));

	server.set('view engine', 'ejs');

	return server;
}

module.exports = { configureExpress };