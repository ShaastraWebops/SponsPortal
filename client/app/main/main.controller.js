'use strict';

angular.module('sponsPortalApp')
  .controller('MainCtrl', function ($scope, $state, $http, socket) {

    $state.go('sponsors');
    $scope.awesomeThings = [];

    // $http.get('/api/posts/newsfeed/1').success(function (data) {
    //   $scope.posts = data;
    // })
    
  });
