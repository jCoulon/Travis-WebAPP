'use strict';

/**
 *
 * Une directive pour chaque type d'indicateur
 */
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
        template :
        "<div class='indicateurContenu' ng-transclude></div>"

        , //Du contenu HTML sera ajouté à cette div
        scope:{

            options : "="
        },
        restrict:"EA", //Element Attributs
        link:link
    };

    return ind;

};

function link(scope,element,attrs){

    console.log("LINK INDICATEUR");
    scope.isMin  = function(){
        return scope.options.mini;
    };

    var ind = scope.indicateur;
    console.log(ind);


};