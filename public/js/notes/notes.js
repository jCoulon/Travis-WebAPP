'use strict';

/**
 * Defintion du module angular
 */
angular.module("TravisAPP")


    .service("NoteServices", ["$http", function ($http) {


        this.getNoteUser = function (user) {
            return $http.get("/api/notes/getUsernote/");
        };

        this.getSharedNotes = function (user) {
            return $http.get('/api/notes/getShareNote/');
        };

        this.getNoteUser = function (user) {
            return $http.get("/api/notes/getUsernote/");
        };

        this.getNoteUser = function (user) {
            return $http.get("/api/notes/getUsernote/");
        };

        this.getNoteUser = function (user) {
            return $http.get("/api/notes/getUsernote/");
        };

        this.getNoteUser = function (user) {
            return $http.get("/api/notes/getUsernote/");
        };


    }])


/**
 * Définition de la directive indicateur
 */
    .
    controller("NoteController", ["$scope", "$http", "NoteServices", function ($scope, $http, NoteServices) {
        var idShare = "";
        $scope.userNote = {
            username: 'SimonL',
            noteList: [],
            shareNoteList: [],
            shareNoteWithList: [],
            urlNotes: '/api/notes/getUsernote/',
            urlShareNotes: '/api/notes/getShareNote/',
            urlIdShareNotesWith: '/api/notes/getIdShareNoteWith/',
            urlShareNotesWith: '/api/notes/getShareNoteWith/',
            urlUsernameShareById: '/api/notes/getShareNoteById/',
            urlgetNoteById: '/api/notes/getNoteById/'
        };

        $scope.userNote.urlNotes = $scope.userNote.urlNotes + $scope.userNote.username;
        $scope.userNote.urlShareNotes = $scope.userNote.urlShareNotes + $scope.userNote.username;
        $scope.userNote.urlIdShareNotesWith = $scope.userNote.urlIdShareNotesWith + $scope.userNote.username;


        //$scope.getNoteUser();
        /**EX**/
        //Si fonction appelé uniquement ici et pas dans le html ou directive
        //function getNoteUser {

        $scope.getNoteUser = function () {
            NoteServices.getNoteUser().then(function (res) {
                $scope.userNote.noteList = data;

            }).catch(function (err) {
                console.log("Error")
            })
        };


        /** On cherche à obtenir les notes de l'utilisateur dans un premier temps */
        $http.get($scope.userNote.urlNotes)
            .success(function (data, status, headers, config) {
                $scope.userNote.noteList = data;
            })
            .error(function (data, status, headers, config) {

            });
        /** Ensuite, on veut les notes partagées de l'utilisateur. À Modifier. */
        $http.get($scope.userNote.urlShareNotes)
            .success(function (data, status, headers, config) {
                $scope.userNote.noteShareList = data;
                for (var i = 0; i < data.length; i++) {
                    /**
                     * Pour chaque occurrence de data, faire un appel AJAX pour récupérer les noms des personnes
                     * avec qui la note est partagée. Faire une concaténation pour ensuite traiter les personnes
                     * dans le ng-reapeat.
                     * */
                    $http.get($scope.userNote.urlUsernameShareById + data[i].IdNotes)
                        .success(function (data, status, headers, config) {
                            var usernameReg = /;/;
                            var username = data[0].Username.split(usernameReg);
                            var i = 0;
                            var find = 0;
                            while (find != 1 || i < $scope.userNote.noteShareList.length - 1) {
                                if ($scope.userNote.noteShareList[i].IdNotes == data[0].IdNote) {
                                    find = 1;
                                    $scope.userNote.noteShareList[i]["usersShared"] = username;
                                    console.log(  $scope.userNote.noteShareList[i]["usersShared"]);
                                }
                                i++;
                            }
                        })
                        .error(function (data, status, headers, config) {

                        });
                }
            })
            .error(function (data, status, headers, config) {

            });
        /** On recherche les notes qui sont ensuite partagées avec l'utilisateur. À modifier */
        $http.get($scope.userNote.urlIdShareNotesWith)
            .success(function (data, status, headers, config) {
                /*for(var i = 0; i < data.length ; i++){
                 if( i == data.length-1){
                 idShare = idShare + data[i].IdNote;
                 }else{
                 idShare = idShare + data[i].IdNote + "-";
                 }
                 }
                 $http.get($scope.userNote.urlShareNotesWith+""+idShare)
                 .success(function(data, status, headers, config) {
                 $scope.userNote.shareNoteWithList = data;
                 console.log($scope.userNote.shareNoteWithList);
                 })
                 .error(function(data, status, headers, config) {

                 });*/
                $scope.userNote.shareNoteWithList = data;
                for (var i = 0; i < data.length; i++) {
                    var usernameReg = /;/;
                    var username = data[i].Username.split(usernameReg);
                    $scope.userNote.shareNoteWithList[i]["usersShared"] = username;

                    $http.get($scope.userNote.urlgetNoteById + data[i].IdNote)
                        .success(function (data, status, headers, config) {
                            var i = 0;
                            var find = 0;
                            while (find != 1 || i < $scope.userNote.shareNoteWithList.length - 1) {
                                if ($scope.userNote.shareNoteWithList[i].IdNote == data[0].IdNotes) {
                                    find = 1;
                                    $scope.userNote.shareNoteWithList[i]["completeNote"] = data;
                                }
                                i++;
                            }
                        })
                        .error(function (data, status, headers, config) {

                        });
                }
                /**
                 * À faire :
                 * Pour chaque occurrence de data :
                 *  - Aller chercher les informations relatives à la note
                 *  - concaténer ensuite les deux datas
                 *  - Traiter les data dans la vue
                 */
            })
            .error(function (data, status, headers, config) {

            });
    }])



