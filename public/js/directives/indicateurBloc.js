(function(){
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
                'blocoptions':'='

            },
            replace:true,
            link:linkFunc
        };

        return _ind;

        /**
         *
         * @param scope
         * @param element
         * @param attrs
         */
        function linkFunc(scope,element,attrs,indicateurAreaCtrl){
            /*
             Use $timeout and $interval over their native counterparts to keep Angular's two-way data binding up to date
             */
            setTimeout(function () {
                console.log("BLOC =");
                console.log(scope.blocoptions);

                scope.click = function(bloc){
                    indicateurAreaCtrl.supprimerIndicateurBloc(bloc);
                };
            }, 1000);


        };
    };

})();