var express = require('express');
var router = express.Router();
var models = require('../../models/index');
var passport = require("passport");
var config = require("../../config/auth");

router.get('/getUser/:username/:password', config.findByIdTest);


router.post("/login", passport.authenticate('local', {
    failureRedirect: '/login'
}), function (req, res) {
    var data = {idUser: req.user.IDUser};
    res.send(data);
});

router.get("/connected", function (req, res, next) {

    res.send(req.isAuthenticated() ? req.user : '0');

});


module.exports = router;
