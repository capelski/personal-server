var express = require('express');
var router = express.Router();
var path = require('path');
var matchesController = require('./controllers/matches-controller');

router.get('/', function (req, res, next) {
  res.render('itequia-pong');
});
router.get('/matches', matchesController.getAll);

module.exports = router;
