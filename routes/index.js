const express = require('express');
const isAuthenticated = require('../middlewares/isAuthenticated');
const router = express.Router();
const StatusCodes = require('http-status-codes').StatusCodes;

/* GET home page. */
router.get('/', isAuthenticated, function(req, res, next) {
  if (res.statusCode == StatusCodes.UNAUTHORIZED) {
    res.render('index', { authorized: false });
  } else {
    res.render('index', { authorized: true });
  }
});

router.get('/registration', (req, res, next) => {
  res.render('registration');
});

module.exports = router;
