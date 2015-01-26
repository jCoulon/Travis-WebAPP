/**
 * Created by jonathancoulon on 20/12/14.
 */
angular.module("TravisAPP",[])

/**
 * Controller de connexion
 * Gestion de la connexion de l'utilisateur
 */
.controller("connexionCtrl",connextionCtrl);


function connextionCtrl($rootScope,AuthentificationService){
    var ctrl = this; //scope du controller
    ctrl.dataUser = {
        compte : "",
        mdp : ""
    };

    ctrl.seConnecter = function(compte,mdp){
        AuthentificationService.seConnecter(dataUser).then(
            function(user){

                $rootScope.$broadcast("loginReussi"); //Diffuse sur l'app que login OK
                ctrl.setCurrentUser(user);//Set l'utilisateur courant

            },function(){
                $rootScope.$broadcast("loginEchec");//Echec login
            }
        );
    };



};