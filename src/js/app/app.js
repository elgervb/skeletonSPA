
var app = angular.module('skeleton', ['ngRoute'])

.config(function($routeProvider, $locationProvider) 
 
  $routeProvider
    .otherwise({
      controller: 'MainController',
      templateUrl: '/js/app/modules/main/main.html'
    });

   $locationProvider.html5Mode('true');

}); // end config
