/**
 * Created by jonathancoulon on 31/01/15.
 */

var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
var models = require('../models/index');

/**
 * Serialise data user
 * */
passport.serializeUser(function (user, done) {
    done(null, user.IDUser);
});

/**
 * Deserialise data user
 */
passport.deserializeUser(function (id, done) {

    findById(id).then(function (user) {
        if (!user)
            done(null, false);
        done(null, user);


    }, function (error) {
        return done(null, error);
    });


});

/**
 * Passportjs
 *  Local strategy
 *  Lien avec la base de données
 */
passport.use(new LocalStrategy(function (username, password, done) {

    models.db.User.find({where: {Login: username}}).then(function (user) {
        //User non trouvé
        if (!user) {
            return done(null, false); //done() envoie notification quand traitement async fini
        }
        //Connexion ok
        if (user.Password === password) {
            return done(null, user);
        }
        //Mauvais mot de passe
        else {
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
    res.send(req.isAuthenticated() ? req.user.toJSON() : 'non_connecte');
}

function findById(IDUser) {

    var promise = models.db.User.find(IDUser);

    return promise;
}

function seConnecter(req, res, next) {
    passport.authenticate('local', function (err, user) {
        if (err) next();
        //Erreur user n'existe pas
        if (!user) {
            res.status(401).end();//Envoie statut http 401 au client
        }
        //Auth ok
        else {

            req.logIn(user, function (error) {
                if (error) next();

                res.send(user.toJSON());
            });
        }


    })(req, res, next);
}

exports.findById = findById;

exports.seConnecter = seConnecter;

exports.utilisateurDejaConnecte = utilisateurDejaConnecte;