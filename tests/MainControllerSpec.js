/*jslint node: true */
/*global angular, describe, it, jasmine, expect, beforeEach, compile, browserTrigger */
"use strict";

describe("Main Controller", function(){

  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  describe('$scope.divider', function() {
    it('sets the scope divider', function() {
      var $scope = {};
      var controller = $controller('MainController', { '$scope': $scope });
      $scope.divider = '++';
      expect($scope.divider).toEqual('++');
    });
  });
});