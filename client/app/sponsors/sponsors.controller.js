'use strict';

angular.module('sponsPortalApp')
  .controller('SponsorsCtrl',function ($scope,$http) {
    $http.get('/api/sponsors')
      .then(function (response) {
        $scope.all_sponsors = response.data;
      });

    // $scope.all_sponsors = sponsors.query();
    // $scope.img_uri = function(logo){
    //   if(!logo)
    //     return "";
    //   // var idx=logo.indexOf('pics');
    //   // var path='http://localhost/'+logo.slice(idx);
    //   var path='api/uploads/{{logo.fileId}}'
    //   return path;
    // }
  });
