var express = require('express');
var router = express.Router();
var path = require('path');
var pagesController = require('./controllers/pages-controller');

const configureRouter = (middleware) => {
	router.get('/', middleware.session, pagesController.resolve);
	return router;
}

module.exports = { configureRouter };
