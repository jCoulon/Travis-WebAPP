var express = require('express');
var Sequelize = require('sequelize');

module.exports = (function() {
    'use strict';
    var notes = express.Router();
    var models  = require('../../models/index');
    var sequelize = new Sequelize();

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
        if(typeof req.body.Username !== 'undefined' && typeof req.body.Share !== 'undefined' && typeof req.body.NbMax !== 'undefined' && typeof req.body.Note !== 'undefined' && typeof req.body.Date !== 'undefined' && typeof req.body.Lastaccess !== 'undefined' && req.body.Titre !== 'undefined') {
            models.db.Notes.create({
                IdNotes: null,
                Username: req.body.Username,
                Share: req.body.Share,
                NbMax: req.body.NbMax,
                Titre: req.body.Titre,
                Note: req.body.Note,
                Date: req.body.Date,
                Lastaccess: req.body.Lastaccess
            }).success(function (data) {
                console.log(data);
                res.json(data.dataValues.IdNotes).end();
            }).error(function(){
                res.send(424);
            });
        }else{
            res.send(500);
        }
    });

    notes.post('/addShareNote', function(req, res){
        if(typeof req.body.Username !== 'undefined' && typeof req.body.IdNote !== 'undefined' && typeof req.body.DateShare !== 'undefined' && typeof req.body.LastAccess !== 'undefined' ) {
            models.db.ShareNotes.create({
                IdNotes: null,
                Username: req.body.Username,
                IdNote: req.body.IdNote,
                DateShare: req.body.DateShare,
                LastAccess: req.body.LastAccess
            }).success(function () {
                res.send(200).end();
            }).error(function () {
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