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
    }])



