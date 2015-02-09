/**
 * Created by jonathancoulon on 31/01/15.
 */

var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
var models = require('../models/index');


passport.serializeUser(function (user, done) {
    done(null, user.IDUser);
});

passport.deserializeUser(function (id, done) {

    findById(id).then(function (user) {
        console.log("login", user);
        if (!user)
            done(null, false);
        done(null,user);


    }, function (error) {
        return done(null, error);
    });


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
        return done(null, error);
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
function utilisateurDejaConnecte(req, res, next) {
    console.info(req.isAuthenticated(), req.user);
    res.send(req.isAuthenticated() ? req.user.toJSON() : 'non_connecte');
}

function findById(IDUser) {

    var promise = models.db.User.find(IDUser);

    return promise;
}

function seConnecter(req, res, next) {
    passport.authenticate('local', function (err, user) {
        if (err) next();
        if (!user) {
            res.status(401).end();
        }

        req.logIn(user, function (error) {
            if (error) next();

           return res.send(user.toJSON());
        });


    })(req, res, next);
}

exports.findById = findById;

exports.seConnecter = seConnecter;

exports.utilisateurDejaConnecte = utilisateurDejaConnecte;