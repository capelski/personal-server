var express = require('express');
var router = express.Router();
var path = require('path');
var jokesService = require('./services/joke-service');

router.get('/', function (req, res, next) {
	var randomJoke = jokesService.getRandomJoke();
	res.render('jokify-index', {
		joke: randomJoke
	});
});

router.get('/random', function (req, res, next) {
	var randomJoke = jokesService.getRandomJoke();
	res.json(randomJoke);
});

module.exports = router;
