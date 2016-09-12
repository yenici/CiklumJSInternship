/**
 * Created by yenici on 9/12/2016.
 */
import deepClone from '../deepClone';
import deepCompare from '../deepCompare';

/* global test, expect: true */

test('deepClone: Non object argument', () => {
  expect(deepClone(false)).toBe(null);
});

test('deepClone: Array argument', () => {
  const obj = [1, 2, 3];
  expect(deepClone(obj)).toBe(null);
});

test('deepClone: Empty object argument', () => {
  const obj = {};
  expect(deepCompare(obj, deepClone(obj))).toBe(true);
});

test('deepClone: Simple object', () => {
  const obj1 = {
    a: 1,
    b: true,
    c: 'Hello',
    d: parseInt('f', 10), // undefined
    e: null,
    f(x, y) { return x + y; },
    g: [1, false, 'true'],
    h: {
      ha: 1,
      hb: true,
      hc: 'Hello',
      hd: parseInt('f', 10), // undefined
      he: null,
      hf(x, y) { return x * y; },
      hg: [1, false, 'true'],
    },
  };
  const obj2 = deepClone(obj1);
  expect(deepCompare(obj1, obj2)).toBe(true);
});

// test('', () => {
//   const obj = {};
//   expect(deepCompare(obj, deepClone(obj))).toBe(true);
// });
