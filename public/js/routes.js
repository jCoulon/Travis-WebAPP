/**
 * Created by jonathancoulon on 28/12/14.
 */

angular.module("TravisAPP",['ui.router'])
.config(function($stateProvider,$urlRouterProvider){

        //Quand erreur
        $urlRouterProvider.otherwise("/");

    /** ROUTES  ave UI.ROUTER
     *
     * https://github.com/angular-ui/ui-router/wiki
     * */
        $stateProvider.state('dashboard', {
            url: "/",
            templateUrl: "/partials/dashboard"
        })
            .state('timemachine',{
                url:"/timemachine",
                templateUrl:"/partials/timemachine"
            })
            .state('notes',{
                url:"/notes",
                templateUrl:"/partials/notes"
            })
            .state("credits",{
                url:"/credits",
                templateUrl:"/partials/credits"
            })

    }
);
