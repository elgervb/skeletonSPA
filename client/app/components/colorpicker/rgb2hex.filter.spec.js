/* global module, describe, it, expect, beforeEach, inject */
'use strict';

import factory from './rgb2hex.filter.js';

describe('rgb2hex filter unit tests', () => {
  let filter;
  let mockLog = {
    warn: (msg) => {throw new Error(msg);}
  }
  
  beforeEach(() => {
    filter = factory(mockLog);
  });
  
  it('should convert array to hex color', () => {
    let result = filter([0, 0, 0]);
    expect(result).to.equal('#000000');
  });
  
  it('should convert object to hex color', () => {
    let result = filter({red: 0, green: 0, blue: 0});
    expect(result).to.equal('#000000');
  });
  
  it('should log on wrong value', () => {
    let err;
    try {
      filter('color');
    } catch (e) {
      err = e;
    }
    
    expect(err).to.be.a.instanceOf(Error);
  });
  
});
