//index (main page)
app.controller('indexCtrl', ['$scope', 'users', '$cookies', function($scope, users, $cookies) {
    users.get().then(function(d) {
        var userlist = d.data;  
        var cUser = $cookies.get('user');
        if (cUser) {
            var exists = false;
            for (x in userlist) {
                if (userlist[x]._id == cUser) {
                    exists = userlist[x]; 
                }
            }
            $scope.user = exists;
        }
    });
}]);
//nav
app.controller('navCtrl', function($scope) {
    $scope.navlist = [
        {name: 'home', page: '/#/home', active: true},
        {name: 'admin', page: '/#/admin', active: false},
        {name: 'login', page: '/#/login', active: false},
        {name: 'account', page: '/#/account', active: false}
    ];    
    $scope.active = function(index) {
        for (x in $scope.navlist) {
            $scope.navlist[x].active = false;
        }
        $scope.navlist[index].active = true;
    };
});
//home
app.controller('homeCtrl', ['$scope', '$route', '$routeParams', '$cookies', 'users', function($scope, $route, $routeParams, $cookies, users) {
        this.name = 'homeCtrl';
        this.$route = $route;
        this.$routeParams = $routeParams;
        $scope.sent = $cookies.get('user');
        //validation
        $scope.clientEmail = ''; 
        $scope.clientName = ''; 
        $scope.validEmail = "has-feedback";
        $scope.validName = "has-feedback";
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
            if ($scope.validEmail == "has-success" && $scope.validName == "has-success") {
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
app.controller('pTwoCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
  this.name = "pTwoCtrl";
  this.params = $routeParams;
  $scope.loginEmail = ''; 
  $scope.loginPass = ''; 
  $scope.validEmail = "has-feedback";
  $scope.validPass = "has-feedback";
  $scope.messagePass = "";
  $scope.messageName = "";
  $scope.signup = {
    fb: "btn-default", 
    toggle: false, 
    header: "Login",
    postTo: "/login"
};
    $scope.bStatus = 'button';
  $scope.signUp =function() {
    if ($scope.signup.fb == "btn-default") {
        $scope.signup.fb = "btn-success";
        $scope.signup.toggle = true;
        $scope.signup.header = "Sign Up";
        $scope.signup.postTo = "/signup";
    }   else {
        $scope.signup.fb = "btn-default";
        $scope.signup.toggle = false;
        $scope.signup.header = "Login";
        $scope.signup.postTo = "/login";
    }
  };
  $scope.validate = function(type) {  
      if (type == "n") {
          var x = $scope.loginName;
          if (x == "") {
              $scope.validName = "has-feedback";
              $scope.messageName = "";
          }   else if (x.length < 3) {
              $scope.validName = "has-warning";
              $scope.messageName = "name must be at least 3 characters";
          }   else if (x.length >= 50) {
              $scope.validName = "has-warning";
              $scope.messageName = "name must be less than 50 characters";
          }   else {
            $scope.validName = "has-success";
            $scope.messageName = "";
        }
      }
      if (type == "e") {
          var x = $scope.loginEmail;
          if (validateEmail(x)){
              $scope.validEmail = "has-success";
          }   else if (x == "") {
               $scope.validEmail = "has-feedback";
          }   else {$scope.validEmail = "has-warning";}
      }
      if (type == "p") {
          var x = $scope.loginPass;
          if (x == "") {
              $scope.validPass = "has-feedback";
              $scope.messagePass = "";
          }   else if (x.length <= 8) {
              $scope.validPass = "has-warning";
              $scope.messagePass = "password must be at least 8 characters";
          }   else if (x.length >= 50) {
              $scope.validPass = "has-warning";
              $scope.messagePass = "password must be less than 50 characters";
          }   else {
            $scope.validPass = "has-success";
            $scope.messagePass = "";
        }
      }
  };
    $scope.submitStatus = function() {
        if ($scope.signup.toggle == true) {
            if ($scope.validName == "has-success" && $scope.validEmail == "has-success" && $scope.validPass == "has-success") {
                $scope.bStatus = 'submit';
                return "";
            }   else {
                $scope.bStatus = 'button';
                return "disabled";
            }
        }   else {
            if ($scope.validEmail == "has-success" && $scope.validPass == "has-success") {
                $scope.bStatus = 'submit';
                return "";
            }   else {
                $scope.bStatus = 'button';
                return "disabled";
            }
        }
  };//end submitStatus
}]);
//ACCOUNT
app.controller('accountCtrl', ['$scope', '$route', '$routeParams', '$cookies', function($scope, $route, $routeParams, $cookies) {
    this.name = 'accountCtrl';
    this.$route = $route;
    this.$routeParams = $routeParams;
    $scope.update = $cookies.get('update');
    $cookies.remove('update');
    $scope.pass = {
        Old: '',
        New: '',
        Confirm: ''
    };

}]);