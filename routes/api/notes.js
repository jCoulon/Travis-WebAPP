'use strict';
var express = require('express');
var Sequelize = require('sequelize');
var router = express.Router();
var models = require('../../models/index');

router.get('/getAllNotes', function (req, res) {
    models.db.Notes.findAll({}, {raw: true}).success(function (activites) {
        if (activites) {
            res.json(activites); //On envoi au format JSON
        } else {
            res.send("Error 404");
        }


    }).error();

});

router.post('/addNote', function (req, res) {
    if (typeof req.body.Username !== 'undefined' && typeof req.body.Share !== 'undefined' && typeof req.body.NbMax !== 'undefined' && typeof req.body.Note !== 'undefined' && typeof req.body.Date !== 'undefined' && typeof req.body.Lastaccess !== 'undefined' && req.body.Titre !== 'undefined') {
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
        }).error(function () {
            res.send(424);
        });
    } else {
        res.send(500);
    }
});

router.post('/addShareNote', function (req, res) {
    if (typeof req.body.Username !== 'undefined' && typeof req.body.IdNote !== 'undefined' && typeof req.body.DateShare !== 'undefined' && typeof req.body.LastAccess !== 'undefined') {
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

router.get('/getUsernote/:username', function (req, res) {
    models.db.Notes.findAll({where: Sequelize.and({Username: req.params.username}, {Share: 0})}, {raw: true}).success(function (activites) {
        res.json(activites);
    });
});

router.get('/getShareNote/:username', function (req, res) {
    models.db.Notes.findAll({where: Sequelize.and({Username: req.params.username}, {Share: 1})}).success(function (activites) {
        res.json(activites);
    });
});

router.get('/getIdShareNoteWith/:username', function (req, res) {
    models.db.ShareNotes.findAll({where: "Username REGEXP '" + req.params.username + "'"}, {raw: true}).success(function (activites) {
        res.json(activites);
    });
});

router.get('/getShareNoteWith/:ids', function (req, res) {
    var idsReg = /-/;
    var ids = req.params.ids.split(idsReg);
    models.db.Notes.findAll({where: {IdNotes: ids}}, {raw: true}).then(function (activites) {
        res.json(activites);
    });
});

router.get('/getAutocompleteName/:name', function (req, res) {
    models.db.User.findAll({where: "Name REGEXP '" + req.params.name + "' OR Surname REGEXP '" + req.params.name + "' OR Login REGEXP '" + req.params.name + "'"}, {raw: true}).then(function (data) {
        res.json(data);
    });
});

router.get('/getShareNoteById/:id', function(req, res){
    models.db.ShareNotes.findAll({where : {IDNote : req.params.id}},{raw:true}).then(function(activites){
        res.json(activites);
    });
});

router.get('/getNoteById/:id', function(req, res){
    models.db.Notes.findAll({where : {IdNotes : req.params.id}},{raw:true}).then(function(activites){
        res.json(activites);
    });
});

module.exports = router;
