var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');

router.get('/', function (req, res, next) {
  res.render('users-template-index');
});

router.post('/log-in', passport.customAuthentication('users-template'));

module.exports = router;
