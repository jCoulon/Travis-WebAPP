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
    .directive("indicateurTitre",indicateurTitre);


/**
 * Fonction indicateur
 */
function indicateurTitre(){

    var ind = {
        requires:'indicateur',
        scope:{
            titre : '@' //Liaison directe sens unique
        },
        transclude : true,//Ajout de HTML dans la div suivante
        template : "<div class='indicateurTitre'><label>{{titre}}</label><div ng-transclude></div> </div>", //Du contenu HTML sera ajouté à cette div
        restrict:"E" //Element Attributs
    };

    return ind;


    function link(scope,element,attrs,controllerInstance){


    };

    /**
     * Le HTML transcludé ne fait pas parti du même scope que la directive ci.
     * Voir :http://www.sitepoint.com/practical-guide-angularjs-directives-part-two/
     */

};/**
 * Created by jonathancoulon on 09/01/15.
 */
