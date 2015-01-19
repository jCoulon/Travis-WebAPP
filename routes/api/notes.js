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

    notes.post('/addNote', function(req, res){
        /*models.db.Notes.create({
            IdNotes : null,
            Username: req.params.username,
            Share: req.params.share,
            NbMax: req.params.nbMax,
            Note: req.params.note,
            Date: req.params.date,
            Lastaccess: req.params.lastaccess
        }).then(function(){
            console.log("inséré")
        });*/
    });

    return notes;
})();

//addNote/GweltazL/0/4//:date/:lastaccess