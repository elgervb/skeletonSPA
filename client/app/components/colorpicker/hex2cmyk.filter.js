class Hex2Cmyk {
  constructor() {}
  
  filter(input) {
    return this.hex2cmyk(input);
  }
  
  hex2cmyk(inputHex) {
    let hex, shorthandRegex, result, RGB, r, g, b, divider;
    // convert to rgb
    shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = inputHex.replace(shorthandRegex, (m2, r2, g2, b2) => {
      return r2 + r2 + g2 + g2 + b2 + b2;
    });

    result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    RGB = result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    }
    : {r: 255, g: 255, b: 255};
  
    result = {c: 0, m: 0, y: 0, k: 0};
    r = RGB.r / 255;
    g = RGB.g / 255;
    b = RGB.b / 255;
    divider = (1 - result.k) || 1;
    
    result.k = Math.min(1 - r, 1 - g, 1 - b);
    result.c = (1 - r - result.k) / divider;
    result.m = (1 - g - result.k) / divider;
    result.y = (1 - b - result.k) / divider;
    result.c = Math.round(result.c * 100);
    result.m = Math.round(result.m * 100);
    result.y = Math.round(result.y * 100);
    result.k = Math.round(result.k * 100);
    return [result.c, result.m, result.y, result.k];
  }
  
  static factory() {
    return (input) => {
      return new Hex2Cmyk().filter(input);
    };
  }
}

export default Hex2Cmyk.factory;
