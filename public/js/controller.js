/**
 * Created by jo on 20/11/14.
 */
angular.module("TravisAPP")


    .factory("dataIndicateur",function(){

        function dataIndicateur(name){
            this.name = name;
        }

        dataIndicateur.prototype  = {

            bind : function(indicateur,scope){
                this.dataModel = indicateur.dataModel;
            },
            suppData : function(){

            },
            updateData : function(newData){
                this.dataModel = newData;
            }

        };

        return dataIndicateur;
    })

    .factory("dataPie",['$http','dataIndicateur',function(dataIndicateur,$http){

        function dataPie(){
            this.name = " data Pie instance";
        };

        dataPie.prototype = Object.create(dataIndicateur.prototype);

        dataPie.prototype.loadData = function(){
            //  $http.get();
        };

        return dataPie;
    }])

    .factory("indicateursGenerique",['dataPie',function(dataPie){
        return [
            {
                name:"pie",
                directive:"chartPie",
                dataModel : dataPie
            }];
    }])



    .controller("dashboardIndicateur",['indicateursGenerique',dashboardIndicateur]);


/**
 * Gestion indicateurs
 */
function dashboardIndicateur(indicateursGenerique){

    /**
     * En attendant modif, recuperation des indicateurs enregistré pour l'utilisateur connecté
     * @type {{titre: string}[]}
     */
    var indicateurs = [{titre : "radar"},{titre:"time"}];

    this.dashboardOptions = {
        indicateurs :indicateurs, // Indicateurs à charger
        indicateurGenerique : indicateursGenerique //
    };
};