//creates <navigation> element and uses templates/navigation.html
app.directive('navigation', function() {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'templates/navigation.html'
    }
});
//controller used to populate templates/navigation.html with information
app.controller('navCtrl', function($scope) {
    $scope.navlist = [
        {name: 'home', page: '/home'},
        {name: 'page1', page: '/page1'},
        {name: 'page2', page: '/page2'}
    ];    
});
//routes (so the url bar changes when the view does)
app.config(['$routeProvider', '$locationProvider', 
  function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl',
        controllerAs: 'home'
      })
      .when('/home', {
        redirectTo: "/"
      })
      .when('/page1', {
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
//individual controllers for each view
.controller('homeCtrl', ['$route', '$routeParams', function($route, $routeParams) {
        this.$route = $route;
        this.$routeParams = $routeParams;
}])
.controller('pOneCtrl', ['$routeParams', function($routeParams) {
  this.name = "pOneCtrl";
  this.params = $routeParams;
}])
.controller('pTwoCtrl', ['$routeParams', function($routeParams) {
  this.name = "pTwoCtrl";
  this.params = $routeParams;
}]);