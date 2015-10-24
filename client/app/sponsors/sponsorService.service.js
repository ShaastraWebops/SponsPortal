'use strict';

angular.module('sponsPortalApp')
  .service('SponsorService', function ($http)  {
  	return {
  	  createSponsor: function (data) {
  	  	return $http.post ('/api/sponsors', data).then(function (response) {
  	  	  return response;	
  	  	});
  	  },
      getSponsor: function (sponsorId) {
        return $http.get('/api/sponsors/' + sponsorId).then(function (response) {
          return response.data;
        });
      },
  	  getAllSponsors: function () {
  	    return $http.get('/api/sponsors').then(function (response) {
          return response.data;
        });
  	  },
  	  editSponsor: function (data) {
        return $http.put('/api/sponsors/' + data._id, data).then(function (response) {
          return response;
        });
      },
      deleteSponsor: function (id) {
        return $http.delete('/api/sponsors/' + id).then(function (response) {
          return response;
        });
      }   
  	};
  });