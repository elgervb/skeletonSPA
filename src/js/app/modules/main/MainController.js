/* global app */
/**
 * Main controller
 */
angular.module('skeleton').controller('MainController', ['$scope', function($scope) {

  $scope.divider = '+';
  
  /**
   * Change the divider between Gulp and AngularJS
   */
  $scope.changeDivider = function(divider) {
    $scope.divider = divider;
  };

}]);