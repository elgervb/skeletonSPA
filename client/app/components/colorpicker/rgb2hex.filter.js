class Rgb2Hex {
  constructor($log) {
    this.$log = $log;
  }
  
  filter(input) {
    if (typeof input === 'object' && input.length && input.length >= 3) { // array
      return this.rgb2hex(input[0], input[1], input[2]);
    } else if (typeof input === 'object' && typeof input.red !== 'undefined' && typeof input.green !== 'undefined' && typeof input.blue !== 'undefined') {
      return this.rgb2hex(input.red, input.green, input.blue);
    }
    
    if (typeof input === 'undefined') {
      return '';
    }
    this.$log.warn('Rgb2Hex input should be an array [r,g,b], or an object {red, green, blue}', input);
    return '';
  }
  
  rgb2hex(red, green, blue) {
    let rgb = blue | (green << 8) | (red << 16);
    return `#${(0x1000000 + rgb).toString(16).slice(1)}`;
  }
  
  static factory($log) {
    'ngInject';
    return (input) => {
      return new Rgb2Hex($log).filter(input);
    };
  }
}

export default Rgb2Hex.factory;
