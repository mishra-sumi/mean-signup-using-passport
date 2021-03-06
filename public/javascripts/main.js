var app = angular.module('Blogger', ['ngRoute', 'ngFileUpload']);

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
        templateUrl: 'partials/profile.html',
        controller: 'profileCtrl',
        access: {restricted: true}
    })
    .when('/edit', {
        templateUrl: 'partials/edit.html',
        controller: 'editCtrl',
        access: {restricted: true}
    })
    .when('/myblog', {
        templateUrl: 'partials/bloglist.html',
        controller: 'bloglistCtrl',
        access: {restricted: true}
    })
    .when('/addtopic', {
        templateUrl: 'partials/addtopic.html',
        controller: 'addCtrl',
        access: {restricted: true}
    })
    .when('/home', {
        templateUrl: 'partials/index.html',
        controller: 'indexCtrl',
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