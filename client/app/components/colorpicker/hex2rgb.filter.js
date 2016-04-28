class Hex2Rgb {
  constructor() {}
  
  filter(input) {
    return this.hex2rgb(input);
  }
  
  hex2rgb(hex) {
    let r;
    // long version
    r = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
    if (r) {
      return r.slice(1, 4).map((x) => {
        return parseInt(x, 16); 
      });
    }
    // short version
    r = hex.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i);
    if (r) {
      return r.slice(1, 4).map((x) => {
        return 0x11 * parseInt(x, 16); 
      });
    }
    return [0, 0, 0]; // default value
  }
  
  static factory() {
    return (input) => {
      return new Hex2Rgb().filter(input);
    };
  }
}

export default Hex2Rgb.factory;
