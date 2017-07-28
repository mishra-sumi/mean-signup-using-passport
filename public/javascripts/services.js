angular.module('Blogger').factory('AuthService',['$q', '$timeout', '$http', function($q, $timeout, $http){
    var user = null;

    return({
        isLoggedIn: isLoggedIn,
        getUser: getUser,
        getUserStatus: getUserStatus,
        login: login,
        logout: logout,
        register: register
    });

    function isLoggedIn(){
        if(user) {
            return true;
        } else {
            return false;
        }
    }

    function getUser(){
        return $http.post('/user/welcome')
        .success(function(data){
            //console.log(data); exit;
            return data;
        })
        .error(function(data){
            return false;
        })
    }

    function getUserStatus(){
        return $http.get('/user/status')
        .success(function(data){
            if(data.status){
                user = true;
            } else {
                user = false;
            }
        })
        .error(function(data){
            user = false;
        });
    }

    function login(username, password){
        //console.log(username); console.log(password); exit;
        var deferred = $q.defer();

        $http.post('/user/login', {username: username, password: password})
        .success(function(data, status){
            if(status === 200 && data.status) {
                user = true;
                deferred.resolve();
            } else {
                user = false;
                deferred.reject();
            }
        })
        .error(function(data){
            user = false;
            deferred.reject();
        });

        return deferred.promise;
    }

    function logout(){
        
        var deferred = $q.defer();

        $http.get('/user/logout')
        .success(function(data){
            user = false;
            deferred.resolve();
        })
        .error(function(data){
            user = false;
            deferred.reject();
        });

        return deferred.promise;
    }

    function register(userData){
        //console.log(userData); exit;//console.log(password); exit;
        var deferred = $q.defer();
        //console.log(userData); exit;
        var fd = new FormData();
        fd.append('file', userData.file);
        fd.append('username', userData.username);
        fd.append('password', userData.password);
        fd.append('name', userData.name);
        fd.append('date', userData.date);
        fd.append('gender', userData.gender);
        /*for(var pair of fd.entries()) {
            console.log(pair[1]); 
        } exit;*/
        //console.log(fd[file]); exit;

        $http.post('/user/register', fd, { transformRequest: angular.identity, headers: {'Content-Type': undefined} })
        .success(function(data, status){
            if(status === 200 && data.status) {
                user = true;
                deferred.resolve();
            } else {
                user = false;
                deferred.reject();
            }
        })
        .error(function(data){
            user = false;
            deferred.reject();
        });

        return deferred.promise;
    }
}]);