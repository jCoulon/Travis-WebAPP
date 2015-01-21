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
        if(typeof req.query.username !== 'undefined' && typeof req.query.share !== 'undefined' && typeof req.query.nbmax !== 'undefined' && typeof req.query.note !== 'undefined' && typeof req.query.date !== 'undefined' && typeof req.query.lastaccess !== 'undefined') {
            models.db.Notes.create({
                IdNotes: null,
                Username: req.query.username,
                Share: req.query.share,
                NbMax: req.query.nbmax,
                Note: req.query.note,
                Date: req.query.date,
                Lastaccess: req.query.lastaccess
            }).then(function () {
                console.log("inséré");
                res.send(200).end();
            }).error(function(){
                res.send(424);
            });
        }
    });

    notes.get('/getUsernote/:username', function(req, res){
            models.db.Notes.findAll({where :{ Username : req.params.username}},{raw:true}).success(function(activites){
                res.json(activites);
            });
        });

    notes.get('/getShareNote/:id', function(req, res){
        models.db.ShareNotes.findAll({where :{ IDNote : req.params.id}},{raw:true}).success(function(activites){
            res.json(activites);
        });
    });

    return notes;
})();
