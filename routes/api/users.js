var express = require('express');
var router = express.Router();
var models = require('../../models/index');
var passport = require("passport");
var config = require("../../config/auth");

router.get('/getUser/:username/:password', config.findById);

router.post("/login", config.seConnecter);
/**
 * Verifie si l'utilisateur est deja connecte ou non
 */
router.get("/connected", config.utilisateurDejaConnecte);

router.get("/group/:idGroup", function (req, res) {

    models.Userparam.findOne({
        where: {
            ParamName1: req.params.group,
            Username: req.params.username
        }
    }).then(function (data) {
        res.json(data)
    })
});

router.post("/group/", function (req, res) {
    var value = req.body;
    models.Userparam.create({
        Username: value.username,
        ParamName1: value.param,
        ParamValue1: value.value,
        Description1: value.desc
    }).then(function () {
        res.send("")
    })
});


module.exports = router;
