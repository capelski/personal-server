var express = require('express');
var router = express.Router();
var path = require('path');
var jokesController = require('./controllers/joke-controller');

router.get('/', jokesController.indexView);
router.get('/random', jokesController.randomJoke);

module.exports = router;
