/*var app = angular.module('Blogger', ['ngResource', 'ngRoute']);
app.config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl: 'partials/home.html'
    })
    .when('/signup', { 
        templateUrl: 'partials/signup.html',
        controller: 'SignupCtrl'
    })
    .when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'loginCtrl'
    })
    .otherwise({
        redirectTo: '/'
    });
}]);
app.controller('SignupCtrl', ['$scope', '$resource', '$location',
    function($scope, $resource, $location){
        console.log("Hello world");
        $scope.save = function(){
            var user = $resource('/api/account');
            user.save($scope.user, function(){
                $location.path('/');
            });
        };
}]);
app.controller('loginCtrl', ['$scope', '$resource', '$location',
    function($scope, $resource, $location){
        console.log("login ctrl");
        $scope.check = function(){
            var user = $resource('/api/account');
            user.find($scope.user, function(){
                $location.path('/');
            });
    };
}]);*/