/**
 * Created by jonathancoulon on 31/01/15.
 */

var models = require('../models/index');


function getNbConnexion(usager) {

    var promise = models.dbcmc.Transition.count({
        where: {
            Usager: usager,
            Titre: "Connexion"
        }
    }, {raw: true});

    return promise;
}

function getNbMessagePostes(usager) {

    var promise = models.dbcmc.Transition.count({
        where: {
            Usager: usager,
            Titre: "Poster un nouveau message"
        }
    }, {raw: true});

    return promise;
}

function getNbMessageRep(usager) {

    var promise = models.dbcmc.Transition.count({
        where: {
            Usager: usager,
            Titre: "Repondre a un message"
        }
    }, {raw: true});

    return promise;
}

function getNbMessageCite(usager) {

    var promise = models.dbcmc.Transition.count({
        where: {
            Usager: usager,
            Titre: "Citer un message"
        }
    }, {raw: true});

    return promise;
}

function getNbMessageCite(usager) {

    var promise = models.dbcmc.Transition.count({
        where: {
            Usager: usager,
            Titre: "Citer un message"
        }
    }, {raw: true});

    return promise;
}



exports.getNbConnexion = getNbConnexion;
exports.getNbMessagePostes = getNbMessagePostes;
exports.getNbMessageRep = getNbMessageRep;
exports.getNbMessageCite = getNbMessageCite;


/**
 * Created by jonathancoulon on 15/02/15.
 */
