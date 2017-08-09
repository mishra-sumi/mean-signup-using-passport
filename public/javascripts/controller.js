var app = angular.module('Blogger');

app.controller('loginCtrl',['$scope', '$location', 'AuthService', function($scope, $location, AuthService){
    
    if(AuthService.isLoggedIn()){
        $location.path("/welcome");
    }
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
    
    if(AuthService.isLoggedIn()){
        $location.path("/welcome");
    }
   $scope.error = false;
    $scope.header = "Please sign up for Blogger Site";
    $scope.registerPage = true;
    $scope.register = function(){console.log('inside register');
        $scope.error = false;
        $scope.disabled = true;
        $scope.uploading_file = true; 
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
        console.log(res.data);
        $scope.user = res.data.user;
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
    $scope.delete = function(){
        //console.log("inside delete function"); exit;
        AuthService.deleteUser()
        .then(function(res){
            console.log(res.data);
            $location.path("/");
        })
        .catch(function(){
            console.log("something went wrong");
        });
    };
}]);

app.controller('editCtrl', ['$scope', '$location', 'AuthService', function($scope, $location, AuthService){

   $scope.header = "Edit your account";
   $scope.user = {};
   $scope.error = false;
   $scope.success = false;
   $scope.uploading = true;
   AuthService.getUser()
    .then(function(res){
        $scope.error = false;
        console.log(res.data.user);
        $scope.newuser = res.data.user;
        $scope.user.name = $scope.newuser.Name;
        $scope.user.username = $scope.newuser.Username;
        $scope.user.file = $scope.newuser.file;
        $scope.user.gender = $scope.newuser.Gender;
        $scope.user.password = "";
        $scope.user.date = new Date($scope.newuser.Dob);
        $scope.img = 'http://localhost:3000/images/'+$scope.newuser.file.filename;
        //console.log($scope.user);
    })
    .catch(function(){
        $scope.error = true;
        $scope.errorMessage = "Something went wrong";
    });
    $scope.edit = function(){ //console.log($scope.user); exit;
        AuthService.updateUser($scope.user)
        .then(function(res){
            $scope.success = true;
            $scope.successMessage = "Your Profile Updated Successfully";
            console.log(res.data);
        })
        .catch(function(){
            $scope.error = true;
            $scope.errorMessage = "Something went wrong";
            $scope.disabled = false;
            $scope.user = {};
        })
    };
}]);

app.controller('addCtrl', ['$scope', '$location', '$http', 'AuthService', function($scope, $location, $http, AuthService){
    //console.log("inside addCtrl controller"); exit;
    $scope.error = false;
    $scope.success = false;
    AuthService.getUser()
    .then(function(res){
        console.log(res.data);
        $scope.name = res.data.user.Name;
        $scope.filename = res.data.user.file.filename;
    })
    .catch(function(){
        console.log("Something went wrong");
    });
    $scope.add = function() { //console.log($scope.blog); exit;

        var fd = new FormData();
        fd.append('file', $scope.blog.file);
        fd.append('title', $scope.blog.title);
        fd.append('topic', $scope.blog.topic);

        $http.post('/topic/add', fd, { transformRequest: angular.identity, headers: {'Content-Type': undefined} })
        .success(function(data, status){
            console.log(data);
            $scope.error = false;
            $scope.success = true;
            $scope.successMessage = data.response;
        })
        .error(function(data){
            $scope.success = false;
            $scope.error = true;
            $scope.errorMessage = "Something went wrong";
        });
    };
}]);

app.controller('bloglistCtrl', ['$scope', '$location', '$http', function($scope, $location, $http){

    $http.get('/topic/list')
    .success(function(data, status){
        $scope.name = data.response.name;
        $scope.data = data.response.data;
        $scope.filename = data.response.filename;
        console.log(data);
    })
    .error(function(data){
        console.log('something went wrong');
    });
}]);

app.controller('indexCtrl', ['$scope', '$location', '$http', function($scope, $location, $http){

    $scope.comment = function(){ //console.log($scope.data); exit;
        angular.forEach($scope.data, function(key, value){ 
            if(key.comment.char){ //console.log(key.comment.char); exit;
                $http.post('/topic/addcomments', { topicId: key._id, comment: key.comment.char })
                .success(function(data, status){
                    console.log(data);
                    key.comment.char = "";
                })
                .error(function(data){
                    console.log('something went wrong');
                });
                //console.log(key.comment);
            }
        });
        console.log($scope.data);
        //console.log("inside comment");
    };
    $http.get('/topic/allblog')
    .success(function(data, status){
        $scope.name = data.response.name;
        $scope.data = data.response.data;
        $scope.filename = data.response.filename;
        $scope.username = data.response.username;
        console.log(data);
    })
    .error(function(data){
        console.log('something went wrong');
    });
}]);