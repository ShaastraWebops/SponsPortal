'use strict';

angular.module('sponsPortalApp')
  .controller('SponsorsCtrl',function ($scope, $http, SponsorService, CategoryService, $mdDialog) {
    $http.get('/api/sponsors')
      .then(function (response) {
        $scope.all_sponsors = response.data;
        console.log(response);
      });
    
    CategoryService.getAllCategorys()
    .then(function(allCategorys){
      $scope.allCategorys = allCategorys;
      console.log($scope.allCategorys);
    },function(err){
      console.log(err);
    });
      // do  the deleting part here  
      $scope.deleteSponsor = function(x, y) {
        $http.delete('/api/sponsors/' + $scope.allCategorys[x].sponsors[y]._id)
          .then(function (response) {
          console.log(response);
        });
        $scope.allCategorys[x].sponsors.splice(y, 1);
      };
      // modal for editing the sponsor
  $scope.sponsorEditModal = function (sponsor) {
    $mdDialog.show({
      controller: SponsorEditModalCtrl,
      templateUrl: '/app/sponsors/sponsorEditModal.tmpl.html',
      locals: {
        SponsorPassed: sponsor,
        CategoryPassed: $scope.allCategorys
      }
    })
    .then(function (response) {
      console.log(response);
    }, function () {
      console.log('Cancel editing sponsor');
    });
  };
  function SponsorEditModalCtrl($scope, $state, $mdDialog, SponsorPassed, CategoryPassed) {
    
    $scope.editSponsor = {};
    $scope.editSponsor = SponsorPassed;
    $scope.allCategorys = CategoryPassed;

    $scope.changeCategory = function() {
      // converting the string to json due to md-select
      if(typeof $scope.editSponsor.category === 'string')
        $scope.editSponsor.category = JSON.parse($scope.editSponsor.category);
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
        // $scope.editSponsor.categoryTitle = $scope.categoryTitle;
    };
    $scope.save = function () {
      // do the saving part here
      SponsorService.editSponsor({
          _id: $scope.editSponsor._id,
          title: $scope.editSponsor.title,
          category: $scope.editSponsor.category,
          sponsor_link:$scope.editSponsor.sponsor_link,
          priority: $scope.editSponsor.priority||10,
          row_layout: $scope.editSponsor.row_layout||1,
          active: $scope.editSponsor.active||true
      })
      // .then(function (response) {
      //   if(response.status === 200) {
      //     $rootScope.showToast('Success!');
      //   } else {
      //     $rootScope.showToast('Error occurred!');
      //   }
      // })
      .catch(function (err) {
        // $rootScope.showToast('Error! Check internet connection!');
        console.log(err);
      });

      $mdDialog.hide('Save edited category');
    };
  };

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
