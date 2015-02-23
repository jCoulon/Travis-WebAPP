var models = require('../models/index');

/***********************************************
 Fonctions Accesseurs  userparam
 /************************************************/


/**
 * Retourne parametre avec l'id id
 * @param id
 * @param user
 * @returns {Promise.<Instance>}
 */
function getParamByID(id, user) {
    return models.db.UserParam.findOne({
        where: {
            IDParam: id,
            Username: user
        }
    });
}

/**
 * Retourne tous les groupes de l'utilisateur
 * @param user
 * @returns {Promise.<Array.<Instance>>}
 */
function getParamAllGroup(user) {
    return models.db.UserParam.findAll({
        where: {
            Username: user,
            ParamName1: "group"
        }
    });
}

/**
 * Retourne toutes les users
 * @param user
 * @returns {Promise.<Array.<Instance>>}
 */
function getParamAllUser(user) {
    return models.db.UserParam.findAll({
        where: {
            Username: user
        }
    });
}

/**
 * Retourne tous les agregs
 * @param user
 * @returns {Promise.<Array.<Instance>>}
 */
function getParamAllAgreg(user) {
    return models.db.UserParam.findAll({
        where: {
            Username: user,
            ParamName1: "user",
            ParamValue1: "agreg"
        }
    });
}

/**
 * Retourne tous les discu
 * @param user
 * @returns {Promise.<Array.<Instance>>}
 */
function getParamAllDiscu(user) {
    return models.db.UserParam.findAll({
        where: {
            Username: user,
            ParamName1: "group",
            ParamValue1: "discu"
        }
    });
}

/**
 * Retourne tous les coops
 * @param user
 * @returns {Promise.<Array.<Instance>>}
 */
function getParamAllCoop(user) {
    return models.db.UserParam.findAll({
        where: {
            Username: user,
            ParamName1: "group",
            ParamValue1: "coop"
        }
    });
}

/**
 * Retourne toutes les colabs
 * @param user
 * @returns {Promise.<Array.<Instance>>}
 */
function getParamAllColab(user) {
    return models.db.UserParam.findAll({
        where: {
            Username: user,
            ParamName1: "group",
            ParamValue1: "colab"
        }
    });
}


function createParam(user, type, value, desc) {
    return models.db.UserParam.create({
        Username: user,
        ParamName1: type,
        ParamValue1: value,
        Description1: desc
    });
}
/************************************************
 Fonction gestion de groupe
 /************************************************/

/**
 * Ajoute un user dans un groupe
 * @param param
 * @param desc
 */
function addInGroup(param, desc) {
    var cdesc = param.get('Description1'),
        nvalue = cdesc + "," + desc;

    param.Description1 = nvalue;
    param.save().then(function () {
        console.log("mise a jour effectué")
    });
}

/**
 * Supprime un user dans un groupe
 * @param param
 * @param desc
 */
function deleteInGroup(param, desc) {
    var cdesc = param.get('Description1'),
        split = cdesc.split(",");
    var index = split.indexOf(desc),
        res;

    /** Supprime elt du tableau **/
    if (index !== -1) {
        split = split.splice(index, 1);
        res = split.join();
    }

    param.Description1 = res;
    param.save().then(function () {
        console.log("mise a jour effectué")
    });

}

/**
 * Supprime un parametre de l'utilisateur
 * @param param
 * @param desc
 */
function deleteParam(param, desc) {
    var cdesc = param.get('Description1'),
        split = cdesc.split(",");
    var index = split.indexOf("desc"),
        res;

    /** Supprime elt du tableau **/
    if (index !== -1) {
        split = split.splice(index, 1);
        res = split.join();
    }

    param.Description1 = res;
    param.save().then(function () {
        console.log("mise a jour effectué")
    });

}

exports.getParamByID = getParamByID;
exports.getParamAllUser = getParamAllUser;
exports.getParamAllGroup = getParamAllGroup;
exports.getParamAllAgreg = getParamAllAgreg;
exports.getParamAllDiscu = getParamAllDiscu;
exports.getParamAllCoop = getParamAllCoop;
exports.getParamAllColab = getParamAllColab;
exports.createParam = createParam;
exports.addInGroup = addInGroup;
exports.deleteInGroup = deleteInGroup;
exports.deleteParam = deleteParam;