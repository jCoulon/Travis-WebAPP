/**
 * Created by jonathancoulon on 31/01/15.
 */

var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
var models = require('../models/index');


passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (id, done) {

    done(null, user);

});


passport.use(new LocalStrategy(function (username, password, done) {
    //TODO comparaison password

    models.db.User.find({where: {Login: username}}).then(function (user) {
        console.log("login");
        if (!user)
            return done(null, false);
        if (user.Password === password) {
            return done(null, user);
        } else {
            return done(null, false);
        }

    }, function (error) {
        return done(null,error);
    })


}));

/**
 * Verifie si l'utilisateur est deja connecté
 * Si OUI on passe au callback suivant
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.utilisateurDejaConnecte = function (req, res, next) {

    if (req.isAuthenticated()) {
        next();
    }
    res.redirect("/login");


};

exports.findById = function (req, res) {

    models.db.User.find({where: {Login: req.params.username}}).then(function (user) {
        var password = "";
        if (!user)
            return ok(null, false, {message: 'utilisateur inconnu ' + username});
        if (user.Password === req.params.password) {
            return done(null, user);
        } else {
            return done(null, false, {message: 'Mot de passe invalide'});
        }

    });

};


exports.findByIdTest = function (req, res) {

    models.db.User.find({where: {Login: req.params.username}}).then(function (user) {
        var password = "";
        if (!user)
            console.info("Login inconu");
        if (user.Password === req.params.password) {
            console.info("Login ok");
        } else {
            console.info("Mauvais mot de passe");
        }

    });

};
