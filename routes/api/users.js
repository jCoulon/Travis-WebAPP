/**
 * Created by LEDUNOIS Simon on 16/02/15.
 */

var express = require('express');
var Sequelize = require('sequelize');

module.exports = (function() {
    'use strict';
    var users = express.Router();
    var models  = require('../../models/index');

    users.get('/getAutocompleteName/:name', function(req, res){
        console.log("ici");
        models.db.User.findAll({where : "Name REGEXP '"+req.params.name+"' OR Surname REGEXP '"+req.params.name+"' OR Login REGEXP '"+req.params.name+"'"},{raw:true}).then(function(data){
            res.json(data);
        });
    });



    return users;
})();
