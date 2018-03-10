var express = require('express');
var router = express.Router();
var path = require('path');
var jokesController = require('./controllers/joke-controller');

const configureRouter = (middleware) => {
	router.get('/', middleware.session, jokesController.indexView);
	router.get('/random', middleware.session, jokesController.randomJoke);
	return router;
}

module.exports = { configureRouter };
