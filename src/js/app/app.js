/**
 * Declaration of the main skeleton app
 */
var app = angular.module('skeleton', ['ngRoute'])

/**
 * Configuration: state your routes and other configuration items here
 */
.config(function($routeProvider, $locationProvider) {
  
  $routeProvider
    .otherwise({
      controller: 'MainController',
      templateUrl: '/js/app/modules/main/main.html'
    });

  $locationProvider.html5Mode('true');

});
