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

/* Retourne toutes les users. */
router.get('/usager/getAllUsers', function (req, res) {
    models.dbcmc.Usersummary.findAll({attributes: ['User']}, {raw: true}).then(function (users) {
        if (users) {

            res.json(users); //On envoi au format JSON
        } else {
            res.send("Error 404");
        }


    });


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
        titre: "agreg",
        charts: []
    };


    var promiseArray = [agreg.getNbConnexion(usager), agreg.getNbMessagePostes(usager), agreg.getNbMessageRep(usager), agreg.getNbMessageCite(usager)];
    var chartUser = {
        usager: usager,
        type: "Radar",
        data: []
    };
    /**
     * allSettled Attend que toutes les promise sont finis
     * Soit reussi  = fulfilled
     * ou  echoué = rejected
     */
    q.allSettled(promiseArray).then(function (resultArray) {
        var dataChart = {};

        if (resultArray[0].state == "fulfilled") {
            dataChart.nbConnexions = resultArray[0].value;
        } else {
            console.log("error ", resultArray[0].reason);
        }
        if (resultArray[1].state == "fulfilled") {
            dataChart.nbMessagePostes = resultArray[1].value;
        } else {
            console.log("error ", resultArray[1].reason);
        }
        if (resultArray[2].state == "fulfilled") {
            dataChart.nbMessageReps = resultArray[2].value;
        } else {
            console.log("error ", resultArray[2].reason);
        }
        if (resultArray[3].state == "fulfilled") {
            dataChart.nbMessageCites = resultArray[3].value;
        } else {
            console.log("error ", resultArray[3].reason);
        }
        chartUser.data.push(dataChart)
        resultat.charts.push(chartUser);

        res.json(resultat);
    }).catch(function (err) {
        console.log("Erreur", err);
    });
});


/* Retourne les traces pour discu  par usager
 *
 *
 * */
router.get('/usager/discu/:usager_nom', function (req, res) {
    var usager = req.params.usager_nom;
    var resultat = {
        titre: "discu",
        usager: usager,
        browsing: "",
        forumActivites: "",
        nbMessagesLus: "",
        nbMessagesReps: "",
        nbChat: ""
    };
    var promiseArray = [discu.getBrowsing(usager), discu.getForumAcitivites(usager), discu.getNbMessagesLus(usager), discu.getNbMessageRep(usager), discu.getNbNbChat(usager)];

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

        if (resultArray[4].state == "fulfilled") {
            resultat.nbChat = resultArray[4].value['Nbchat'];
        }
        else {
            console.log("error ", resultArray[4].reason, resultArray[4].value);
        }


        res.json(resultat);//On envoie le resultat en JSON au client

    }).catch(function (err) {
        console.log("Erreur", err);
    });

});
/* Retourne les traces pour discu  par usager
 *
 *
 * */
router.post('/usager/discu/group/', function (req, res) {

    var group = req.body,
        allPromises = [],//Les requetes lancés pour le traitement async;
        promiseArray;

    console.log(req.body);
    var resultat = {
        titre: "discu",
        charts: []
    };

    /**
     * allSettled Attend que toutes les promise sont finis
     * Soit reussi  = fulfilled
     * ou  echoué = rejected
     */
    group.forEach(function (userInGroup) { //Pour chaque user du groupe
        var chartUser = {
            usager: userInGroup,
            type: "Radar",
            data: []
        };
        var deferred = q.defer(); //Utilisé pour attendre que tout le foreach soit fini

        promiseArray = [discu.getBrowsing(userInGroup), discu.getForumAcitivites(userInGroup), discu.getNbMessagesLus(userInGroup), discu.getNbMessageRep(userInGroup), discu.getNbNbChat(userInGroup)];


        allPromises.push(deferred.promise);//Requete en attente de resultat

        q.allSettled(promiseArray).then(function (resultArray) {
            var dataChart = {};

            if (resultArray[0].state == "fulfilled") {//Async complete
                dataChart.browsing = resultArray[0].value;
            } else {//Erreur lors de la requete async
                console.log("error ", resultArray[0].reason);
            }

            if (resultArray[1].state == "fulfilled") {
                var instance = resultArray[1].value;//Resultat de la requete

                forumCountProcess(instance);

                dataChart.forumActivites = discu.getForumCount();

            } else {
                console.log("error ", resultArray[1].reason, resultArray[1].value);
            }

            if (resultArray[2].state == "fulfilled") {
                dataChart.nbMessagesLus = resultArray[2].value;
            }
            else {
                console.log("error ", resultArray[2].reason, resultArray[2].value);
            }

            if (resultArray[3].state == "fulfilled") {
                dataChart.nbMessagesReps = resultArray[3].value;
            }
            else {
                console.log("error ", resultArray[3].reason, resultArray[3].value);
            }

            if (resultArray[4].state == "fulfilled") {
                dataChart.nbChat = resultArray[4].value['Nbchat'];
            }
            else {
                console.log("error ", resultArray[4].reason, resultArray[4].value);
            }
            chartUser.data.push(dataChart);
            resultat.charts.push(chartUser);//Ajoute le chart généré dans le tableau

            deferred.resolve();//Requete Async fini
        }).catch(function (err) {
            console.log("Erreur", err);
        });


    })

    //Une fois que le resultat des requetes sont complétés on envoie au client
    q.all(allPromises).then(function () {
        res.json(resultat);
    });
});

/**
 * Retourne indicateur colaboration
 */
router.post('/usager/colab/group', function (req, res) {
    var group = req.body["group"];
    var forums = req.body["forums"];
    var promiseArray,//Les requete à effectuer
        allPromises = [];//Les requetes lancés pour le traitement async
    var globalStat = {
        titre: "colab",
        charts: []
    };
    var chart = {
        usager: "Group",
        type: "Radar",
        data: []
    };
    group.forEach(function (userInGroup) { //Pour chaque user du groupe
        var deferred = q.defer(); //Utilisé pour attendre que tout le foreach soit fini
        var user = {name: userInGroup, forums: []};

        allPromises.push(deferred.promise);//Requete en attente de resultat

        forums.forEach(function (forum) {//Pour chaque forum voulu
            var userStat = {IDForum: forum};//Init les statistiques de l'user dans le forum donnée
            console.log(userInGroup, forum);
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
                console.log(userStat, forum);
                deferred.resolve();//Requete Async fini
            });

        });
        q.all(allPromises).then(function () {
            chart.data.push(user);//Ajoute les stats de l'user sur les forums
        });


    });

//Une fois que le resultat des requetes sont complétés on envoie au client
    q.all(allPromises).then(function () {
        globalStat.charts.push(chart);
        setTimeout(function () {
            res.json(globalStat);
        }, 1000)
    });

});


/**
 * Compte le nb de forum subsribe par l'user
 * @param instance
 */
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




