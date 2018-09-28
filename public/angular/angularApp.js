var mainApp = angular.module('mainApp', ['ngRoute']);

mainApp.config(function($interpolateProvider, $routeProvider) {

    $routeProvider
    .when('/', {templateUrl : 'partial/wall/feed.html', controller  : 'mainController'})
    .when('/newpost', {templateUrl: 'partial/wall/newpost.html',    controller: 'newPostController'})
    .when('/post:id', {templateUrl: 'partial/wall/post.html',       controller: 'postController'});
  });

mainApp.controller('mainController', ['$scope', '$http', function($scope, $http){
    $scope.posts = [];
    
    //This gets the initial posts
    $http.get('/api/posts')
        .success(function(res){
            $scope.posts = res.posts;
        })
        .error(function(data, status){
            console.log(data);
        });
}]);

mainApp.controller('newPostController', ['$scope', '$http', function($scope, $http){
    
    $scope.post = '';
    $scope.postCreated = false;

    $scope.makeNewPost = function() {

        $http.post('/api/post', {
            userName:       $scope.post.userName,
            title:          $scope.post.title,
            description:    $scope.post.description,
            category:       $scope.post.category
        })
        .success(function(res){
            if(res.status == 200){
                $scope.postCreated = true;
            }
        })
        .error(function(data, status){
            $scope.postCreated = false;
            console.log(data);
        });
      };
}]);

mainApp.controller('postController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
    
    $scope.postID = $routeParams.id;
    $scope.posts = [];

    $http.get('/api/post', {params: { _id: $scope.postID }})
    .success(function(res){
        $scope.post = res.post;
    })
    .error(function(data, status){
        //
    });

}]);