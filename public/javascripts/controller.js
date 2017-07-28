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
        //console.log($scope.user); exit;
        AuthService.register($scope.user)
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

app.controller('profileCtrl',['$scope', '$location', 'AuthService', function($scope, $location, AuthService){
    
    $scope.date = new Date().toString();
    AuthService.getUser()
    .then(function(res){
        $scope.user = res.data.user;
        //$scope.imageUrl = URL.createObjectURL($scope.user.file);
        //console.log($scope.imageUrl);
    })
    .catch(function(){
        $scope.user = false;
    });
    //console.log($scope.user); exit;
    $scope.logout = function(){
        AuthService.logout()
        .then(function(){
            $location.path('/');
        });
    };
}]);