(function() {
    'use strict';


    angular.module('TravisAPP')

        .directive('indicateurArea', indicateurArea);

    /**
     * Fonction indicateurArea
     * Gestion des blocs type d'indicateurs
     *
     */
    function indicateurArea($compile) {

        var _ind = {
            restrict: "E", //Element <indicateur-area>

            replace: true,//Remplace l'element par la template

            templateUrl: "js/templates/indicateurAera.html",

            scope: {//Scope isolé
                'options': '=', //<<indicateur-area options="" on-supp="">
                'onSupp': '&'
            },
            controller: ctrl,

            link: linkFunc
        };

        return _ind;


        ctrl.$inject = ['$scope']; // Injection du scope de la directive

        function ctrl($scope) {

            this.supprimerIndicateurBloc = function (ind) {
                console.log("sup");
                $scope.onSupp({indicateurBloc: ind});
            };

        };

        function linkFunc(scope, element, attrs) {
            console.log(scope.options);
            /**
             * Recuperation des indicateurs à charger
             */
        }
    }
})();

