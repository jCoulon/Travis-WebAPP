var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
//var routes = require('./routes/index');

/*  Configuration de l'api rest  */
//var Sequelize = require('sequelize');
var restful = require('sequelize-restful');

/*  Définition des routes de l'api, toutes les routes sont séparées par fichiers représentant chacune
 une fonction différente. Par exemple, les routes nécessaires aux notes sont dans le fichier note.js.   */
var notes = require('./routes/api/notes');
var transition = require('./routes/api/transition');

/*  Définition du/des models nécessaires à sequelize  */
var model = require('./models/index.js');
var sequelize = model.sequelize;

var routes = require('./routes/index');
var users_routes = require('./routes/api/users');

var app = express();

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use('/bower_components', express.static(__dirname + '/bower_components')); //repertoire bower

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));


app.use(passport.initialize());
app.use(passport.session());

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

//app.use('/', routes);
app.use('/api/notes', notes);
app.use('/api/transition', transition);
app.use('/api/users', users_routes);

/*  API REST  */
app.use(restful(sequelize));

//app.use('/api', function(req, res){});
app.use('/bower_components', express.static(__dirname + '/bower_components'));

// error handlers

app.get("/partials/:name", function (req, res) {
    console.log("here");
    res.render("partials/" + req.params.name);
});

/** Redirection vers l'index **/
app.get("/*", function (req, res) {
    res.render("index");
});

module.exports = app;
