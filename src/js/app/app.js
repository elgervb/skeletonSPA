
console.log('app.js');

var app = angular.module('default', ['ngRoute'])


// TODO implement it

.config(function($routeProvider, $locationProvider) {
 
  $routeProvider
  	.when('/', {
	  controller: 'formController',
	  templateUrl: '/assets/js/app/modules/form/form.html'
	})
	.when('/form', {
	  controller: 'formController',
	  templateUrl: '/assets/js/app/modules/form/form.html'
	})
	.when('/about', {
	  controller: 'AboutController',
	  templateUrl: '/assets/js/app/modules/about/about.html'
	});

   $locationProvider.html5Mode('true');

}); // end config
