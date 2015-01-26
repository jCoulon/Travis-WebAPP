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
       // requires: '^indicateurArea',
       // templateUrl :"js/templates/chartBloc.html",
        replace:true,
        scope:{
            chartsOptions : "="
        },
        link:link,
        controller:function($scope){
            $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
            $scope.series = ['Series A', 'Series B'];

            $scope.data = [
                [65, 59, 80, 81, 56, 55, 40],
                [28, 48, 40, 19, 86, 27, 90]
            ];
        }
    };

    /**
     *
     * @param scope
     * @param element
     * @param attrs
     */
    function link(scope,element,attrs){



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

        var el = element.children(0)[1];







        var _template = '<canvas id="bar" class="chart chart-bar" data="data" labels="labels"></canvas>';
        var link =$compile(_template);
        var ct = link(scope);
        element.append(ct);





    };

    return _ind;

};

