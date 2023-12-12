import {Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
const screenSize = Math.sqrt(width * height) / 100;

const setHeight = h => (height / 100) * h;
const setWidth = w => (width / 100) * w;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const scale = size => (width / guidelineBaseWidth) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;
export default {setHeight, setWidth, verticalScale};