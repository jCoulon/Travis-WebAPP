'use strict';
var express = require('express');
var sequelize = require('sequelize');
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
    if (typeof req.query.username !== 'undefined' && typeof req.query.share !== 'undefined' && typeof req.query.nbmax !== 'undefined' && typeof req.query.note !== 'undefined' && typeof req.query.date !== 'undefined' && typeof req.query.lastaccess !== 'undefined' && req.query.titre !== 'undefined') {
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

module.exports = router;