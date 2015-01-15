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
.directive("indicateurTitre",indicateurTitre);


/**
 * Fonction indicateur
 */
function indicateurTitre(){

    var ind = {
        requires:'^indcateurArea',
        scope:{
            titre : '@' //Liaison directe sens unique
        },
        template : "<div class='indicateurTitre' ng-init='indexi = $parent.$index'>" +
        "<label>{{$parent.indicateur.titre}}</label>" +
        "<button ng-click='$parent.supprimerIndicateur($parent.indicateur)'>Supprimer</button>" +
        "</div>", //Du contenu HTML sera ajouté à cette div
        restrict:"E" //Element Attributs

    };

    return ind;



    /**
     * Le HTML transcludé ne fait pas parti du même scope que la directive ci.
     * Voir :http://www.sitepoint.com/practical-guide-angularjs-directives-part-two/
     */

};/**
 * Created by jonathancoulon on 09/01/15.
 */

function ctrl(scope){

}