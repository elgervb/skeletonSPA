
console.log('app.js');

var app = angular.module('default', ['ngRoute'])


// TODO implement it

.config(function($routeProvider, $locationProvider) {
 
  $routeProvider
  	.when('', {
	  controller: 'formController',
	  templateUrl: '/assets/js/app/modules/form.html'
	})
	.when('/', {
	  controller: 'formController',
	  templateUrl: '/assets/js/app/modules/form.html'
	})
	.when('/form', {
	  templateUrl: 'static/app/views/settingsView.html',
	  controller: 'settingsController'
	});

   $locationProvider.html5Mode('true');

}); // end config
