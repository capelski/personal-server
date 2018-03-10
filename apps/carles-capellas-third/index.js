var express = require('express');
var router = express.Router();
var path = require('path');

const configureRouter = (middleware) => {
	router.get('/', function (req, res, next) {
	  res.render('capellas-third-index');
	});
	return router;
}

module.exports = { configureRouter };
