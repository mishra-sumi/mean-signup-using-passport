var app = angular.module('Blogger');

app.controller('loginCtrl',['$scope', '$location', 'AuthService', function($scope, $location, AuthService){
    
    $scope.login = function(){
        $scope.error = false;
        $scope.disabled = true;
        console.log('inside login');
        AuthService.login($scope.user.username, $scope.user.password)
        .then(function(){
            $location.path('/welcome');
            $scope.disabled = false;
            $scope.user = {};
        })
        .catch(function(){
            $scope.error = true;
            $scope.errorMessage = "Invalid Username or password";
            $scope.disabled = false;
            $scope.user = {};
        });
    };
}]);

app.controller('logoutCtrl',['$scope', '$location', 'AuthService', function($scope, $location, AuthService){
    
    $scope.logout = function(){ 
        console.log('inside logout');
        AuthService.logout()
        .then(function(){
            $location.path('/');
        });
    };
}]);

app.controller('registerCtrl',['$scope', '$location', 'AuthService', function($scope, $location, AuthService){
    
    $scope.register = function(){console.log('inside register');
        $scope.error = false;
        $scope.disabled = true; 
        console.log('inside register');
        AuthService.register($scope.user.username, $scope.user.password, $scope.user.name, $scope.user.date, $scope.user.gender)
        .then(function(){
            $location.path('/login');
            $scope.disabled = false;
            $scope.user = {};
        })
        .catch(function(){
            $scope.error = true;
            $scope.errorMessage = "Something went wrong";
            $scope.disabled = false;
            $scope.user = {};
        });
    };
}]);