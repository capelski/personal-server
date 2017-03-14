var express = require('express');
var router = express.Router();
var path = require('path');
var jokesService = require('./services/joke-service');

router.get('/', function (req, res, next) {
	var todayJoke = jokesService.getRandomJoke();
	res.render('pull-joke-index', {
		joke: todayJoke
	});
});

module.exports = router;
