var app = angular.module("app", ['ngRoute', 'ngCookies']);

//retrieve users json data
app.factory('users', function($http) {
    var promise;
    var jsondata = {
        get: function() {
            if (!promise) {
                var promise = $http.post('/dXFEjNz6GgyKzpp339eX').success(function(response) {
                    return response;
                });
                return promise;
            }
        }
    };
    return jsondata;
});
function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
};