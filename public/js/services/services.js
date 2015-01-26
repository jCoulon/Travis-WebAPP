/**
 * Created by jonathancoulon on 19/12/14.
 */

angular.module("travisApp",[])
/**
 * Constante type d'utilisateur pour trAVis
 */
.constant("typeUtilisateur",{
    invite : '*', //Etudiant & invite
    admin : 'admin', //Admin reseau & équipe EIAH
    editeur : 'editeur'// profil enseignant
})
/*
 .constant("connexionSatut",{

 })
 */

/**
 * Service d'authentification des utilisateurs
 * @return auth
 */
.factory("AuthentificationService",AuthentificationService)


/**
 * Service de création de session
 */
.service("Session",SessionService)

/**
 * Interception reponse HTTP avant d'être traité par l'APP
 *Pour aide :  https://docs.angularjs.org/api/ng/service/$http
 */
.factory("httpAuthInterceptor",httpAuthInterceptor);






function AuthentificationService ($http,Session){

    var authentification = {};

    authentification.seConnecter = function(compte,mdp){
        var info = {compte : compte, mdp : mdp};
        return $http.post('/login',info).then(function(res){

            Session.creer(res.data.id,res.data.utilsateur.id,res.data.utilisateur.idRole);

            return res.data.utilsateur;

        });


    },
        authentification.estConnecte = function(){
            return !!Session.idCompte;
        },
        authentification.seDeconnecter = function(){

        }

    return authentification;
};



function httpAuthInterceptor($rootScope,$q){
    return {
        responseError :function(rejection){
            switch(rejection.status){
                case 401 : {
                    $rootScope.$broadcast('loginRequired',rejection); //Diffuse l'erreur "loginRequired" sur l'application
                    break;
                }
            }
            return $q.reject(rejection);
        }
    };
};


function SessionService(){

    this.creer = function(idSession,idCompte,idRole){
        this.id = idSession;
        this.idCompte = idCompte;
        this.idRole = idRole;
    };
    this.supprimer = function(){
        this.id = null;
        this.idCompte = null;
        this.idRole = null;
    };

    return this;
};