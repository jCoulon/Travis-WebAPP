/**
 * Created by jonathancoulon on 09/01/15.
 */
/**
 * Defintion du module angular
 */
angular.module("TravisAPP",[])

/**
 * Définition de la directive indicateur
  */
.directive("indicateur",indicateur);


/**
 * Fonction indicateur
 */
function indicateur(){

    var ind = {
        transclude : true,//Ajout de HTML dans la div suivante
        template : "<div class='indicateur'><label>OK</label><div ng-transclude></div> </label></div>", //Du contenu HTML sera ajouté à cette div
        restrict:"EA" //Element Attributs
    };

    return ind;


    function link(scope,element,attrs,controllerInstance){


    };

    /**
     * Le HTML transcludé ne fait pas parti du même scope que la directive ci.
     * Voir :http://www.sitepoint.com/practical-guide-angularjs-directives-part-two/
     */

};