
/**
 * Defintion du module angular
 */
angular.module("TravisAPP")

/**
 * Définition de la directive indicateur
 */
    .directive("ngNotes", loadNotes);


/**
 * Fonction indicateur
 */
function loadNotes($scope, $http, $compile){
    "use strict"
    /*
     * Il faut aller rechercher le nom de l'utilisateur afin de pouvoir charger dynamiquement les notes.
     * Comme la connexion n'est pas encore réalisée, on va utiliser le username SimonL.
     * */
    $scope.url='/api/notes/getUsernote/SimonL';
    $scope.content = [];

    $http.get('/api/notes/getUsernote/SimonL').
        success(function(data, status, headers, config) {
            /* this callback will be called asynchronously when the response is available */
            var notes = JSON.parse(data);
            console.log(notes);
        }).
        error(function(data, status, headers, config) {
            /* called asynchronously if an error occurs or server returns response with an error status. */

        });

};
