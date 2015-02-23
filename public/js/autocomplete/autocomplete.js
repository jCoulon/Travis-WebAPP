'use strict';
var DATA_URL = "api/transition/usager/getAllUsers";


/**
 * Gestion
 * Ajout, supression de chartBloc
 *
 */
angular.module('acomplete', [])


    .directive('autocomplete', ['$timeout', autocomplete]);

/**
 * Fonction indicateur
 *
 */
function autocomplete($timeout) {

    /**
     * Le HTML transcludé ne fait pas parti du même scope que la directive ci.
     * Voir :http://www.sitepoint.com/practical-guide-angularjs-directives-part-two/
     */

    var _ind = {
        restrict: 'AEC',
        scope: {
            items: '=',
            prompt: '@',
            title: '@',
            subtitle: '@',
            model: '=',
            onSelect: '&'
        },
        link: link,
        templateUrl: "js/templates/autocomplete.html"
    };

    /**
     *
     * @param scope
     * @param element
     * @param attrs
     */
    function link(scope, element, attrs) {
        scope.handleSelection = function (selectedItem) {
            scope.model = selectedItem;
            scope.current = 0;
            scope.selected = true;
            $timeout(function () {
                scope.onSelect();
            }, 200);
        };
        scope.current = 0;
        scope.selected = true; // hides the list initially
        scope.isCurrent = function (index) {
            return scope.current == index;
        };
        scope.setCurrent = function (index) {
            scope.current = index;
        };
    };

    return _ind;

};


function dataFactory($http) {
    return {
        get: function (url) {
            return $http.get(url).then(function (resp) {
                return resp.data; // success callback returns this
            });
        },
        addGroup: function (ind, type, users) {
            var data = {
                ind: ind, type: type, users: users
            }
            return $http.post("/api/users/uparam/", data).then(function (resp) {
                return resp;
            });
        }
    };
}


/**
 * Created by jonathancoulon on 17/02/15.
 */
