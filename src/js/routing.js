//creates <navigation> element and uses templates/navigation.html
app.directive('navigation', function() {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'templates/navigation.html'
    }
});
//routes (so the url bar changes when the view does)
app.config(['$routeProvider', 
  function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl',
        controllerAs: 'home'
      })
      .when('/home', {
        redirectTo: "/"
      })
      .when('/admin', {
        templateUrl: 'templates/admin.html',
        controller: 'pOneCtrl',
        controllerAs: 'pOne'
      })
      .when('/login', {
        templateUrl: 'templates/login.html',
        controller: 'pTwoCtrl',
        controllerAs: 'pTwo'
      })
      .when('/account', {
        templateUrl: 'templates/account.html',
        controller: 'accountCtrl',
        controllerAs: 'account'
      })
      .otherwise({
        redirectTo: "/"
      });
}])