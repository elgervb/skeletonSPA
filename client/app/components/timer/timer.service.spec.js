/* global module, describe, it, expect, beforeEach, inject */
import TimerModule from './timer';
import service from './timer.service';

describe('Timer', () => {
  let $rootScope;

  beforeEach(window.module(TimerModule.name));
  
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });
});
