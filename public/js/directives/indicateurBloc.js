'use strict';
/**
 * Gestion
 * Ajout, supression de chartBloc
 *
 */
angular.module('TravisAPP')

.directive('indicateurBloc',[indicateurBloc]);

/**
 * Fonction indicateurBloc
 *
 */
function indicateurBloc(){

    var _ind = {
        restrict:"E", //Element Attributs
        require :"^indicateurArea",

        templateUrl :"js/templates/indicateurBloc.html",
        scope:{
            blocoptions:"="
        },
         replace:true,
        controller:['$scope',function(scope){


        }],
        link:link
    };

    return _ind;

    /**
     *
     * @param scope
     * @param element
     * @param attrs
     */
    function link(scope,element,attrs,indicateurAreaCtrl){
        setTimeout(function () {
            console.log("BLOC =");

            console.log(scope.blocoptions);

            scope.click = function(bloc){
                indicateurAreaCtrl.supprimerIndicateur(bloc);
                console.log("click");
            };
            /*    var template,
             opts = scope.options,
             title = scope.title;

             // template = '<div '+scope.indicateurBloc.type+'options="options"><div>';
             element.html("<div><label>"+title+"</label>"+template+"</div>");
             $compile(element.contents())(scope);
             */
        }, 1000);

    };
};

