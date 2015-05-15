/*jslint node: true */
/*global angular, describe, it, jasmine, expect, beforeEach, compile, browserTrigger */
"use strict";

/**
 * Tests for MainController
 */
describe("Main Controller", function(){

  var $scope, controller;

  // Get the module
  beforeEach(function () {
    module('skeleton');
  });

  // inject what we need
  beforeEach(inject(function($controller, $rootScope){
    $scope = $rootScope.$new();
    controller = $controller('MainController', { '$scope': $scope });
  }));

  it('check the default scope', function() {
    expect($scope.divider).toEqual('+');
  });

  it('Change the default scope', function() {
    $scope.changeDivider('-');
    expect($scope.divider).toEqual('-');
  });
});