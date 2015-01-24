'use strict';


angular.module('TravisAPP')

.directive('indicateurArea',indicateurArea);

/**
 * Fonction indicateurArea
 * Gestion des blocs type d'indicateurs
 *
 */
function indicateurArea($compile){

    var _ind = {
        restrict:"E", //Element Attributs,
        replace:true,
        templateUrl: "js/templates/indicateurAera.html",
         scope:{
            'options' : '=',
             'onSupp': '&'
        },
       controller:function($scope){
           this.supprimerIndicateur = function(ind){
               console.log("sup");
               // $scope.$parent.supprimerIndicateurBloc(ind);//Appel au scope parent A changer vers attributes &onSupp
                $scope.onSupp({indicateurBloc:ind});
           };
       },
        link:function link(scope,element,attrs){
            console.log(scope.options);
            /**
             * Recuperation des indicateurs à charger
             */



    /*        scope.indicateursDefaut = scope.options.indicateurBlocs;

            scope.effacer();//init
            scope.chargerIndicateursBlocs(scope.indicateursDefaut);//Chargement des indicateurs présents
            console.log(scope.indicateurBlocs);*/
        }
    };

    return _ind;



};

