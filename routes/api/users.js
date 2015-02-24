var express = require('express');
var router = express.Router();
var models = require('../../models/index');
var passport = require("passport");
var auth = require("../../config/auth");
var uparam = require("../../config/userParam");

router.get('/getUser/:username/:password', auth.findById);

router.post("/login", auth.seConnecter);
/**
 * Verifie si l'utilisateur est deja connecte ou non
 */
router.get("/connected", auth.utilisateurDejaConnecte);

router.get("/uparam/:id/", function (req, res) {
    var idparam = req.params.id;
    var cuser = req.user.Login;

    uparam.getParamByID(idparam, cuser).then(function (param) {
        if (!param) {
            res.send(0);
        }
        else {
            res.json(param);
        }
    }, function (err) {
        console.log(err);
    });
});

router.get("/AllGroup/", function (req, res) {
    var cuser = req.user.Login;

    uparam.getParamAllGroup(cuser).then(function (param) {
        if (!param) {
            res.send(0);
        }
        else {
            res.json(param);
        }
    }, function (err) {
        console.log(err);
    });
});

/**
 * Retourne tous les parametres
 */
router.get("/AllParams/", function (req, res) {
    var cuser = req.user.Login;
    uparam.getParamAllUser(cuser).then(function (param) {
        if (!param) {
            res.send(0);
        }
        else {
            res.json(param);
        }
    }, function (err) {
        console.log(err);
    });
});

/**
 * Ajouter un parametre
 */
router.post("/uparam/", function (req, res) {
    var posts = req.body;
    var cuser = req.user.Login;
    var desc = posts["users"];
    console.log(posts['users'], posts['type']);

    uparam.createParam(cuser, posts["ind"], posts["type"], desc).then(function (param) {
        console.log("param created");
        res.status(200).end();
    })

});

/**
 * met a jour un parametre
 */
router.post("/uparam/add", function (req, res) {
    var posts = req.body;
    var cuser = req.user.Login;
    console.log(posts['user'], posts['type']);

    uparam.getParamByID(posts['id'], cuser).then(function (param) {
        if (param) {
            uparam.addInGroup(param, posts['user']);
        }
    }, function (err) {
    });


});

/**
 *supprimer  un user d'un parametre
 */
router.post("/uparam/supp", function (req, res) {
    var posts = req.body;
    // var cuser = req.user.Login;
    console.log(posts['user'], posts['type']);

    uparam.getParamByID(posts['id'], "jcoulon").then(function (param) {
        if (param) {
            uparam.deleteInGroup(param, posts['user']);
        }
    }, function (err) {
    });


});


router.get('/getAutocompleteName/:name', function(req, res){
        console.log("ici");
        models.db.User.findAll({where : "Name REGEXP '"+req.params.name+"' OR Surname REGEXP '"+req.params.name+"' OR Login REGEXP '"+req.params.name+"'"},{raw:true}).then(function(data){
            res.json(data);


module.exports = router;
