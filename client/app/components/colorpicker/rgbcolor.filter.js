class RgbColor {
  constructor() {}
  
  filter(input) {
    if (typeof input === 'object' && input.length && input.length >= 3) { // array
      return `rgb(${input[0]},${input[1]},${input[2]})`;
    } else if (typeof input === 'object' && typeof input.red !== 'undefined' && typeof input.green !== 'undefined' && typeof input.blue !== 'undefined') {
      return `rgb(${input.red},${input.green},${input.blue})`;
    }
    
    return input;
  }
 
  static factory() {
    'ngInject';
    return (input) => {
      return new RgbColor().filter(input);
    };
  }
}

export default RgbColor.factory;
