/**
 * Created by jonathancoulon on 28/12/14.
 */

angular.module("TravisAPP",['ui.router'])
.config(function($stateProvider,$urlRouterProvider,$locationProvider){


        //Quand erreur
        $urlRouterProvider.otherwise("/dashboard");
        $urlRouterProvider.when("/dashboard","dashboard/");
        $locationProvider.html5Mode(true);
    /** ROUTES  ave UI.ROUTER
     *
     * https://github.com/angular-ui/ui-router/wiki
     * */
        $stateProvider.state('dashboard', {
            url: "/dashboard",
            views:{
                "masterView":{
                    templateUrl:"/partials/dashboard"
                },
                "leftContent@dashboard":{ //Views leftContent du template dashboard
                    templateUrl:"/partials/leftContent"
                },
                "rightContent@dashboard":{
                    templateUrl:"/partials/rightContent"
                },
                "centralContent@dashboard":{
                    templateUrl:"/partials/centralContent"
                }
            }
         })
            .state('dashboard.timemachine',{
                url:"/timemachine",
                views:{
                    "contentCentral":{
                        templateUrl:"/partials/timemachine"
                    }
                }
            })
            .state('dashboard.notes',{
                url:"/notes",
                views:{
                    "contentCentral": {
                        templateUrl: "/partials/notes"
                    }
                }

            })
            .state("dashboard.credits",{
                url:"/credits",
                views: {
                    "contentCentral": {
                        templateUrl: "/partials/credits"
                    }
                }
            })
            .state("dashboard.dataviz",{
                url:"/",
                views: {
                    "contentCentral": {
                        templateUrl: "/partials/dataviz"
                    }
                }
            })


    }
);
