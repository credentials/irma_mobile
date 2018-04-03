// var enzyme = require('enzyme');
import enzyme from 'enzyme';
var Adapter = require('enzyme-adapter-react-16');

enzyme.configure({
  adapter: new Adapter()
});
