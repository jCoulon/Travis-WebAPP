/**
 * Created by jonathancoulon on 20/12/14.
 */
angular.module("connexion", [])

/**
 * Controller de connexion
 * Gestion de la connexion de l'utilisateur
 */
    .controller("connexionCtrl", ['$rootScope', '$state', connextionCtrl])

    .service('Session', Session)

    .factory('LoginService', ["$http", '$q', '$rootScope', "Session", LoginService]);


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
function LoginService($http, $q, $rootScope, Session) {
    var loginService = {};

    loginService.seConnecter = function (infoUser) {

        var def = $q.defer();

        return $http.post('/api/users/login', infoUser).then(function (res) {

            // Session.create(res.data.id, res.data.user.IDUser, res.data.user.IDRole);
            loginService.setCurrentUser(res.data);

        }, function (err) {
            console.info(err);
        });
    };

    loginService.setCurrentUser = function (user) {
        $rootScope.user = user;
    };


    return loginService;
};

function connextionCtrl($rootScope, $state, LoginService) {
    var ctrl = this; //scope du controller
    ctrl.dataUser = {
        username: "",
        password: ""
    };

    if (!$rootScope.user) {
        $state.go("dashboard.dataviz");
    }

    ctrl.seConnecter = function () {

        LoginService.seConnecter(ctrl.dataUser).then(function (user) {
            if (user)
                ctrl.setCurrentUser(user);
            $state.go('dashboard.dataviz');

        }, function () {
            console.info("login erreur");
        });
    };

    ctrl.setCurrentUser = function (user) {
        ctrl.currentUser = user;
    };


};

