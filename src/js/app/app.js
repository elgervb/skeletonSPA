/* global angular */
/**
 * Declaration of the main skeleton app
 */
angular.module('skeleton', ['ngRoute', 'templates'])

/**
 * Configuration: state your routes and other configuration items here
 */
.config(($routeProvider, $locationProvider) => {
  
  $routeProvider
    .otherwise({
      controller: 'MainController',
      templateUrl: 'modules/main/main.html'
    });

  $locationProvider.html5Mode('true');

});
