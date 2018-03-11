var express = require('express');
var router = express.Router();
var path = require('path');

const configureRouter = (middleware) => {

  router.get('/', function (req, res, next) {
    res.render('index');
  });

  router.get('/establishments', function (req, res, next) {
    res.render('establishments/discount');
  });

  router.get('/establishments/alphabetic', function (req, res, next) {
    res.render('establishments/alphabetic');
  });

  router.get('/establishments/discount', function (req, res, next) {
    res.render('establishments/discount');
  });

  router.get('/establishments/0', function (req, res, next) {
    res.render('establishments/day0');
  });
  router.get('/establishments/1', function (req, res, next) {
    res.render('establishments/day1');
  });
  router.get('/establishments/2', function (req, res, next) {
    res.render('establishments/day2');
  });
  router.get('/establishments/3', function (req, res, next) {
    res.render('establishments/day3');
  });
  router.get('/establishments/4', function (req, res, next) {
    res.render('establishments/day4');
  });
  router.get('/establishments/5', function (req, res, next) {
    res.render('establishments/day5');
  });
  router.get('/establishments/6', function (req, res, next) {
    res.render('establishments/day6');
  });

  router.get('/establishments/map', function (req, res, next) {
    res.render('establishments/maps/' + req.query.target);
  });

  router.get('/sales', function (req, res, next) {
    res.render('sales');
  });

  router.get('/sign-up', function (req, res, next) {
    res.render('sign-up');
  });

  router.get('/gift', function (req, res, next) {
    res.render('gift');
  });

  router.get('/faq', function (req, res, next) {
    res.render('faq');
  });

  router.get('/legal', function (req, res, next) {
    res.render('legal');
  });

  router.get('/advertise', function (req, res, next) {
    res.render('advertise');
  });

  router.get('/contact', function (req, res, next) {
    res.render('contact');
  });
  
  return router;
}

module.exports = { configureRouter };
