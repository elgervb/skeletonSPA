/* global angular */
/**
 * Main controller
 */
angular.module('skeleton').controller('MainController', ($scope) => {

  $scope.divider = '+';
  
  /**
   * Change the divider between Gulp and AngularJS
   * @param {string} divider The devider between gulpJS and angularJS
   * @return {void}
   */
  $scope.changeDivider = (divider) => {
    $scope.divider = divider;
  };

});
