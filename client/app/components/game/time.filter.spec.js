/* global module, describe, it, expect, beforeEach, inject */
'use strict';

import factory from './time.filter.js';

describe('time filter unit tests', () => {
  let filter;
  
  beforeEach(() => {
    filter = factory();
  });
  
  it('should format hours', () => {
    let result = filter(3600);
    expect(result).to.equal('1:00:00.0');
  });
  
  it('should format minutes', () => {
    let result = filter(3599);
    expect(result).to.equal('59:59.0');
  });
  
  it('should format seconds', () => {
    let result = filter(59);
    expect(result).to.equal('59.0');
  });
  
  it('should format seconds from string', () => {
    let result = filter('59');
    expect(result).to.equal('59.0');
  });
  
  it('should pass invalid data', () => {
    let result = filter('ff59');
    expect(result).to.equal('ff59');
  });
  
});
