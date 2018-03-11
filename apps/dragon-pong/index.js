var express = require('express');
var router = express.Router();
var path = require('path');
var matchesController = require('./controllers/matches-controller');

const configureRouter = (middleware) => {
	router.get('/', function (req, res, next) {
	  res.render('index');
	});
	router.get('/matches', matchesController.getAll);
	return router;
}

module.exports = { configureRouter };
