"use strict";
var express = require('express');
var router = express.Router();
var models = require('../../models/index');


/* Retourne toutes les traces. */
router.get('/getAll', function (req, res) {
    models.dbcmc.Transition.findAll({}, {raw: true}).success(function (activites) {
        if (activites) {
            res.json(activites); //On envoi au format JSON
        } else {
            res.send("Error 404");
        }


    }).error();

});

/* Retourne les traces par type */
/* transition.get('/type/:type_id',function(req,res){

 models.dbcmc.Activite.findAll({where :{ TypeAct : req.params.type_id}},{raw:true}).success(function(activites){


 if(activites){
 res.json(activites); //On envoi au format JSON
 }else{
 res.send("Error 404");
 }

 }).error();


 });*/

/* Retourne les traces par usager */
router.get('/usager/:usager_nom', function (req, res) {

    models.dbcmc.Transition.findAll({where: {Usager: req.params.usager_nom}}, {raw: true}).success(function (transitions) {


        if (transitions) {
            res.json(transitions); //On envoi au format JSON
        } else {
            res.send("Error 404");
        }

    }).error();


});


/* Retourne les traces par usager */
/*transition.get('/id/:id_user',function(req,res){

 models.dbcmc.Usersummary.findAll({where :{ Usager : req.params.id_user}},{raw:true}).success(function(transitions){


 if(transitions){
 res.json(users); //On envoi au format JSON
 }else{
 res.send("Error 404");
 }

 }).error();


 });*/

module.exports = router;




