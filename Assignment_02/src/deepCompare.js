/**
 * Created by yenici on 9/9/2016.
 */
function deepCompare(obj1, obj2) {
  if (typeof obj1 !== 'object' && typeof obj2 !== 'object') {
    if (Number.isNaN(obj1) && Number.isNaN(obj2)) {
      return true;
    }
    return obj1 === obj2;
  }
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return false;
  }
  // Compare for references equality
  if (obj1 === obj2) {
    return true;
  }
  if (obj1 == null || obj2 == null) {
    return obj1 === obj2;
  }
  const props = Object.getOwnPropertyNames(obj1);
  if (props.length !== Object.getOwnPropertyNames(obj2).length) {
    return false;
  }
  let equals = true;
  let val1;
  let val2;
  for (let i = 0; i < props.length; i += 1) {
    if ({}.hasOwnProperty.call(obj2, props[i])) {
      val1 = obj1[props[i]];
      val2 = obj2[props[i]];
      if (typeof val1 === typeof val2) {
        if (typeof val1 === 'object') {
          if (val1 instanceof Array) {
            // Working with Array
            if (val1.length === val2.length) {
              for (let j = 0; j < val1.length; j += 1) {
                equals = deepCompare(val1[j], val2[j]);
                if (!equals) {
                  break;
                }
              }
              if (!equals) {
                break;
              }
            } else {
              equals = false;
              break;
            }
          } else {
            // TODO: object but not an Array
            equals = deepCompare(val1, val2);
            if (!equals) {
              break;
            }
          }
        } else if (typeof val1 === 'function') {
          equals = (val1.toString() === val2.toString());
          if (!equals) {
            break;
          }
        } else if (!deepCompare(val1, val2)) {
          equals = false;
          break;
        }
      } else {
        equals = false;
        break;
      }
    } else {
      equals = false;
      break;
    }
  }
  return equals;
}

export default deepCompare;
