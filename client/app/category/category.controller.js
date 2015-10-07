'use strict';

angular.module('sponsPortalApp')
  .controller('CategoryCtrl', function ($scope, $rootScope, CategoryService, $mdDialog) {
    $scope.errors = {};
    $scope.update = {};
  	$scope.showButton = false;
  	$scope.allCategorys = [];

    $scope.newCategory = function(categoryForm) {
      $scope.submitted = true;
      
      if(categoryForm.$valid) {
      	// console.log($scope.categoryTitle)
      	CategoryService.createCategory({
      	  categoryName: $scope.categoryTitle,	
      	})
      	.then(function (response) {
        if(response.status === 201) {
          $scope.allCategorys.push(response.data);
          // $rootScope.showToast('Success!');
          $scope.categorySubmitted = false;
        } else {
          // $rootScope.showToast('Error occurred!');
          $scope.categorySubmitted = false;
        }
      })
      .catch(function (err) {
        // $rootScope.showToast('Error! Check internet connection!');
        console.log(err);
      });
      }	
      $scope.categoryTitle = '';
    }

    CategoryService.getAllCategorys()
    .then(function(allCategorys){
      $scope.allCategorys=allCategorys;
    },function(err){
      console.log(err);
    });

// do  the deleting part here    
  $scope.removeCategory = function(index) {
    CategoryService.deleteCategory($scope.allCategorys[index]._id,
      $scope.allCategorys.splice(index, 1)) 
    .then(function (response) {
      console.log(response);
    });
  };
// modal for editing the category
  $scope.categoryEditModal = function (category) {
    $mdDialog.show({
      controller: CategoryEditModalCtrl,
      templateUrl: '/app/category/categoryEditModal.tmpl.html',
      locals: {
        CategoryPassed: category
      }
    })
    .then(function (response) {
      console.log(response);
    }, function () {
      console.log('Cancel editing category');
    });
  };
  function CategoryEditModalCtrl($scope, $state, $mdDialog, CategoryPassed) {
    
    $scope.editCategory = {};
    $scope.editCategory = CategoryPassed;

    $scope.cancel = function() {
        $mdDialog.cancel();
        $scope.editCategory.categoryTitle = $scope.categoryTitle;
    };
    $scope.save = function () {
      // do the saving part here
      CategoryService.editCategory({
          _id: $scope.editCategory._id,
          categoryName: $scope.editCategory.categoryName 
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
  });
