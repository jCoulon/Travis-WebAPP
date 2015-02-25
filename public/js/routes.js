/**
 * Created by jonathancoulon on 28/12/14.
 */
'use strict';

angular.module("TravisAPP", ['ui.router', 'chart.js', 'connexion','acomplete', 'note'])


    .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

        var verifieConnexion = function ($q, $timeout, $http, $state, $rootScope) {

            //Promise
            var deferred = $q.defer();

            //Appel Ajax
            $http.get('/api/users/connected').success(function (user) {

                //Deja connecte
                if (user !== "non_connecte") {
                    $rootScope.user = user;
                    $timeout(deferred.resolve, 0);//resultat


                    //Pas connecte
                } else {

                    $timeout(function () {
                        deferred.reject();
                    }, 0);
                    $state.go('login');
                }
            });
            return deferred.promise;
        }


        $httpProvider.interceptors.push(['$injector',
            function ($injector) {
                return $injector.get('httpInterceptor');
            }
        ]);


        //Quand erreur
        $urlRouterProvider.otherwise("/dashboard");
        $urlRouterProvider.when("/dashboard", "dashboard/");
        $locationProvider.html5Mode(true);
        /** ROUTES  ave UI.ROUTER
         *
         * https://github.com/angular-ui/ui-router/wiki
         * */
        $stateProvider.state('dashboard', {
            url: "/dashboard",
            resolve: {
                dejaConnecte: verifieConnexion
            },
            views: {
                "masterView": {
                    templateUrl: "/partials/dashboard"
                },
                "leftContent@dashboard": { //Views leftContent du template dashboard
                    templateUrl: "/partials/leftContent"
                },
                "rightContent@dashboard": {
                    templateUrl: "/partials/rightContent"
                },
                "centralContent@dashboard": {
                    templateUrl: "/partials/centralContent"
                }
            }


        })
            .state('dashboard.timemachine', {
                url: "/timemachine",
                views: {
                    "contentCentral": {
                        templateUrl: "/partials/timemachine"
                    }
                }
            })
            .state('dashboard.notes', {
                url: "/notes",
                views: {
                    "contentCentral": {
                        templateUrl: "/partials/notes"
                    }
                }

            })
            .state("dashboard.credits", {
                url: "/credits",
                views: {
                    "contentCentral": {
                        templateUrl: "/partials/credits"
                    }
                }
            })
            .state("dashboard.dataviz", {
                url: "/",
                views: {
                    "contentCentral": {
                        templateUrl: "/partials/dataviz"
                    }
                }

            })
            .state("login", {
                url: '/login',
                views: {
                    "masterView": {
                        templateUrl: "/partials/connexion"
                    }
                }
            });


    })


    .factory("httpInterceptor", function ($rootScope, $q) {
        return function (promise) {
            return promise.then(
                // Successs
                function (response) {
                    return response;
                },
                // Error
                function (response) {
                    if (response.status === 401) {
                        var $state = $injector.get('$state');
                        $state.go('login');
                        return $q.reject(response);
                    }
                }
            );
        };
    })

    .
    controller('GlobalController', ['$scope', function ($scope) {

        // $scope.titre ="zezeazeza";

    }])

    .controller("dashboardIndicateur", dashboardIndicateur);


function runChangeRoute($rootScope, travis_connexion_event, LoginService) {


}


function httpInterceptor($rootScope, $q, Travis_connexion_event) {
    return {
        responseError: function (response) {
            $rootScope.$broadcast({
                401: Travis_connexion_event.NON_CONNECTE
            }[response.status], response);
            return $q.reject(response);
        }
    };
}


/**
 * Gestion indicateurs
 */
function dashboardIndicateur() {
    this.indicateurArea = [{titre: "INDICATEUR 1", options: [{type: "radar", mini: "true"}]}, {
        titre: "INDICATEUR 2",
        options: [{type: "chart"}]
    }];

    var indicateurs = [{titre: "radar"}, {titre: "time"}];

    this.dashboardOptions = {
        indicateurs: indicateurs
    };

    /** Supprime l'indicateur num indicateur */
    this.supprimerIndicateurBloc = function (item) {
        console.log("here");
        var index = this.indicateurs.indexOf(item);
        this.indicateurs.splice(index, 1);
    };


    this.ajouterIndicateur = function (type) {

    };
};

function GlobalController($scope) {

    var ctrl = this;

    this.search = false; //On n'affiche pas l'input search par défaut
    this.currentUser = null;
    this.titre = "MON TITRE";
    this.setCurrentUser = function (user) {
        ctrl.currentUser = user;
    };
};