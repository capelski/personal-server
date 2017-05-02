var express = require('express');
var session = require('express-session');
var config = require('./config');
var bodyParser = require('body-parser');
var server = express();

server.use(bodyParser.json());

server.use(session({
	secret: config.sessionSecret,
	resave: false,
	saveUninitialized: true
}));

require('./passport')(server);

server.set('view engine', 'ejs');

module.exports = server;