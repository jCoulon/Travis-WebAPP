var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

/*  Configuration de l'api rest  */
var Sequelize = require('sequelize');
var restful   = require('sequelize-restful');

/*  Définition des routes de l'api, toutes les routes sont séparées par fichiers représentant chacune
une fonction différente. Par exemple, les routes nécessaires aux notes sont dans le fichier note.js.   */
var notes = require('./routes/api/notes');
var transition = require('./routes/api/transition');

/*  Définition du/des models nécessaires à sequelize  */
var model = require('./models/index.js');
var sequelize = model.sequelize;

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/api/notes',notes);
app.use('/api/transition', transition);

/*  API REST  */
app.use(restful(sequelize));

//app.use('/api', function(req, res){});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
