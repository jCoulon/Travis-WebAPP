var models = require('../models/index');
var Sequelize = require("sequelize");
var forumActivite = [];
var forumActiviteCount = 0;

/**
 * Retourne une promise du browsing d'un usager
 * Le browsing est considéré comme le nombre de fois où l'usager affiche un cours, un thread,...
 * FORUM ACCESS
 * @param usager
 * @returns {*|Promise.<Integer>}
 */
function getBrowsingForum(usager, forum) {

    var promise = models.dbcmc.Transition.count({
        where: {
            Usager: usager,
            Titre: {
                like: 'Afficher %'
            },
            Attribut: {
                like: "%IDForum=" + forum + ",%"
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
function getThreadForum(usager, forum) {

    var promise = models.dbcmc.Transition.count({
        where: {
            Usager: usager,
            Titre: "Poster un nouveau message",
            Attribut: {
                like: "%IDForum=" + forum + ",%"
            }
        }
    });

    return promise;
}

/**
 * Retourne une promise du nombre de messages pour un  forum donné où l'usager est actif
 * @param usager
 * @returns {Promise.<Array.<Instance>>}
 */
function getNbMessagesForum(usager, forum) {

    var promise = models.dbcmc.Transition.count({
            where: Sequelize.and(
                {Usager: usager}, {
                    Attribut: {
                        like: "%IDForum=" + forum + ",%"
                    }
                },
                Sequelize.or(
                    {Titre: "Répondre à un message"},
                    {Titre: "Poster un nouveau message"}
                )
            ),
            attributes: ["Attribut"],
            raw: true
        }
    );


    return promise;
}

/**
 * Retourne une promise du nombre de messages pour un  forum donné où l'usager est actif
 * @param usager
 * @returns {Promise.<Array.<Instance>>}
 */
function getNbFichiers(usager, forum) {

    var promise = models.dbcmc.Transition.count({
            where: Sequelize.and(
                {Usager: usager}, {
                    Attribut: {
                        like: "%IDForum=" + forum + ",%"
                    }
                },
                Sequelize.or(
                    {Titre: "Upload un fichier avec le message"}
                )
            ),
            attributes: ["Attribut"],
            raw: true
        }
    );


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


exports.getBrowsingForum = getBrowsingForum;
exports.getThreadForum = getThreadForum;
exports.getNbMessagesForum = getNbMessagesForum;
exports.getNbFichiers = getNbFichiers;
exports.getForumCount = getForumCount;
exports.addAcitiviteForum = addAcitiviteForum;
exports.getListForum = getListForum;
