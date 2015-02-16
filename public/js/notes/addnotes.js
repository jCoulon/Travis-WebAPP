angular.module("TravisAPP")
    .controller("addNote", ["$scope", "$http", function($scope, $http){
        $scope.addNote = function(){
            var d = new Date();
            var currentDate = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
            currentDate = currentDate.toString();
            var checked = document.getElementById("sharenote").checked;
            if(checked==true){
                checked = 1;
            }else{
                checked = 0;
            }
            console.log("appel ajax");
            // Simple POST request example (passing data) :
            $http.post('/api/notes/addNote', {Username: "SimonL", Share:checked, NbMax:0, Titre: document.getElementById('titrenote').value.toString(), Note:document.getElementById("textnote").value.toString(), Date:currentDate, Lastaccess: currentDate})
                .success(function(data, status, headers, config) {
                    alert(data);
                    // this callback will be called asynchronously
                    // when the response is available
                })
                .error(function(data, status, headers, config) {
                    console.log(data);
                    console.log(status);
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
        }
    }]);

/**
 * localhost:3000/api/notes/addNote?username=SimonL&share=0&nbmax=4&note=Hello world POST ENCORE&date=2015-01-21&lastaccess=2015-01-21
 *
 *
 * Ajout d'une note: Infomation nécessaire:
 *
 * - IdNotes: null,
 * - Username: req.body.username,
 * - Share: req.body.share,
 * - NbMax: req.body.nbmax,
 * - Titre: req.body.titre,
 * - Note: req.body.note,
 * - Date: req.body.date,
 * - Lastaccess: req.body.lastaccess
 *
 * */