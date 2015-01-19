var express = require('express');

module.exports = (function() {
    'use strict';
    var transition = express.Router();
    var models  = require('../../models/index');

    /* Retourne toutes les traces. */
    transition.get('/getAll',function(req, res) {
        models.dbcmc.Transition.findAll({},{raw:true}).success(function(activites){
            if(activites){
                res.json(activites); //On envoi au format JSON
            }else{
                res.send("Error 404");
            }


        }).error();

    });

    /* Retourne les traces par usager */
    transition.get('/type/:type_id',function(req,res){

        models.Activite.findAll({where :{ TypeAct : req.params.type_id}},{raw:true}).success(function(activites){


            if(activites){
                res.json(activites); //On envoi au format JSON
            }else{
                res.send("Error 404");
            }

        }).error();


    });

    /* Retourne les traces par usager */
    transition.get('/usager/:usager_nom',function(req,res){

        models.Transition.findAll({where :{ Usager : req.params.usager_nom}},{raw:true}).success(function(transitions){


            if(transitions){
                res.json(transitions); //On envoi au format JSON
            }else{
                res.send("Error 404");
            }

        }).error();


    });


    /* Retourne les traces par usager */
    transition.get('/id/:id_user',function(req,res){

        models.Usersummary.findAll({where :{ Usager : req.params.id_user}},{raw:true}).success(function(transitions){


            if(transitions){
                res.json(users); //On envoi au format JSON
            }else{
                res.send("Error 404");
            }

        }).error();


    });

    return transition;
})();




