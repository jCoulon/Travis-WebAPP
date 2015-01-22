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
            urlNotes : '/api/notes/getUsernote/',
            urlShareNotes : '/api/notes/getShareNote/'
        };

        $scope.userNote.urlNotes = $scope.userNote.urlNotes+$scope.userNote.username;
        $scope.userNote.urlShareNotes = $scope.userNote.urlShareNotes+$scope.userNote.username;

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
    }])

/**
 * Fonction d'affichage des Notes
 */

    .directive("ngNotes", function(){

        return{
            template: 'Name: {{userNote.username}} Liste des notes: {{userNote.noteList}} Liste des notes partagées: {{userNote.noteShareList}}'
        };
    });



