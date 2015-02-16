/**
 * Created by jonathancoulon on 31/01/15.
 */

var models = require('../models/index');
var Sequelize = require("sequelize");
var forumActivite = [];
var forumActiviteCount = 0;

/**
 * Retourne une promise du browsing d'un usager
 * Le browsing est considéré comme le nombre de fois où l'usager affiche un cours, un thread,...
 * @param usager
 * @returns {*|Promise.<Integer>}
 */
function getBrowsing(usager) {

    var promise = models.dbcmc.Transition.count({
        where: {
            Usager: usager,
            Titre: {
                like: 'Afficher %'
            }
        }
    });

    return promise;
}

/**
 * Nombre de message lu par l'usager
 * @param usager
 * @returns {*|Promise.<Integer>}
 */
function getNbMessagesLus(usager) {

    var promise = models.dbcmc.Transition.count({
        where: {
            Usager: usager,
            Titre: "Afficher le contenu d'un message"
        }
    });

    return promise;
}

/**
 * Retourne une promise du nombre de forum où l'usager est actif
 * @param usager
 * @returns {Promise.<Array.<Instance>>}
 */
function getForumAcitivites(usager) {

    var promise = models.dbcmc.Transition.findAll({
        where: Sequelize.and(
            {Usager: usager},
            Sequelize.or(
                {Titre: "Répondre à un message"},
                {Titre: "Poster un nouveau message"}
            )
        ),
        attributes: ["Attribut"],
        raw: true
    });


    return promise;
}


/**
 * Retourne le nombre de message repondu par l'usager
 * @param usager
 * @returns {*|Promise.<Integer>}
 */
function getNbMessageRep(usager) {

    var promise = models.dbcmc.Transition.count({
        where: {
            Usager: usager,
            Titre: "Repondre a un message"
        }
    }, {raw: true});

    return promise;
}


/**
 * Fonction pour compter le nombre de forum où l'utilisateur a soit poster ou répondu à un message
 * @param forum
 */
function addAcitiviteForum(forum) {
    //Non present
    if (forumActivite.indexOf(forum) === -1) {
        forumActivite.push(forum);
        forumActiviteCount++;
    }
}

/**
 * Retourne le nombre de forum utilisé par l'utlisateur
 * @returns {number}
 */
function getForumCount() {
    //Non present
    return forumActiviteCount;
}
/**
 * Retourne la liste des forum utilisé par l'utlisateur
 * @returns {number}
 */
function getListForum() {
    //Non present
    return forumActivite;
}


exports.getBrowsing = getBrowsing;
exports.getNbMessagesLus = getNbMessagesLus;
exports.getForumAcitivites = getForumAcitivites;
exports.getForumCount = getForumCount;
exports.addAcitiviteForum = addAcitiviteForum;
exports.getNbMessageRep = getNbMessageRep;
exports.getListForum = getListForum;