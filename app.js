var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use('/bower_components',  express.static(__dirname + '/bower_components')); //repertoire bower

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
app.use('/users', users);
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

// error handlers

app.get("/",function(req,res){
    res.render("index");
});

app.get("/partials/:name",function(req,res){
    console.log("here");
    res.render("partials/"+req.params.name);
});

module.exports = app;
