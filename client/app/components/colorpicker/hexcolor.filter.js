class HexColor {
  constructor() {}
  
  filter(input) {
    return `#${input}`;
  }
 
  static factory() {
    'ngInject';
    return (input) => {
      return new HexColor().filter(input);
    };
  }
}

export default HexColor.factory;
