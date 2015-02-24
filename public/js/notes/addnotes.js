angular.module("TravisAPP")
    .controller("addNote", ["$scope", "$http", function($scope, $http){
        $scope.addNote = function(){
            var d = new Date();
            var currentDate = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
            currentDate = currentDate.toString();
            var checked = document.getElementById("sharenote").checked;
            if(checked==true){
                checked = 1;
                var users = "";
                var usernames = [];
                var shareUsers = document.getElementsByClassName("totaltag");
                for(var i = 0 ; i < shareUsers.length ; i ++){
                    usernames.push(shareUsers[i].textContent.substring(shareUsers[i].textContent.indexOf("<")+1, shareUsers[i].textContent.indexOf(">")));
                }
                for(var i = 0 ; i < usernames.length; i++){
                    if(i!= usernames.length-1){
                        users = users + usernames[i]+";";
                    }else{
                        users = users+usernames[i];
                    }
                }
                console.log(users);
            }else{
                checked = 0;
            }
            // Simple POST request example (passing data) :
            $http.post('/api/notes/addNote', {Username: "SimonL", Share:checked, NbMax:0, Titre: document.getElementById('titrenote').value.toString(), Note:document.getElementById("textnote").innerHTML, Date:currentDate, Lastaccess: currentDate})
                .success(function(data, status, headers, config) {
                    if(checked==1){
                        /**
                         * Ici, On réalise l'insertion du partage de la note.
                         */
                        $http.post('/api/notes/addShareNote', {Username: users, IdNote:data, DateShare:currentDate, LastAccess: currentDate})
                            .success(function(data, status, headers, config) {
                            })
                            .error(function(data, status, headers, config) {
                                alert("Erreur lors de l'insertion de la note. Veuillez contacter le responsable de la maintenance.");
                            });
                    }
                    document.getElementById('titrenote').value = "";
                    document.getElementById("textnote").innerHTML = "";
                    document.getElementById("sharenote").checked = false;
                    document.getElementById("tagsList").innerHTML = "";
                })
                .error(function(data, status, headers, config) {
                    alert("Erreur lors de l'insertion de la note. Veuillez contacter le responsable de la maintenance.");
                });
        }
    }]);

/**
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
 *
 * Ajout d'une note partagée : Information nécessaires
 *
 * - Username: req.body.Username,
 * - IdNote: req.body.IdNote,
 * - DateShare: req.body.DateShare,
 * - LastAccess: req.body.LastAccess
 *
 * */