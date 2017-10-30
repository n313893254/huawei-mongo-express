'use strict';

var utils = require('../utils');

var routes = function () {
  var exp = {};

  exp.poi = function (req, res) {
    res.render('poi');
  };

  return exp;
};

module.exports = routes;
