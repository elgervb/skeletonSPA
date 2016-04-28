import Moment from 'moment';

class TimeFilter {
  constructor() {
  }
  
  filter(input) {
    let nr, format;
    if (typeof input === 'number') {
      nr = input;
    } else {
      nr = parseFloat(input);
    }
    
    if (isNaN(nr)) {
      return input;
    }
    
    if (nr >= 3600) {
      format = 'h:mm:ss.S'
    } else if (nr >= 60) {
       format = 'm:ss.S'
    } else {
      format = 's.S';
    }
    return Moment.utc(Moment.duration(nr*1000).asMilliseconds()).format(format);
  }
  
  
  
  static factory() {
    'ngInject';
    return (input) => {
      return new TimeFilter().filter(input);
    };
  }
}

export default TimeFilter.factory;
