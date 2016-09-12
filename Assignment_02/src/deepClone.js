/**
 * Created by yenici on 9/9/2016.
 */

import deepExtend from './deepExtend';
// const deepExtend = require('./deepExtend');

function deepClone(object) {
  if (typeof object !== 'object') {
    return null;
  }
  return deepExtend(Object.create(Object.getPrototypeOf(object)), object);
}

// module.exports = deepClone;
export default deepClone;
it