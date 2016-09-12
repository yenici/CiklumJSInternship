/**
 * Created by yenici on 9/12/2016.
 */
import deepExtend from '../deepExtend';
import deepCompare from '../deepCompare';

/* global test, expect: true */

test('deepExtend: Extend non object type', () => {
  expect(() => { deepExtend(false, {}); }).toThrowError(/Cannot extend non object argument/);
});

test('deepExtend: Extend non object type', () => {
  const ObjCreator = function ObjCreator() { this.prop = true; };
  expect(() => { deepExtend(ObjCreator, {}); }).toThrowError(/Cannot extend non object argument/);
});

test('deepExtend: Extend null', () => {
  expect(() => { deepExtend(null, {}); }).toThrowError(/Cannot extend null/);
});

test('deepExtend: Extend Array', () => {
  expect(() => { deepExtend([1, 2, 3], {}); }).toThrowError(/Cannot extend Array/);
});

test('deepExtend: Extend with null', () => {
  const obj = {
    a: true,
    b: 1.01,
    c: 'Hello',
    d: parseInt('a', 10),
    e: null,
    f: [1, 'a', true],
  };
  expect(deepCompare(obj, deepExtend(obj, null))).toBe(true);
});

test('deepExtend: Extend with self', () => {
  const obj = {
    a: true,
    b: 1.01,
    c: 'Hello',
    d: parseInt('a', 10),
    e: null,
    f: [1, 'a', true],
  };
  expect(deepCompare(obj, deepExtend(obj, obj))).toBe(true);
});

test('deepExtend: Extend with Array', () => {
  const obj = {
    a: true,
    b: 1.01,
    c: 'Hello',
    d: parseInt('a', 10),
    e: null,
    f: [1, 'a', true],
  };
  expect(deepCompare(obj, deepExtend(obj, [1, 'a', true]))).toBe(true);
});

test('deepExtend: Extend by object with defined property', () => {
  const a = {
    a: 'base',
    b: false,
    c: 0,
    d: 'Bye',
    e: 1,
    f: {},
    g: ['a', 'b', 'c'],
  };
  const b = { b: true };
  const c = { c: 1.01 };
  const d = { d: 'Hello' };
  const e = { e: undefined };
  const f = { f: null };
  const g = { g: [1, 2, 'Three'] };
  const h = { h: { ah: 1 } };
  Object.defineProperty(h.h, 'bh', {
    enumerable: false,
    configurable: false,
    value: 101,
    writable: false,
  });
  const referal = {
    a: 'base',
    b: true,
    c: 1.01,
    d: 'Hello',
    e: undefined,
    f: null,
    g: [1, 2, 'Three'],
    h: { ah: 1 },
  };
  Object.defineProperty(referal.h, 'bh', {
    enumerable: false,
    configurable: false,
    value: 101,
    writable: false,
  });
  const obj = deepExtend(a, b, c, d, e, f, g, h);
  expect(deepCompare(referal, obj)).toBe(true);
});

test('deepExtend: Extend by object with inheritance hierarchy', () => {
  function Parent() {
    this.ap = 'a in parent';
  }
  Parent.prototype.fnp = function fnp() {
    return 'Parent. Function fnp called';
  };

  function Child() {
    Parent.apply(this);
    this.ac = 'a in child';
  }
  Child.prototype = Object.create(Parent.prototype);
  Child.prototype.constructor = Child.prototype;
  Parent.prototype.fnc = function fnc() {
    return 'Child. Function fnc called';
  };

  const obj = deepExtend({}, { child: new Child() });
  const referal = {
    child: {
      ap: 'a in parent',
      ac: 'a in child',
    },
  };
  expect(deepCompare(obj, referal)).toBe(true);
});

test('deepExtend: Extend by object with inheritance hierarchy, test methods', () => {
  function Parent() {
    this.ap = 'a in parent';
  }
  Parent.prototype.fnp = function fnp() {
    return 'Parent. Function fnp called';
  };

  function Child() {
    Parent.apply(this);
    this.ac = 'a in child';
  }
  Child.prototype = Object.create(Parent.prototype);
  Child.prototype.constructor = Child.prototype;
  Parent.prototype.fnc = function fnc() {
    return 'Child. Function fnc called';
  };

  const obj = deepExtend({}, { child: new Child() });
  expect(obj.child.fnp()).toBe('Parent. Function fnp called');
});
