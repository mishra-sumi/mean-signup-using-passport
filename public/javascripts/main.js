var app = angular.module('Blogger', ['ngRoute']);

app.config(function($routeProvider){
    $routeProvider
    .when('/',{
        templateUrl: 'partials/home.html',
        access: {restricted: false}
    })
    .when('/login',{
        templateUrl: 'partials/login.html',
        controller: 'loginCtrl',
        access: {restricted: false}
    })
    .when('/logout',{
        controller: 'logoutCtrl',
        access: {restricted: true}
    })
    .when('/register',{
        templateUrl: 'partials/signup.html',
        controller: 'registerCtrl',
        access: {restricted: false}
    })
    .when('/welcome',{
        templateUrl: 'partials/welcome.html',
        access: {restricted: true}
    })
    .otherwise({
        redirectTo: '/'
    });
});

app.run(function($rootScope, $location, $route, AuthService){
    $rootScope.$on('$routeChangeStart', function(event, next, current){
        AuthService.getUserStatus()
        .then(function(){
            if(next.access.restricted && !AuthService.isLoggedIn()){
                $location.path('/');
                $route.reload();
            }
        });
    });
});