var express = require('express');

module.exports = (function() {
    'use strict';
    var notes = express.Router();
    var models  = require('../../models/index');

    notes.get('/getAllNotes',function(req, res) {
        models.db.Notes.findAll({},{raw:true}).success(function(activites){
            if(activites){
                res.json(activites); //On envoi au format JSON
            }else{
                res.send("Error 404");
            }


        }).error();

    });

    return notes;
})();