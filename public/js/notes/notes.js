'use strict';

/**
 * Defintion du module angular
 */
angular.module("TravisAPP")

/**
 * Définition de la directive indicateur
 */
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

        /** On cherche à obtenir les notes de l'utilisateur dans un premier temps */
        $http.get($scope.userNote.urlNotes)
            .success(function(data, status, headers, config) {
                $scope.userNote.noteList = data;
            })
            .error(function(data, status, headers, config) {

            });
        /** Ensuite, on veut les notes partagées de l'utilisateur. À Modifier. */
        $http.get($scope.userNote.urlShareNotes)
            .success(function(data, status, headers, config) {
                $scope.userNote.noteShareList = data;
                for(var i = 0; i < data.length; i++){
                    /**
                     * À faire : Pour chaque occurrence de data, faire un appel AJAX pour récupérer les noms des personnes
                     * avec qui la note est partagée. Faire une concaténation pour ensuite traiter les personnes
                     * dans le ng-reapeat.
                     * */
                }
            })
            .error(function(data, status, headers, config) {

            });
        /** On recherche les notes qui sont ensuite partagées avec l'utilisateur. À modifier */
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
                       console.log(data);
                       $scope.userNote.shareNoteWithList = data;
                    })
                    .error(function(data, status, headers, config) {

                    });
            })
            .error(function(data, status, headers, config) {

            });
    }])



