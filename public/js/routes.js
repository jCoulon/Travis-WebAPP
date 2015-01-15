/**
 * Created by jonathancoulon on 28/12/14.
 */
'use strict';

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


})

.controller('GlobalController', ['$scope',function($scope){

  // $scope.titre ="zezeazeza";

}])

.controller("dashboardIndicateur",dashboardIndicateur);


/**
 * Gestion indicateurs
 */
function dashboardIndicateur(){
    this.indicateurArea =  [{titre :"INDICATEUR 1",options:[{type:"radar",mini:"true"}]},{titre :"INDICATEUR 2", options:[{type:"chart"}]}];

    var indicateurs = [{titre : "radar"},{titre:"time"}];

    this.dashboardOptions = {
        indicateurs :indicateurs
    };

    /** Supprime l'indicateur num indicateur */
    this.supprimerIndicateur = function(item){
        console.log("here");
        var index = this.indicateurs.indexOf(item);
        this.indicateurs.splice(index,1);
    };


    this.ajouterIndicateur = function(type){

    };
};

function GlobalController($scope){

    var ctrl = this;

    this.search = false; //On n'affiche pas l'input search par défaut
    this.currentUser = null;
    this.titre = "MON TITRE";
    this.setCurrentUser = function(user){
        ctrl.currentUser = user;
    };
};