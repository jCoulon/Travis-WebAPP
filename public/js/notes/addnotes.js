angular.module("TravisAPP")
    .controller("addNote", ["$scope", "$http", function($scope, $http){
        $scope.alert = function(){
            alert();
        }
    }]);