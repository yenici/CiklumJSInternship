/**
 * Created by Dmytro on 9/11/2016.
 */
const day01 = require('./Day01').solution;

/* global describe, test, expect, toBe: true */

describe('Day 01. Test current level.', () => {
  test('(()) results to floor number 0.', () => {
    expect(day01('(())').level).toBe(0);
  });

  test('()() results to floor number 0.', () => {
    expect(day01('()()').level).toBe(0);
  });

  test('((( results to floor number 3.', () => {
    expect(day01('(((').level).toBe(3);
  });

  test('(()(()( results to floor number 3.', () => {
    expect(day01('(()(()(').level).toBe(3);
  });

  test('))((((( results to floor number 3.', () => {
    expect(day01('))(((((').level).toBe(3);
  });

  test('()) results to floor number -1.', () => {
    expect(day01('())').level).toBe(-1);
  });

  test('))( results to floor number -1.', () => {
    expect(day01('))(').level).toBe(-1);
  });

  test('))) results to floor number -3.', () => {
    expect(day01(')))').level).toBe(-3);
  });

  test(')())()) results to floor number -3.', () => {
    expect(day01(')())())').level).toBe(-3);
  });
});

describe('Day 01. Test the step of entering basement level.', () => {
  test(') results to step 1', () => {
    expect(day01(')').baseOnStep).toBe(1);
  });
  test('()()) results to step 1', () => {
    expect(day01('()())').baseOnStep).toBe(5);
  });
});

