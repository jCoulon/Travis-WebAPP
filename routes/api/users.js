var express = require('express');
var router = express.Router();
var models = require('../../models/index');
var passport = require("passport");
var config = require("../../config/auth");

router.get('/getUser/:username/:password',config.findByIdTest);


module.exports = router;
