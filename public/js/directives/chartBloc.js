(function () {
    'use strict';


    /**
     * Gestion
     * Ajout, supression de chartBloc
     *
     */
    angular.module('TravisAPP')

        .directive('chartBloc', ['$compile', chartBloc]);

    /**
     * Fonction indicateur
     *
     */
    function chartBloc($compile) {

        /**
         * Le HTML transcludé ne fait pas parti du même scope que la directive ci.
         * Voir :http://www.sitepoint.com/practical-guide-angularjs-directives-part-two/
         */

        var _ind = {
            restrict: "E", //Element Attributs
            // requires: '^indicateurArea',
            // templateUrl :"js/templates/chartBloc.html",
            replace: true,
            scope: {
                chartsOptions: "="
            },
            link: link,
            controller: function ($scope) {
                $scope.data = [];
                var echantillon;
                var parent = $scope.$parent.blocoptions;

                if (parent.titre === "colab") {
                    genererColab($scope);

                }
                else if (parent.titre === "discu") {
                    genererDiscu($scope);
                }
                else if (parent.titre === "agreg") {
                    genererAgreg($scope);
                }


                $scope.type = $scope.chartsOptions["type"];
                $scope.usager = $scope.chartsOptions["usager"];

                console.log($scope.chartsOptions);
            }
        };

        /**
         *
         * @param scope
         * @param element
         * @param attrs
         */
        function link(scope, element, attrs) {


            var el = element.children(0)[1];
            var _template = '<canvas id="base" class="chart chart-base"  chart-type="type" data="data" labels="labels" legend="true" options="options"></canvas><label class="chart-title">{{usager}}</label>';
            var link = $compile(_template);
            var ct = link(scope);
            element.append(ct);


        };

        return _ind;

    };

    function getStatForums(data) {
        var statForums = [],
            cpt = 0,
            first = true;

        data.forEach(function (user) {
            var forums = user.forums;

            forums.forEach(function (forum) {
                if (first) {
                    statForums[cpt] = {IDForum: forum.id, browsing: 0, nbFichiers: 0, nbThreads: 0, nbMessages: 0};
                }

                //Recupere les stats du forum
                statForums[cpt].browsing += forum.browsing;
                statForums[cpt].nbFichiers += forum.nbFichiers;
                statForums[cpt].nbThreads += forum.nbThreads;
                statForums[cpt].nbMessages += forum.nbMessages;

                cpt++;
            });
            first = false;
            cpt = 0;
        });

        console.log(statForums);

        return statForums;
    }


    function genererColab($scope) {
        var statForum = getStatForums($scope.chartsOptions.data);
        var echantillon;
        statForum.forEach(function (sample) {
            echantillon = [sample['browsing'], sample['nbFichiers'], sample['nbThreads'], sample['nbMessages']];
            $scope.data.push(echantillon);
        });
        $scope.labels = [
            "browsing", "nbFichiers", "nbThreads", "nbMessages"
        ];
    }

    function genererDiscu($scope) {
        $scope.chartsOptions.data.forEach(function (sample) {
            var echantillon = [sample['browsing'], sample['forumActivites'], sample['nbMessagesLus'], sample['nbMessagesReps'], sample['nbChat']];
            $scope.data.push(echantillon);
        });

        $scope.labels = [
            "browsing", "forumActivites", "nbMessagesLus", "nbMessagesReps", "nbChat"
        ];
    }

    function genererAgreg($scope) {
        var sample = $scope.chartsOptions.data[0];
        var echantillon = [sample['nbConnexions'], sample['nbMessageCites'], sample['nbMessagePostes'], sample['nbMessageReps']];
        $scope.data.push(echantillon);


        $scope.labels = [
            "nbConnexions", "nbMessageCites", "nbMessagePostes", "nbMessagesReps"
        ];
    }

})();

