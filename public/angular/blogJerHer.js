angular.module('blogJerHerApp', []);

var  postListCtrl = function ($scope, loc8rData) {
  
  $scope.getData = function () {
    blogJerHerData.getPosts()
      .success(function(data) {
        $scope.message = data.length > 0 ? "" : "No posts found";
        $scope.data = { locations: data };
      })
      .error(function (e) {
        $scope.message = "Sorry, something's gone wrong, please try again later";
      });
  };

  $scope.showError = function (error) {
    $scope.$apply(function() {
      $scope.message = error.message;
    });
  };

};

var blogJerHerData = function ($http) {
  var getPosts = function () {
    return $http.get('/api/posts');
  };
  return {
    posts : posts
  };

 
};

angular
  .module('blogJerHerApp')
  .controller('postListCtrl', postListCtrl)
  .service('blogJerHerData', blogJerHerData);

