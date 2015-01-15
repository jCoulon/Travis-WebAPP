'use strict';


angular.module('TravisAPP')

.directive('indicateur',indicateur);

/**
 * Fonction indicateur
 */
function indicateur(){

    /**
     * Le HTML transcludé ne fait pas parti du même scope que la directive ci.
     * Voir :http://www.sitepoint.com/practical-guide-angularjs-directives-part-two/
     */

    var ind = {
        transclude:true,
        template : "<div class='indicateur'>"+
            "<div class='indicateurTitre'>" +
             "<label>{{indicateur.titre}}</label>" +
                 "<button ng-click='dashboardCtrl.supprimerIndicateur(indicateur)'>Supprimer</button>" +
                 "</div>"+
        "<div class='indicateurContenu' ng-transclude></div>" +

        "</div>", //Du contenu HTML sera ajouté à cette div
        scope:{
            titre : "@",
            options : "="
        },
        restrict:"EA", //Element Attributs
        link:link
    };

    return ind;

};

function link(scope,element,attrs){

    scope.isMin  = function(){
        return scope.options.mini;
    };

    var title = scope.titre;
    console.log(title);


};