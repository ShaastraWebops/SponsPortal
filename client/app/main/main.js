'use strict';

angular.module('sponsPortalApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
		    // data: {
	     //    permissions: {
      //     	except: ['anonymous', 'admin', 'user', 'core'],
      //     	redirectTo: 'coordPortalEditProfile'
      //     }
      //   }        
      });
  });