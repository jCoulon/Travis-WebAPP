var express = require('express');
var Sequelize = require('sequelize');

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
        if(typeof req.query.username !== 'undefined' && typeof req.query.share !== 'undefined' && typeof req.query.nbmax !== 'undefined' && typeof req.query.note !== 'undefined' && typeof req.query.date !== 'undefined' && typeof req.query.lastaccess !== 'undefined' && req.query.titre !== 'undefined') {
            models.db.Notes.create({
                IdNotes: null,
                Username: req.query.username,
                Share: req.query.share,
                NbMax: req.query.nbmax,
                Titre: req.query.titre,
                Note: req.query.note,
                Date: req.query.date,
                Lastaccess: req.query.lastaccess
            }).then(function () {
                res.send(200).end();
            }).error(function(){
                res.send(424);
            });
        }
    });

    notes.get('/getUsernote/:username', function(req, res){
           models.db.Notes.findAll({where : Sequelize.and({ Username : req.params.username}, {Share : 0})},{raw:true}).success(function(activites){
                res.json(activites);
            });
        });

    notes.get('/getShareNote/:username', function(req, res){
        models.db.Notes.findAll({where :Sequelize.and({ Username : req.params.username}, {Share : 1})}).success(function(activites){
            res.json(activites);
        });
    });

    notes.get('/getIdShareNoteWith/:username', function(req, res){
        models.db.ShareNotes.findAll({where : "Username REGEXP '"+req.params.username+"'"},{raw:true}).success(function(activites){
            res.json(activites);
        });
    });

    notes.get('/getShareNoteWith/:ids', function(req, res){
        var idsReg = /-/;
        var ids = req.params.ids.split(idsReg);
        models.db.Notes.findAll({where : {IdNotes : ids}},{raw:true}).then(function(activites){
            res.json(activites);
        });
    });

    notes.get('/getAutocompleteName/:name', function(req, res){
        models.db.User.findAll({where : "Name REGEXP '"+req.params.name+"' OR Surname REGEXP '"+req.params.name+"' OR Login REGEXP '"+req.params.name+"'"},{raw:true}).then(function(data){
            res.json(data);
        });
    });
    notes.get('/getShareNoteById/:id', function(req, res){
        models.db.ShareNotes.findAll({where : {IDNote : req.params.id}},{raw:true}).then(function(activites){
            res.json(activites);
        });
    });

    notes.get('/getNoteById/:id', function(req, res){
        models.db.Notes.findAll({where : {IdNotes : req.params.id}},{raw:true}).then(function(activites){
            res.json(activites);
        });
    });

    return notes;
})();


/**

 SELECT *
 FROM User_notes, User_sharenote
 WHERE User_notes.IDNotes = User_sharenote.IDShare
 AND User_notes.Username = "SimonL"

 SELECT *
 FROM User_notes, User_sharenote
 WHERE User_sharenote.Username REGEXP "SimonL"
 AND User_sharenote.IDNote = User_notes.IDNotes

 */