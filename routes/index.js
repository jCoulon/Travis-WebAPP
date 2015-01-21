var express = require('express');

module.exports = (function() {
  'use strict';
  var router = express.Router();

  router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
  });


  return router;
})();