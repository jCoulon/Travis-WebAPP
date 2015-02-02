/**
 * Created by jonathancoulon on 20/12/14.
 */
angular.module("TravisAPP", [])

/**
 * Controller de connexion
 * Gestion de la connexion de l'utilisateur
 */
    .controller("connexionCtrl", connextionCtrl)

    .service('Session', Session)

    .factory('LoginService', ["$http", "Session", LoginService]);

/**
 * Session utilisateur
 * @returns {Session}
 * @constructor
 */
function Session() {

    this.create = function (sessionId, userId, userRole) {
        this.id = sessionId;
        this.userId = userId;
        this.userRole = userRole;
    };
    this.destroy = function () {
        this.id = null;
        this.userId = null;
        this.userRole = null;
    };
    return this;
}

/**
 * Service de login
 * @param $http
 * @param Session
 * @constructor
 */
function LoginService($http, Session) {
    var loginService = {};

    loginService.seConnecter = function (info) {
        return $http.post('/connexion', info).then(function (res) {

            Session.create(res.data.id, res.data.user.IDUser, res.data.user.IDRole);

        }, function (err) {
            console.info(err);
        })
    }
};


function connextionCtrl($rootScope, LoginService) {
    var ctrl = this; //scope du controller
    ctrl.dataUser = {
        username: "",
        password: ""
    };

    ctrl.seConnecter = function (compte, mdp) {

        LoginService.seConnecter(ctrl.dataUser).then(function (user) {
            if (user)
                ctrl.setCurrentUser(user);
                console.info("Login reussi ! ");
        }, function () {
            console.info("login erreur");
        });
    };

    ctrl.setCurrentUser = function (user){
        ctrl.currentUser = user;
    }


};

