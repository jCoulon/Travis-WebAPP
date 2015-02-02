/**
 * Created by jonathancoulon on 31/01/15.
 */
var express = require('express');
var passport = require("passport");


exports.logIn = function(req,res,next){
    passport.authentificate("local",{
        SuccessRedirect:'/passwordOk',
        failureRedirect: '/login',
        failureFlash: true
    });
};

exports.estConnecte = function(req,res,next){

    res.send(req.isAuthenticated() ? req.user : '0');

};