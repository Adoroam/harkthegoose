//index (main page)
app.controller('indexCtrl', function($scope) {
  /*  $scope.searchText = '';
    $scope.admin = false;
    var keys = [];
    $scope.key = function(event) {
        if (event.keyCode == 72) {
            keys.push("h");
        }   else if (event.keyCode == 80 && keys[0] == "h") {
            keys.push("p");
        }   else if (event.keyCode == 82 && keys[1] == "p") {
            keys.push("r");
            $scope.admin = true;
        }   else { 
            $scope.admin = false;
            keys = [];
        }
    };*/
});
//nav
app.controller('navCtrl', function($scope) {
    $scope.navlist = [
        {name: 'home', page: '/#/home'},
        {name: 'userlist', page: '/#/admin'},
        //{name: 'page2', page: '/#/page2'}
    ];    
});
//home
app.controller('homeCtrl', ['$scope', '$route', '$routeParams', '$cookies', function($scope, $route, $routeParams, $cookies) {
        this.name = 'homeCtrl';
        this.$route = $route;
        this.$routeParams = $routeParams;
        $scope.sent = $cookies.get('sent');
        $cookies.remove('sent');
        //validation
        $scope.clientEmail = ''; 
        x = ''; 
        $scope.validEmail = "has-feedback";
        $scope.validName = "has-feedback";
        function validateEmail(email) {
            var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            return re.test(email);
        };
        $scope.validate = function(type) {  
            if (type == "e") {
                var x = $scope.clientEmail;
                if (validateEmail(x)){
                    $scope.validEmail = "has-success";
                }   else if (x == "") {
                     $scope.validEmail = "has-feedback";
                }   else {$scope.validEmail = "has-error";}
            }
            if (type == "n") {
                var x = $scope.clientName;
                if (x == "") {
                    $scope.validName = "has-feedback";
                }   else if (x.length < 3) {
                    $scope.validName = "has-error";
                }   else if (x.length >= 50) {
                    $scope.validName = "has-error";
                }   else {$scope.validName = "has-success";}
            }
        };
        $scope.submitStatus = function() {
            if ($scope.clientName == 'I am the machine') {
                return "";
            } else if ($scope.validEmail == "has-success" && $scope.validName == "has-success") {
                return "";
            }   else {return "disabled"}
        };
}]);
//page one
app.controller('pOneCtrl', ['$scope', '$routeParams', 'users', function($scope, $routeParams, users) {
  this.name = "pOneCtrl";
  this.params = $routeParams;
  users.get().then(function(d) {
    $scope.userlist = d.data;   
  });
  $scope.searchText = '';
}]);
//page two
app.controller('pTwoCtrl', ['$routeParams', function($routeParams) {
  this.name = "pTwoCtrl";
  this.params = $routeParams;
}]);