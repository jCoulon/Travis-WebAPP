/**
 * Created by jo on 20/11/14.
 */
angular.module("TravisAPP",['ngAnimate','ui.router'])
.controller("GlobalController",GlobalController)
.controller("NoteController", ['$scope', NoteController]);


function GlobalController(){

    var ctrl = this;

    this.search = false; //On n'affiche pas l'input search par défaut
    this.currentUser = null;
    this.titre = "MON TITRE";
    this.setCurrentUser = function(user){
        ctrl.currentUser = user;
    }

};

function NoteController(){

    $scope.userNote = {
        username: 'SimonL', /* À remplacer dynamiquement par l'utilisateur en cours */
        noteList: [],
        shareNoteList: []
    };

}