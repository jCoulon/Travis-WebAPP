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
        template : "<div class='indicateur'><label>{{titre}}</label><div ng-transclude></div> </label></div>", //Du contenu HTML sera ajouté à cette div
        restrict:"EA", //Element Attributs
        link:link
    };

    return ind;

};

function link(){alert("OK")};