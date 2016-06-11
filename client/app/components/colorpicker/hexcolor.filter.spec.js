/* global module, describe, it, expect, beforeEach, inject */
'use strict';

import factory from './hexcolor.filter.js';

describe('hexcolor filter unit tests', () => {
  let filter;
  
  beforeEach(() => {
    filter = factory();
  });
  
  it('should convert string to hex color', () => {
    let result = filter('000000');
    expect(result).to.equal('#000000');
  });
  
});
