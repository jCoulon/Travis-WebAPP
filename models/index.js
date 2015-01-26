"use strict";

/*  Connexion à la base de données de TRAVIS!  */

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var env       = process.env.NODE_ENV || "development";
/* BDD TRAVIS */
var config    = require(__dirname + '/../config/config.json')[env];
var travis = new Sequelize(config.database, config.username, config.password, config);

var db        = {};

/* BDD CMC */
var configcmc    = require(__dirname + '/../config/configcmc.json')[env];
var cmc = new Sequelize(configcmc.database, configcmc.username, configcmc.password, configcmc);

var dbcmc        = {};

/* BDD TRAVIS */
travis
  .authenticate()
  .complete(function(err) {
    if (!!err) {
      console.log('Impossible de se connecter à la base de données de TRAVIS :', err)
    } else {
      console.log('Connexion à la base de données de TRAVIS effectué !! ')
    }
  });

/* BDD CMC */
cmc
    .authenticate()
    .complete(function(err) {
      if (!!err) {
        console.log('Impossible de se connecter à la base de données de CMC :', err)
      } else {
        console.log('Connexion à la base de données de CMC effectué !! ')
      }
    });


/*fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = travis["import"](path.join(__dirname, file));
    db[model.name] = model;
  });*/

fs
    .readdirSync(__dirname+"/travis")
    .forEach(function(file) {
      var model = travis["import"](path.join(__dirname+"/travis", file));
      db[model.name] = model;
    });

fs
    .readdirSync(__dirname+"/cmc")
    .forEach(function(file) {
      var model = cmc["import"](path.join(__dirname+"/cmc", file));
      dbcmc[model.name] = model;
    });

  Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
      db[modelName].associate(db);
    }
  });

  Object.keys(dbcmc).forEach(function(modelName) {
    if ("associate" in dbcmc[modelName]) {
      dbcmc[modelName].associate(dbcmc);
    }
  });

db.sequelize = travis;
db.Sequelize = Sequelize;

dbcmc.sequelize = cmc;
dbcmc.Sequelize = Sequelize;

module.exports = {
  db: db,
  dbcmc:dbcmc
};
