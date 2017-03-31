var express = require('express');
var session = require('express-session');
var config = require('./config');
var server = express();

server.use(session({
	secret: config.sessionSecret,
	resave: false,
	saveUninitialized: true
}));

server.set('view engine', 'ejs');

module.exports = server;