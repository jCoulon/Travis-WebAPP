var models  = require('../../models/index');
var express = require('express');
var router = express.Router();

/* Retourne toutes les traces. */
router.get('/api/getAllNotes',function(req, res) {
    models.Notes.findAll({},{raw:true}).success(function(activites){
        if(activites){
            res.json(activites); //On envoi au format JSON
        }else{
            res.send("Error 404");
        }


    }).error();

});