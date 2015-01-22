'use strict';

/**
 * Defintion du module angular
 */
angular.module("TravisAPP")

/**
 * Définition de la directive indicateur
 */
    .controller("NoteController", ["$scope", "$http", function($scope, $http){
        $scope.userNote = {
            username: 'SimonL',
            noteList: [],
            shareNoteList: [],
            shareNoteWithList: [],
            urlNotes : '/api/notes/getUsernote/',
            urlShareNotes : '/api/notes/getShareNote/',
            urlShareNotesWith: '/api/notes/getShareNoteWith/'
        };

        $scope.userNote.urlNotes = $scope.userNote.urlNotes+$scope.userNote.username;
        $scope.userNote.urlShareNotes = $scope.userNote.urlShareNotes+$scope.userNote.username;
        $scope.userNote.urlShareNotesWith = $scope.userNote.urlShareNotesWith+$scope.userNote.username;

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
        $http.get($scope.userNote.urlShareNotesWith)
            .success(function(data, status, headers, config) {
                $scope.userNote.shareNoteWithList = data;
            })
            .error(function(data, status, headers, config) {

            });
    }])

/**
 * Fonction d'affichage des Notes
 */

    .directive("ngNotes", function(){
        return{
            template: 'Name: {{userNote.username}} Liste des notes: {{userNote.noteList[0]}} Liste des notes partagées: {{userNote.noteShareList}} Liste des notes partagées avec Moi: {{userNote.shareNoteWithList}}'
        };
    });



