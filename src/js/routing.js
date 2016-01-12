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
        templateUrl: 'templates/page1.html',
        controller: 'pOneCtrl',
        controllerAs: 'pOne'
      })
      .when('/page2', {
        templateUrl: 'templates/page2.html',
        controller: 'pTwoCtrl',
        controllerAs: 'pTwo'
      })
      .otherwise({
        redirectTo: "/"
      });
}])