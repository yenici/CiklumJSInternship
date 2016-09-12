/**
 * Created by yenici on 9/9/2016.
 */

/* global test, expect: true */

import deepCompare from './../deepCompare';

test('Compare non object types (true, true)', () => {
  expect(deepCompare(true, true)).toBe(true);
});

test('Compare non object types (true, false)', () => {
  expect(deepCompare(true, false)).toBe(false);
});

test('Compare non object types (1, 2.03)', () => {
  expect(deepCompare(1, 2.03)).toBe(false);
});

test('Compare non object types (\'hello\', \'Hello\')', () => {
  expect(deepCompare('hello', 'Hello')).toBe(false);
});

test('Compare two NaNs', () => {
  expect(deepCompare(parseInt('f', 10), 0 / 0)).toBe(true);
});

test('Compare object to non object ({}, false)', () => {
  expect(deepCompare({}, false)).toBe(false);
});

test('Both arguments are nulls', () => {
  expect(deepCompare(null, null)).toBe(true);
});

test('The arguments are the same object', () => {
  const obj = {};
  expect(deepCompare(obj, obj)).toBe(true);
});

test('One argument is null, another - object', () => {
  expect(deepCompare(null, {})).toBe(false);
});

test('Objects with different number of properties', () => {
  expect(deepCompare({ a: 1 }, { a: 1, b: 2 })).toBe(false);
});

test('Compare { a: 1 } to { a: 1 }', () => {
  expect(deepCompare({ a: 1 }, { a: 1 })).toBe(true);
});

test('Compare objects with equal arrays', () => {
  expect(deepCompare({ a: [1, 2] }, { a: [1, 2] })).toBe(true);
});

test('Compare objects with different arrays', () => {
  expect(deepCompare({ a: [1, 2] }, { a: [2] })).toBe(false);
});

test('Compare objects with different array\'s elements', () => {
  expect(deepCompare({ a: [1, 2] }, { a: [2, 1] })).toBe(false);
});

test('Compare objects with the same function', () => {
  const f = function (x) { return x * x; };
  expect(deepCompare({ a: f }, { a: f })).toBe(true);
});

test('Compare objects with the same function\'s text', () => {
  expect(deepCompare({ a: function (x) { return x * x; } }, { a: function (x) { return x * x; } })).toBe(true);
});

test('Compare objects with the same function\'s text (without spaces)', () => {
  expect(deepCompare({ a: function (x) { return x * x; } }, { a: function (x) { return x*x; } })).toBe(true);
});

test('Compare objects with the differnt function\'s text', () => {
  expect(deepCompare({ a: function (x) { return x * x; } }, { a: function (x) { return 2 * x; } })).toBe(false);
});

test('Compare two equals complicated objects', () => {
  const obj1 = {
    a: 1,
    b: [1, 2, 3],
    c: 'Hello',
    d: {
      a: 1,
      b: [1, 2, 3],
      c: 'Hello',
      d: {
        a: 1,
        b: [1, 2, 3],
        c: 'Hello',
      },
    },
    e: function(x, y) {
      return x + y;
    },
  };
  const obj2 = {
    b: [1, 2, 3],
    e: function(x, y) {
      return x + y;
    },
    a: 1,
    c: 'Hello',
    d: {
      a: 1,
      d: {
        c: 'Hello',
        b: [1, 2, 3],
        a: 1,
      },
      b: [1, 2, 3],
      c: 'Hello',
    },
  };
  expect(deepCompare(obj1, obj2)).toBe(true);
});

test('Compare two complicated objects with distinction in number of props', () => {
  const obj1 = {
    a: 1,
    b: [1, 2, 3],
    c: 'Hello',
    d: {
      a: 1,
      b: [1, 2, 3],
      c: 'Hello',
      d: {
        // a: 1,
        b: [1, 2, 3],
        c: 'Hello',
      },
    },
    e: function(x, y) {
      return x + y;
    },
  };
  const obj2 = {
    b: [1, 2, 3],
    e: function(x, y) {
      return x + y;
    },
    a: 1,
    c: 'Hello',
    d: {
      a: 1,
      d: {
        c: 'Hello',
        b: [1, 2, 3],
        a: 1,
      },
      b: [1, 2, 3],
      c: 'Hello',
    },
  };
  expect(deepCompare(obj1, obj2)).toBe(false);
});

test('Compare two complicated objects with distinction in props\' names', () => {
  const obj1 = {
    a: 1,
    b: [1, 2, 3],
    c: 'Hello',
    d: {
      a: 1,
      b: [1, 2, 3],
      c: 'Hello',
      d: {
        f: 1, // HERE!
        b: [1, 2, 3],
        c: 'Hello',
      },
    },
    e: function(x, y) {
      return x + y;
    },
  };
  const obj2 = {
    b: [1, 2, 3],
    e: function(x, y) {
      return x + y;
    },
    a: 1,
    c: 'Hello',
    d: {
      a: 1,
      d: {
        c: 'Hello',
        b: [1, 2, 3],
        a: 1,
      },
      b: [1, 2, 3],
      c: 'Hello',
    },
  };
  expect(deepCompare(obj1, obj2)).toBe(false);
});
