var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function (req, res, next) {
  res.render('users-template-index');
});

module.exports = router;
