/**
 * Created by jonathancoulon on 20/01/15.
 */

/**
 * Directive pour un chart Pie
 */

angular.module('TravisAPP',[])

.directive("pieChart",['$compile',pieChart]);


/**
 *
 */
function pieChart($compile){

    var _ind = {
        requires: '^indicateurArea',
        restrict:"EA",
        scope:{
            options:"="
        },
        template:"",
        link:function(scope,element,attrs){

        scope.options ="2"

        console.log("scope = "+scope.options);
        var el = element.html("TROP COOL");
        var link = $compile(el.contents)(scope);


    }
     //   controller:['$scope','$attrs','$q','serviceData',ctrl]

    };




    return this._ind;



};




