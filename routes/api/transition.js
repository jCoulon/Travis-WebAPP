"use strict";
var express = require('express');
var q = require("q");
var router = express.Router();
var models = require('../../models/index');
var agreg = require("../../config/agregIndicateur");
var discu = require("../../config/discuIndicateur");
var colab = require("../../config/colaIndicateur");

/* Retourne toutes les traces. */
router.get('/getAll', function (req, res) {
    models.dbcmc.Transition.findAll({}, {raw: true}).success(function (activites) {
        if (activites) {
            res.json(activites); //On envoi au format JSON
        } else {
            res.send("Error 404");
        }


    }).error();

});

/* Retourne les traces par type */
/* transition.get('/type/:type_id',function(req,res){

 models.dbcmc.Activite.findAll({where :{ TypeAct : req.params.type_id}},{raw:true}).success(function(activites){


 if(activites){
 res.json(activites); //On envoi au format JSON
 }else{
 res.send("Error 404");
 }

 }).error();


 });*/

/* Retourne les traces pour aggregation  par usager
 *
 *
 * */
router.get('/usager/agreg/:usager_nom', function (req, res) {
    var usager = req.params.usager_nom;
    var resultat = {
        nbConnexions: "",
        nbMessagePostes: "",
        nbMessageReps: "",
        nbMessageCites: ""
    };

    var promiseArray = [agreg.getNbConnexion(usager), agreg.getNbMessagePostes(usager), agreg.getNbMessageRep(usager), agreg.getNbMessageCite(usager)];

    /**
     * allSettled Attend que toutes les promise sont finis
     * Soit reussi  = fulfilled
     * ou  echoué = rejected
     */
    q.allSettled(promiseArray).then(function (resultArray) {
        if (resultArray[0].state == "fulfilled") {
            resultat.nbConnexions = resultArray[0].value;
        } else {
            console.log("error ", resultArray[0].reason);
        }
        if (resultArray[1].state == "fulfilled") {
            resultat.nbMessagePostes = resultArray[1].value;
        } else {
            console.log("error ", resultArray[1].reason);
        }
        if (resultArray[2].state == "fulfilled") {
            resultat.nbMessageReps = resultArray[2].value;
        } else {
            console.log("error ", resultArray[2].reason);
        }
        if (resultArray[3].state == "fulfilled") {
            resultat.nbMessageCites = resultArray[3].value;
        } else {
            console.log("error ", resultArray[3].reason);
        }

        res.json(resultat);
    }).catch(function (err) {
        console.log("Erreur", err);
    });

    /*agreg.getNbConnexion(usager).then(function (nbConnexions) {
     console.log(nbConnexions);
     resultat.nbConnexions = nbConnexions;
     return agreg.getNbMessagePostes(usager);
     }).then(function (nbMessagePostes) {
     resultat.nbMessagePostes = nbMessagePostes;
     console.log(nbMessagePostes);
     return agreg.getNbMessageRep(usager);
     }).then(function (nbMessageReps) {
     console.log(nbMessageReps);
     resultat.nbMessagePostes = nbMessageReps;
     return agreg.getNbMessageCite(usager);
     }).then(function (nbMessageCites) {
     console.log(nbMessageCites);
     resultat.nbMessageCites = nbMessageCites;

     }).catch(function (err) {
     console.log("Erreur", err);
     });*/


});


/* Retourne les traces pour coop  par usager
 *
 *
 * */
router.get('/usager/discu/:usager_nom', function (req, res) {
    var usager = req.params.usager_nom;
    var resultat = {
        browsing: "",
        forumActivites: "",
        nbMessagesLus: "",
        nbMessagesReps: ""
    };
    var promiseArray = [discu.getBrowsing(usager), discu.getForumAcitivites(usager), discu.getNbMessagesLus(usager), discu.getNbMessageRep(usager)];

    /**
     * allSettled Attend que toutes les promise sont finis
     * Soit reussi  = fulfilled
     * ou  echoué = rejected
     */
    q.allSettled(promiseArray).then(function (resultArray) {

        if (resultArray[0].state == "fulfilled") {//Async complete
            resultat.browsing = resultArray[0].value;
        } else {//Erreur lors de la requete async
            console.log("error ", resultArray[0].reason);
        }

        if (resultArray[1].state == "fulfilled") {
            var instance = resultArray[1].value;//Resultat de la requete

            forumCountProcess(instance);

            resultat.forumActivites = discu.getForumCount();

        } else {
            console.log("error ", resultArray[1].reason, resultArray[1].value);
        }

        if (resultArray[2].state == "fulfilled") {
            resultat.nbMessagesLus = resultArray[2].value;
        }
        else {
            console.log("error ", resultArray[2].reason, resultArray[2].value);
        }

        if (resultArray[3].state == "fulfilled") {
            resultat.nbMessagesReps = resultArray[3].value;
        }
        else {
            console.log("error ", resultArray[3].reason, resultArray[3].value);
        }


        res.json(resultat);//On envoie le resultat en JSON au client

    }).catch(function (err) {
        console.log("Erreur", err);
    });

});


router.get('/usager/colab/:groupList/:forumList', function (req, res) {
    var group = req.params.groupList;
    var forums = req.params.forumList;
    var promiseArray,//Les requete à effectuer
        allPromises = [];//Les requetes lancés pour le traitement async
    var globalStat = [];

    group.forEach(function (userInGroup) { //Pour chaque user du groupe
        var deferred = q.defer(); //Utilisé pour attendre que tout le foreach soit fini
        allPromises.push(deferred.promise);

        var user = {name: userInGroup, forums: []};

        forums.forEach(function (forum) {//Pour chaque forum voulu
            var userStat = {IDForum: forum};//Init les statistiques de l'user dans le forum donnée

            promiseArray = [colab.getBrowsingForum(userInGroup, forum), colab.getNbMessagesForum(userInGroup, forum),
                colab.getThreadForum(userInGroup, forum), colab.getNbFichiers(userInGroup, forum)];

            //Requete Async va lancé les 4 promises ci dessus à la suite et retourne un tableau
            q.allSettled(promiseArray).then(function (resultArray) {


                if (resultArray[0].state == "fulfilled") {//Async complete
                    userStat.browsing = resultArray[0].value;
                } else {//Erreur lors de la requete async
                    console.log("error ", resultArray[0].reason);
                }

                if (resultArray[1].state == "fulfilled") {//Async complete
                    userStat.nbMessages = resultArray[1].value;
                } else {//Erreur lors de la requete async
                    console.log("error ", resultArray[1].reason);
                }

                if (resultArray[2].state == "fulfilled") {//Async complete
                    userStat.nbThreads = resultArray[2].value;
                } else {//Erreur lors de la requete async
                    console.log("error ", resultArray[2].reason);
                }

                if (resultArray[2].state == "fulfilled") {//Async complete
                    userStat.nbFichiers = resultArray[3].value;
                } else {//Erreur lors de la requete async
                    console.log("error ", resultArray[3].reason);
                }

                user.forums.push(userStat);//Ajoute les stats du forum pour l'userInGroup
                console.log(user);
                deferred.resolve();//Requete Async fini
            });

        });

        globalStat.push(user);//Ajoute les stats de l'user sur les forums

    });

    //Une fois que le resultat des requetes sont complétés on envoie au client
    q.all(allPromises).then(function () {
        res.json(globalStat);
    });

});


function forumCountProcess(instance) {
    var data, string, split;
    /**
     * Split le resultat pour n'obtenir que l'ID du forum
     */
    instance.forEach(function (i) {
        data = JSON.stringify(i);
        string = data.split(",", 1);
        string.forEach(function (s) {
            split = s.split("=");
            discu.addAcitiviteForum(split[1]); //Ajoute au nb de forum utilisé par l'usager
        });
    });
}


module.exports = router;




