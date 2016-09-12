/**
 * Created by yenici on 9/12/2016.
 */
import deepExtend from '../deepExtend';

/* global test, expect: true */

test('', () => {});

// const a = { a: 1 };
// const b = { b: 2 };
// const c = { c: 3 };
// const d = { d(x) {
//   /**
//    *
//    *
//    *
//    *
//    *
//    *
//    *
//    *
//    *
//    *
//    */
//   return x * x;
// } };
// const e = { e: undefined };
// const f = { f: null };
// const g = { g: [1, 2, 'Three'] };
// const h = { h: { ah: 1 } };
// Object.defineProperty(h.h, 'bh', {
//   enumerable: false,
//   configurable: false,
//   value: 101,
//   writable: false,
// });
// // const o = deepExtend(a, b, c, d, e, f, g, h);
// // console.log(o);
//
// function Op() {
//   this.ap = 'a in parent';
// }
// Op.prototype.fnp = function() {
//   console.log('Parent. Function fnp called');
// }
// function Oc() {
//   Op.apply(this);
//   this.ac = 'a in child';
// }
// Oc.prototype = Object.create(Op.prototype);
// Oc.prototype.constructor = Oc.prototype;
// Op.prototype.fnc = function() {
//   console.log('Child. Function fnc called');
// }
//
// const o = deepExtend(a, { i: new Oc() });
// console.log(new Oc());
// console.log(o);
//
// class Pclass {
//   constructor() {
//     this.pdata = 'Parent data';
//   }
// };
//
// class Cclass extends Pclass {
//   constructor() {
//     super();
//     this.cdata = 'Child data';
//   }
// }
//
// const oo = deepExtend(o, { oclass: new Cclass() });
// console.log(oo);
// oo.i.fnp();
// oo.i.fnc();
