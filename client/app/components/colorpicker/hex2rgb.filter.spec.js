/* global module, describe, it, expect, beforeEach, inject */
'use strict';

import factory from './hex2rgb.filter.js';

describe('hex2rgb filter unit tests', () => {
  let filter;
  
  beforeEach(() => {
    filter = factory();
  });
  
  it('should convert short hex to rgb', () => {
    let result = filter('#0f0');
    
    expect(result).to.be.a('array');
    expect(result).lengthOf(3);
    expect(result).to.have.property('0', 0);
    expect(result).to.have.property('1', 255);
    expect(result).to.have.property('2', 0);
  });
  
  it('should convert long hex to rgb', () => {
    let result = filter('#00ff00');
    
    expect(result).to.be.a('array');
    expect(result).lengthOf(3);
    expect(result).to.have.property('0', 0);
    expect(result).to.have.property('1', 255);
    expect(result).to.have.property('2', 0);
  });
  
  it('should return black on wrong value', () => {
    let result = filter('fff');
    
    expect(result).to.be.a('array');
    expect(result).lengthOf(3);
    expect(result).to.have.property('0', 0);
    expect(result).to.have.property('1', 0);
    expect(result).to.have.property('2', 0);
  });
  
});
