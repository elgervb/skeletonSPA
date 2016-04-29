class ColorpickerController {
  /* @ngInject */
  constructor($filter, $scope) {
    this.name = 'colorpicker';
    this.rgbFilter = $filter('hex2rgb');
    this.$scope = $scope;
  }
  
  $onInit() {
    if (!this.init) {
      this.init = '#ffffff';
    }
    this.hexcolor = this.init;
    let color = this.rgbFilter(this.init);
    this.color = {
      red: color[0],
      green: color[1],
      blue: color[2]
    };
  }
}

export default ColorpickerController;
