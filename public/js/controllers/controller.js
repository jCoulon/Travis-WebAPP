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



.controller("dashboardIndicateur",['$scope',dashboardIndicateur])

.controller("NoteController", ["$scope", "$http", function($scope, $http){
    var idShare = "";
    $scope.userNote = {
        username: 'SimonL',
        noteList: [],
        shareNoteList: [],
        shareNoteWithList: [],
        urlNotes : '/api/notes/getUsernote/',
        urlShareNotes : '/api/notes/getShareNote/',
        urlIdShareNotesWith: '/api/notes/getIdShareNoteWith/',
        urlShareNotesWith: '/api/notes/getShareNoteWith/'
    };

    $scope.userNote.urlNotes = $scope.userNote.urlNotes+$scope.userNote.username;
    $scope.userNote.urlShareNotes = $scope.userNote.urlShareNotes+$scope.userNote.username;
    $scope.userNote.urlIdShareNotesWith = $scope.userNote.urlIdShareNotesWith+$scope.userNote.username;

    $http.get($scope.userNote.urlNotes)
        .success(function(data, status, headers, config) {
            $scope.userNote.noteList = data;
        })
        .error(function(data, status, headers, config) {

        });
    $http.get($scope.userNote.urlShareNotes)
        .success(function(data, status, headers, config) {
            $scope.userNote.noteShareList = data;
        })
        .error(function(data, status, headers, config) {

        });
    $http.get($scope.userNote.urlIdShareNotesWith)
        .success(function(data, status, headers, config) {
            for(var i = 0; i < data.length ; i++){
                if( i == data.length-1){
                    idShare = idShare + data[i].IdNote;
                }else{
                    idShare = idShare + data[i].IdNote + "-";
                }
            }
            $http.get($scope.userNote.urlShareNotesWith+""+idShare)
                .success(function(data, status, headers, config) {
                    $scope.userNote.shareNoteWithList = data;
                })
                .error(function(data, status, headers, config) {

                });
        })
        .error(function(data, status, headers, config) {

        });
}]);

/**
 * Gestion indicateurs
 */
function dashboardIndicateur($scope){

    /**
     * Evite les pb de scope
     * @type {dashboardIndicateur}
     * @private
     */
    var _self = this;

    /**
     * En attendant modif, recuperation des indicateurs enregistré pour l'utilisateur connecté
     * @type {{titre: string}[]}
     */
    var indicateurBlocs = [{id:1,titre : "radar",nbChart:"2",type:"pie",charts:[{titre:"monRadar1",data:"mesDataDeRadar1"},{id:2,titre:"monRadar2",data:"mesDataDeRadar2"}]},{titre:"time",type:"pie"}];

    /**
     * Chargement user preferences
     * @type {{indicateurBlocsPanel: {titre: string}[], indicateurGenerique: string}}
     */
    _self.dashboardOptions = {
        indicateurBlocsUser :indicateurBlocs, // Indicateurs à charger
        indicateurGenerique : "" //
    };



    /**
     * Fonction d'ajout d'un indicateur
     */
    _self.ajouterIndicateurBloc = function(ind){
        console.log("ajouter indicateur"+ind.titre);

        /** Chargement du modèle de l'indicateur**/
        var indicateur = ind;
        _self.indicateurBlocsPanel.push(indicateur);
    };

    /**
     *
     */
    _self.ajouterNouvelIndicateurBloc = function(){
        var ind = {titre : _self.titre,nbChart:"2",type:"pie",charts:[{titre:"monRadar1",data:"mesDataDeRadar1"}]};
        _self.ajouterIndicateurBloc(ind);
    };

    /**
     * Supprimer un indicateur
     * @param ind
     */
    _self.supprimerIndicateurBloc = function(indicateurBloc){
        var old_bloc =  _self.indicateurBlocsPanel  ;
        _self.indicateurBlocsPanel =  [] ;

        angular.forEach(old_bloc, function (bloc) {
            if (bloc.id !== indicateurBloc.id)  _self.indicateurBlocsPanel.push(bloc);
        });

    };

    /**
     * Chargement des indicateurs
     * @param indicateurs
     */
    _self.chargerIndicateursBlocs = function(indicateurs){
        console.log("charger indicateur");
        angular.forEach(indicateurs,function(ind){
            console.log(ind);
            _self.ajouterIndicateurBloc(ind);
        });
    };

    /*
     * Supprimer tous les indicateurs
     */
    _self.effacer = function(){
        console.log("clear");
        _self.indicateurBlocsPanel = [];
    };



    /**
     * Recuperation des indicateurs à charger de l'user
     */
    _self.indicateursDefaut = _self.dashboardOptions.indicateurBlocsUser;
    _self.effacer();//init
    _self.chargerIndicateursBlocs(_self.indicateursDefaut);//Chargement des indicateurs présents
    console.log(_self.indicateurBlocs);


};