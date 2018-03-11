var express = require('express');
var router = express.Router();
var path = require('path');

const configureRouter = (middleware) => {
	router.get('/', function (req, res, next) {
	  res.render('index');
	});

	router.get('/inici', function (req, res, next) {
	  res.render('index');
	});

	router.get('/cates', function (req, res, next) {
	  res.render('cates');
	});

	router.get('/contacte', function (req, res, next) {
	  res.render('contacte');
	});

	router.get('/cuina', function (req, res, next) {
	  res.render('cuina');
	});

	router.get('/descobreix', function (req, res, next) {
	  res.render('descobreix');
	});

	router.get('/reservar', function (req, res, next) {
	  res.render('reservar');
	});
	
	return router;
}

module.exports = { configureRouter };
