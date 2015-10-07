'use strict';

angular.module('sponsPortalApp')
  .service('CategoryService', function ($http)  {
  	return {
  	  createCategory: function (data) {
  	  	return $http.post ('/api/categorys', data).then(function (response) {
  	  	  return response;	
  	  	});
  	  },
  	  getAllCategorys: function () {
  	    return $http.get('/api/categorys').then(function (response) {
          return response.data;
        });
  	  },
  	  editCategory: function (data) {
        return $http.put('/api/categorys/' + data._id, data).then(function (response) {
          return response;
        });
      },
      deleteCategory: function (id) {
        console.log(id);
        return $http.delete('/api/categorys/' + id).then(function (response) {
          return response;
        });
      }   
  	};
  });