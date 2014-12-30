/**
 * Created by jonathancoulon on 20/12/14.
 */
angular.module("TravisAPP",[])

.config(function($httpProvider){

    $httpProvider.interceptors.push(['$injector',function($injector){
        return $injector.get('httpAuthInterceptor');
    }]);

});