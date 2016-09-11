/**
 * Created by Dmytro on 9/9/2016.
 */
function deepCompare(obj1, obj2) {
  "use strict";
  // Compare for references equality
  if (obj1 === obj2)
    return true;

  if (!obj1 || !obj2)
    return false;
  if (typeof obj1 !== 'object' && typeof obj2 !== 'object')
    return obj1 === obj2;
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object')
    return true;
}

export default deepCompare;