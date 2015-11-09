/* global describe, inject it, jasmine, expect, beforeEach */
/**
 * <h1>Tests for MainController</h1>
 */
describe('Main Controller', () => {

  let $scope;

  // Get the module
  beforeEach(() => {
    module('skeleton');
  });

  // inject what we need
  beforeEach(inject(($controller, $rootScope) => {
    $scope = $rootScope.$new();
    $controller('MainController', {$scope});
  }));

  /**
   * Test the initial scope values
   */
  it('check the default scope', () => {
    expect($scope.divider).toEqual('+');
  });

  /**
   * Test default scope changes
   */
  it('Change the default scope', () => {
    $scope.changeDivider('-');
    expect($scope.divider).toEqual('-');
  });
});
