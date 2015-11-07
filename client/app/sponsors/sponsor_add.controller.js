'use strict';

angular.module('sponsPortalApp')
  .controller('SponsorAddCtrl',function ($upload, $scope, $http, CategoryService, $state) {
    $scope.submitted = false;
    $scope.file=null;
    $scope.priority=10;
    $scope.row_layout=1;
    var uploadFileSponsor = '';

    CategoryService.getAllCategorys()
    .then(function(allCategorys){
      $scope.allCategorys=allCategorys;
    },function(err){
      console.log(err);
    });

    var dataURItoBlob = function (dataURI) {
      var binary = atob(dataURI.split(',')[1]);
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      var array = [];
      for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], {type: mimeString});
    };

    var uploadfileName = '';

    var handleFileSelect = function(evt) {
      console.log(evt.currentTarget.files);
      var myfile = evt.currentTarget.files[0];
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function ($scope) {
          $scope.file = evt.target.result;
          console.log($scope.file);
        });
        uploadFileSponsor = myfile;
        uploadfileName = myfile.name;
      };
      reader.readAsDataURL(myfile);
    };

     // angular.element(document.querySelector('#file')).on('change', handleFileSelect);
     setTimeout(function () {angular.element(document.querySelector("#file")).on('change', handleFileSelect)}, 2000);


    
    $scope.submit = function(){
      console.log($scope.form.file);
      $scope.submitted = true;
    //   if($scope.file && $scope.form.file.$valid && !$scope.file.$error){
    //     $scope.upload($scope.file,function (err, response){
    //       console.log(response);
    //       if(err){
    //         console.log(err);
    //         return;
    //       }
    //       var body={
    //         title:$scope.title,
    //         sponsor_link:$scope.sponsor_link,
    //         logo:response.data.fileId,
    //         imagename: uploadFileSponsor.name,
    //         priority:$scope.priority||10,
    //         row_layout:$scope.row_layout||1,
    //         active:$scope.active||true
    //       };
    //       $http.post('/api/sponsors',body).
    //         then(function(response){
    //           console.log(response);
    //           //redirect to view spons
    //         });
    //       console.log(response);
    //     });
    //   } else {
    //     console.log("error")
    //     if($scope.form && $scope.form.file){
    //       console.log($scope.form.file.$error)
    //       console.log($scope.form.file.$valid)
    //     }
    //     if($scope.file)
    //       console.log($scope.file.$error)
    //   }
    // }
    // $scope.upload = function(file,cb){
    //     console.log(dataURItoBlob($scope.file));
    //     $upload.upload({
    //       url:'/api/uploads',
    //       file: dataURItoBlob($scope.file)
    //     }).then(function(response){
    //       console.log(response.data.fileId);
    //       cb(null,response)
    //     })
    // };

    if($scope.file && $scope.form.file.$valid && !$scope.file.$error) {
        $upload.upload({
          url: 'api/uploads/',
          file: dataURItoBlob($scope.file) 
        })
        .success(function (data, status, headers, config) {
          var body={
            title:$scope.title,
            category: JSON.parse($scope.category),
            sponsor_link:$scope.sponsor_link,
            logo: data.fileId,
            imagename: uploadFileSponsor.name,
            priority:$scope.priority||10,
            row_layout:$scope.row_layout||1,
            active:$scope.active||true
          };
        //   CategoryService.getCategory($scope.category._id)
        //     .then(function (data) {
        //     $scope.category = data;
        //     },function (err){
        //     console.log(err);
        //   });
        //   $scope.category.sponsors.push(data.fileId);
        //   CategoryService.editCategory({
        //   _id: $scope.category._id,
        //   sponsors: $scope.category.sponsors
        //   // .catch(function (err) {
        //   //   console.log(err);
        //   // })
        // })
          // console.log($scope.category);
          $http.post('/api/sponsors',body)
            .then(function(response){
              console.log(response);
            $state.go('sponsors');
              //redirect to view spons
            })
          // console.log(response);
          // .then(function (data) {
          //   $state.go('sponsors');
          // })
          .catch(function (err) {
            err = err.data;
            $scope.errors = {};

            // Update validity of form fields that match the mongoose errors
            angular.forEach(err.errors, function (error, field) {
              form[field].$setValidity('mongoose', false);
              $scope.errors[field] = error.message;
            });
          });
        })
        .error(function (data, status, headers, config) {
          console.log('File upload error');
        });
    }
  };
  });


    
    