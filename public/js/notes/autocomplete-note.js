/**
 * Created by LEDUNOIS Simon on 16/02/15.
 *
 */

angular.module('TravisAPP')

.controller('userNoteController',['$scope',function($scope){
    $scope.$watchCollection('data.tags',function(val){
        console.log(val);
    });
}])
.directive('autocomplete-usernote', ['$scope','$http', function($scope, $http){
    return{
        restrict:'AE',
        scope:{
            selectedTags:'=model'
        },
        link:function(scope, elem, attrs){
            scope.suggestions=[];
            scope.selectedTags=[];
            scope.selectedIndex = -1; /** Index de selection du tag */

            scope.search = function(){
                $http.get("/api/users/getAutocompleteName/"+scope.searchText).success(function(data){
                    if(data.indexOf(scope.searchText) === -1){
                        data.unshift(scope.searchText);
                    }
                    scope.suggestions=data;
                    scope.selectedIndex=-1;
                });
            };

            scope.checkKeyDown=function(event){
                if(event.keycode===40){
                    /**
                     * Gestion de la selection de l'utilisateur par l'utilisation de la touche bas du clavier.
                     * */
                    event.preventDefault();
                    if(scope.selectedIndex+1 !== scope.suggestions.length){
                        scope.selectedIndex++;
                    }
                }else if(event.keyCode === 38){
                    /**
                     * Gestion de la selection de l'utilisateur par l'utilisation de la touche haut du clavier.
                     */
                    event.preventDefault();
                    if(scope.selectedIndex-1 !== -1){
                        scope.selectedIndex--;
                    }
                }else if(event.keyCode === 13){
                    /**
                     * Gestion de la selection de l'utilisateur par l'utilisation de la touche entrée du clavier.
                     */
                    scope.addToSelectedTags(scope.selectedIndex);
                }
            };

            scope.addToSelectedTags = function(index){
                if(scope.selectedTags.indexOf(scope.suggestions[index])===-1){
                    scope.selectedTags.push(scope.suggestions[index]);
                    scope.searchText='';
                    scope.suggestions=[];ÅÅ
                }
            };

            scope.removeTag = function(index){
              scope.selectedTags.splice(index,1);
            };

            scope.$watch('selectedIndex', function(val){
                if(val!==-1){
                    scope.searchText = scope.suggestions[scope.selectedIndex];
                }
            });

        }
    }
    }]);

