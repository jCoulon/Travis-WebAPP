'use strict';
/**
 * Gestion
 * Ajout, supression de chartBloc
 *
 */
angular.module('TravisAPP')

    .directive('chartBloc',['$compile',chartBloc]);

/**
 * Fonction indicateur
 *
 */
function chartBloc($compile){

    /**
     * Le HTML transcludé ne fait pas parti du même scope que la directive ci.
     * Voir :http://www.sitepoint.com/practical-guide-angularjs-directives-part-two/
     */

    var _ind = {
        restrict:"E", //Element Attributs
        requires: '^indicateurArea',
        templateUrl :"js/templates/chartBloc.html",
        replace:true,
        scope:{
            chartsOptions : "="
        },
        link:link
    };

    return _ind;

};

/**
 *
 * @param scope
 * @param element
 * @param attrs
 */
function link(scope,element,attrs){


    scope.options = {
        directive : "pieDirective"
    };
  /*  scope.title = "pie";
   var template,
        opts = scope.options,
        title = scope.title;

    if(!scope.options)
        throw "pas d'options dans indicateurs";

    if(scope.options.directive){

        template = '<div '+scope.options.directive+'options="options"><div>';
        element.html("<div><label>"+title+"</label>"+template+"</div>");
        $compile(element.contents())(scope);

    }*/


};