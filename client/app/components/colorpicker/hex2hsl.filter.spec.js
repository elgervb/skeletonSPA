/* global module, describe, it, expect, beforeEach, inject */
'use strict';

import factory from './hex2hsl.filter.js';

describe('hex2hsl filter unit tests', () => {
  let filter;
  
  beforeEach(() => {
    filter = factory();
  });
  
  it('should convert short hex to hsl', () => {
    let result = filter('#0f0');
    
    expect(result).to.be.a('array');
    expect(result).lengthOf(3);
    expect(result).to.have.property('0', 33);
    expect(result).to.have.property('1', 100);
    expect(result).to.have.property('2', 50);
  });
  
  it('should convert long hex to hsl', () => {
    let result = filter('#00ff00');
    
    expect(result).to.be.a('array');
    expect(result).lengthOf(3);
    expect(result).to.have.property('0', 33);
    expect(result).to.have.property('1', 100);
    expect(result).to.have.property('2', 50);
  });
  
  it('should return default on wrong value', () => {
    let result = filter('fff');
    
    expect(result).to.be.a('array');
    expect(result).lengthOf(3);
    expect(result).to.have.property('0', 0);
    expect(result).to.have.property('1', 0);
    expect(result).to.have.property('2', 100);
  });
  
});
