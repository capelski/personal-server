var express = require('express');
var router = express.Router();
var path = require('path');
var pagesController = require('./controllers/pages-controller');

router.get('/', pagesController.resolve);

module.exports = router;
