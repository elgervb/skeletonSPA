class Hex2Hsl {
  constructor() {}
  
  filter(input) {
    return this.hex2hsl(input);
  }
  
  hex2hsl(inputHex) {
    let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    let hex = inputHex.replace(shorthandRegex, (m2, r2, g2, b2) => {
      return r2 + r2 + g2 + g2 + b2 + b2;
    });

    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    let RGB = result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    }
    : {r: 255, g: 255, b: 255};

    let r = RGB.r / 255; 
    let g = RGB.g / 255;
    let b = RGB.b / 255;
    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let h, s;
    let l = (max + min) / 2;

    if (max === min) { 
      h = s = 0; 
    } else {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
      default: break;
      }
      
      h = h / 6;
    }
    
    return [((h * 100 + 0.5) | 0), ((s * 100 + 0.5) | 0), ((l * 100 + 0.5) | 0)];
  }
  
  static factory() {
    return (input) => {
      return new Hex2Hsl().filter(input);
    };
  }
}

export default Hex2Hsl.factory;
