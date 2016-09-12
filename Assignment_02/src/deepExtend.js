/**
 * Created by yenici on 9/9/2016.
 */
function deepExtend(target, ...sources) {
  if (typeof target !== 'object' || typeof target === 'function') {
    throw Object.create({ message: 'Cannot extend non object argument', name: 'TypeError' });
  }
  if (target === null) {
    throw Object.create({ message: 'Cannot extend null', name: 'TypeError' });
  }
  return sources.reduce((object, extender) => {
    /* eslint no-param-reassign: ["error", { "props": false }] */
    // Do not process null or undefined objects
    if (extender != null && target !== extender) {
      const extenderProps = Object.getOwnPropertyNames(extender);
      extenderProps.forEach(prop => {
        const value = extender[prop];
        if (typeof value === 'object') {
          if (value === null) {
            object[prop] = null;
          } else if (value instanceof Array) {
            object[prop] = [].concat(value);
          } else {
            // TODO: self-references
            object[prop] = deepExtend(Object.create(Object.getPrototypeOf(value)), value);
          }
        } else {
          // Process primitive values and functions
          Object.defineProperty(object, prop, Object.getOwnPropertyDescriptor(extender, prop));
        }
      });
    }
    return object;
  }, target);
}

// module.exports = deepExtend;
export default deepExtend;
