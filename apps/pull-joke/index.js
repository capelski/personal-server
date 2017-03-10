var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function (req, res, next) {
	res.render('pull-joke-index', {
		joke: 'Working on it...'
	});
});

module.exports = router;
