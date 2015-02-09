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


module.exports = router;
