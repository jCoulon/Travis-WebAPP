/**
 * Created by jonathancoulon on 09/01/15.
 */
/**
 * Defintion du module angular
 */
angular.module("TravisAPP")

/**
 * Définition de la directive indicateur
 */
.directive("indicateurContenu",indicateurContenu);


/**
 * Fonction indicateur
 */
function indicateurContenu(){

    var ind = {
        requires:'^indicateur',
        transclude : true,//Ajout de HTML dans la div suivante
        template : "<div class='indicateur' ng-transclude></div>", //Du contenu HTML sera ajouté à cette div
        restrict:"E" //Element Attributs
    };

    return ind;




    /**
     * Le HTML transcludé ne fait pas parti du même scope que la directive ci.
     * Voir :http://www.sitepoint.com/practical-guide-angularjs-directives-part-two/
     */

};
