var express = require('express');
var router = express.Router();
var path = require('path');

const configureRouter = (middleware) => {
	router.get('/', function (req, res, next) {
	  res.render('do-vic-index');
	});

	router.get('/inici', function (req, res, next) {
	  res.render('do-vic-index');
	});

	router.get('/cates', function (req, res, next) {
	  res.render('do-vic-cates');
	});

	router.get('/contacte', function (req, res, next) {
	  res.render('do-vic-contacte');
	});

	router.get('/cuina', function (req, res, next) {
	  res.render('do-vic-cuina');
	});

	router.get('/descobreix', function (req, res, next) {
	  res.render('do-vic-descobreix');
	});

	router.get('/reservar', function (req, res, next) {
	  res.render('do-vic-reservar');
	});
	
	return router;
}

module.exports = { configureRouter };
