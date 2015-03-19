
var app = angular.module('default', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
 
  $routeProvider
	.when('/about', {
	  controller: 'AboutController',
	  templateUrl: '/assets/js/app/modules/about/about.html'
	})
  .otherwise({
    controller: 'MainController',
    templateUrl: '/assets/js/app/modules/main/main.html'
  });

   $locationProvider.html5Mode('true');

}); // end config
