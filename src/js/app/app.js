
var app = angular.module('default', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
 
  $routeProvider
    .otherwise({
      controller: 'MainController',
      templateUrl: '/js/app/modules/main/main.html'
    });

   $locationProvider.html5Mode('true');

}); // end config
