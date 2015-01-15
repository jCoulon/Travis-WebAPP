'use strict';


angular.module('TravisAPP')

    .directive('indicateurArea',indicateurArea);

/**
 * Fonction indicateur
 */
function indicateurArea($compile){

    /**
     * Le HTML transcludé ne fait pas parti du même scope que la directive ci.
     * Voir :http://www.sitepoint.com/practical-guide-angularjs-directives-part-two/
     */

    var ind = {
        restrict:"E", //Element Attributs,
        template:"<input ng-model='titre' placeholder='Titre' required/><input ng-model='type'  palceholder='type' required/><button ng-click='ajouterNouvelIndicateur()'>Ajouter un nouvel indicateur</button>" +
        "<div ng-repeat='indicateur in indicateurs'>" +
            "<div class='indicateurTitre'>" +
                 "<label>{{indicateur.titre}}</label>" +
                 "<button ng-click='supprimerIndicateur(indicateur)'>Supprimer</button>" +
            "</div>"+
        "<div class='indicateurContenu'></div></div>"
        ,

         scope:{
             options : '=' //Reference à la valeur de l'attribut options (voir dataviz.jade)
        },
        controller:['$scope', '$attrs', function (scope, attrs){



        }],
        link:function link(scope,element,attrs){

            console.log("here");

            /**
             * Recuperation des indicateurs à charger
             */
            scope.indicateursDefaut = scope.options.indicateurs;

            /**
             * Fonction d'ajout d'un indicateur
             */

            scope.ajouterIndicateur = function(ind){
                console.log("ajouter indicateur"+ind.titre);
                var indicateur = ind;

                /** Chargement du modèle de l'indicateur**/

                scope.indicateurs.push(indicateur);

            };

            scope.ajouterNouvelIndicateur = function(){
                var ind = {titre : scope.titre,type:scope.type};
                scope.ajouterIndicateur(ind);
            };

            /**
             * Supprimer un indicateur
             * @param ind
             */
            scope.supprimerIndicateur = function(ind){
                console.log("suppresion d'un indicateur "+ind.titre);
                var index = scope.indicateurs.indexOf(ind);
                scope.indicateurs.splice(index,1);
            };

            /**
             * Chargement des indicateurs
             * @param indicateurs
             */
            scope.chargerIndicateurs = function(indicateurs){
                console.log("charger indicateur");

                angular.forEach(indicateurs,function(ind){
                    console.log(ind);

                    scope.ajouterIndicateur(ind);
                });
            };

            /*
            * Supprimer tous les indicateurs
             */
            scope.effacer = function(){
                scope.indicateurs = [];
            };

            scope.effacer();//init
            scope.chargerIndicateurs(scope.indicateursDefaut);//Chargement des indicateurs présents

            console.log(scope.indicateurs);
        }
    };

    return ind;

};

