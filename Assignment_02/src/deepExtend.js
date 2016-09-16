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
  if (Array.isArray(target)) {
    throw Object.create({ message: 'Cannot extend Array', name: 'TypeError' });
  }
  return sources.reduce((object, extender) => {
    /* eslint no-param-reassign: ["error", { "props": false }] */
    // Do not process null or undefined objects
    if (extender != null && extender !== target && !Array.isArray(target)) {
      const extenderProps = Object.getOwnPropertyNames(extender);
      extenderProps.forEach(prop => {
        const value = extender[prop];
        if (typeof value === 'object') {
          if (value === null) {
            object[prop] = null;
          } else if (Array.isArray(value)) {
            /**
             * Arrays deep cloning
             *
             * @param arr
             * @returns {Array}
             */
            const deepCloneArray = function deepCloneArray(arr) {
              return arr.map(element => {
                let processedElement;
                if (typeof element === 'object') {
                  if (Array.isArray(element)) {
                    processedElement = deepCloneArray(element);
                  } else {
                    // Clone emulation
                    processedElement =
                      deepExtend(Object.create(Object.getPrototypeOf(element)), element);
                  }
                } else {
                  // TODO: Functions are processed here. Is it right approach?
                  processedElement = element;
                }
                return processedElement;
              });
            };
            object[prop] = deepCloneArray(value);
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
