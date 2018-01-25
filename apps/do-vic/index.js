var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function (req, res, next) {
  res.render('do-vic-index');
});

router.get('/inici', function (req, res, next) {
  res.render('do-vic-index');
});

router.get('/cates', function (req, res, next) {
  res.render('do-vic-cates');
});

router.get('/contacte', function (req, res, next) {
  res.render('do-vic-contacte');
});

router.get('/cuina', function (req, res, next) {
  res.render('do-vic-cuina');
});

router.get('/descobreix', function (req, res, next) {
  res.render('do-vic-descobreix');
});

router.get('/reservar', function (req, res, next) {
  res.render('do-vic-reservar');
});

module.exports = router;
