/* global angular */
/**
 * Main controller
 */
angular.module('skeleton').controller('MainController', ($scope) => {

  $scope.divider = '+';
  
  /**
   * Change the divider between Gulp and AngularJS
   */
  $scope.changeDivider = (divider) => {
    $scope.divider = divider;
  };

});
