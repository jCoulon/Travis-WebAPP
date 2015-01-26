/**
 * Created by jo on 20/11/14.
 */
angular.module("TravisAPP")


.factory("IndicateurModele",function(){

    function IndicateurModele(type,titre){



    }



})
/**
 * Modèle de données de l'indicateur
 */
.factory("dataIndicateur",function(){

        /**
         * Constructeur  DataIndicateur
         * @param name
         */
        function DataIndicateur(name){
            this.name = name;
        }

        DataIndicateur.prototype  = {

            /**
             * Liaison dataModel
             * @param indicateur
             * @param scope
             */
            bind : function(indicateur,scope){
                this.dataModel = indicateur.dataModel;
            },
            suppData : function(){

            },
            updateData : function(newData){
                this.dataModel = newData;
            }

        };

        return DataIndicateur;
    })

/**
 * $http REST (à changer par $ressource
 *
 * dataIndicateur = modèle de l'indicateur
 */
.factory("dataPie",['$http','dataIndicateur',function(dataIndicateur,$http){

        /**
         * Constructeur dataPie
         */
        function DataPie(){
            this.name = " data Pie instance";
        };

        /**
         * Héritage DataPie hérite de dataIndicateur
         * @type {dataIndicateur}
         */
        DataPie.prototype = Object.create(dataIndicateur.prototype);

        /**
         *Fonctino loadData qui charge les données du modèle
         */
        DataPie.prototype.loadData = function(){
            //  $http.get();
        };

        return DataPie;
}])
.factory("indicateursGenerique",['dataPie',function(dataPie){
        return [
            {
                name:"pie",
                directive:"chartPie",
                dataModel : dataPie
            }];
    }])



.controller("dashboardIndicateur",['$scope',dashboardIndicateur]);


/**
 * Gestion indicateurs
 */
function dashboardIndicateur($scope){

    /**
     * En attendant modif, recuperation des indicateurs enregistré pour l'utilisateur connecté
     * @type {{titre: string}[]}
     */
    var indicateurBlocs = [{id:1,titre : "radar",nbChart:"2",type:"pie",charts:[{titre:"monRadar1",data:"mesDataDeRadar1"},{id:2,titre:"monRadar2",data:"mesDataDeRadar2"}]},{titre:"time",type:"pie"}];

    /**
     * Chargement user preferences
     * @type {{indicateurBlocsPanel: {titre: string}[], indicateurGenerique: string}}
     */
    $scope.dashboardOptions = {
        indicateurBlocsUser :indicateurBlocs, // Indicateurs à charger
        indicateurGenerique : "" //
    };



    /**
     * Fonction d'ajout d'un indicateur
     */
    $scope.ajouterIndicateurBloc = function(ind){
        console.log("ajouter indicateur"+ind.titre);

        /** Chargement du modèle de l'indicateur**/
        var indicateur = ind;
        $scope.indicateurBlocsPanel.push(indicateur);
    };

    /**
     *
     */
    $scope.ajouterNouvelIndicateurBloc = function(){
        var ind = {titre : $scope.titre,nbChart:"2",type:"pie",charts:[{titre:"monRadar1",data:"mesDataDeRadar1"}]};
        $scope.ajouterIndicateurBloc(ind);
    };

    /**
     * Supprimer un indicateur
     * @param ind
     */
    $scope.supprimerIndicateurBloc = function(indicateurBloc){
        var old_bloc =  $scope.indicateurBlocsPanel  ;
        $scope.indicateurBlocsPanel =  [] ;

        angular.forEach(old_bloc, function (bloc) {
            if (bloc.id !== indicateurBloc.id)  $scope.indicateurBlocsPanel.push(bloc);
        });

    };

    /**
     * Chargement des indicateurs
     * @param indicateurs
     */
    $scope.chargerIndicateursBlocs = function(indicateurs){
        console.log("charger indicateur");
        angular.forEach(indicateurs,function(ind){
            console.log(ind);
            $scope.ajouterIndicateurBloc(ind);
        });
    };

    /*
     * Supprimer tous les indicateurs
     */
    $scope.effacer = function(){
        console.log("clear");
        $scope.indicateurBlocsPanel = [];
    };



    /**
     * Recuperation des indicateurs à charger de l'user
     */
    $scope.indicateursDefaut = $scope.dashboardOptions.indicateurBlocsUser;
    $scope.effacer();//init
    $scope.chargerIndicateursBlocs($scope.indicateursDefaut);//Chargement des indicateurs présents
    console.log($scope.indicateurBlocs);



};