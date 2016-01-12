var app = angular.module("app", ['ngRoute', 'ngCookies']);

//retrieve users json data
app.factory('users', function($http) {
    var promise;
    var jsondata = {
        get: function() {
            if (!promise) {
                var promise = $http.get('/dXFEjNz6GgyKzpp339eX').success(function(response) {
                    return response;
                });
                return promise;
            }
        }
    };
    return jsondata;
});