const getLevelAndStep = require('./../Day01').getLevelAndStep;

/* global describe, test, expect, toBe: true */

describe('Day 01. Test current level.', () => {
  test('(()) results to floor number 0.', () => {
    expect(getLevelAndStep('(())').level).toBe(0);
  });

  test('()() results to floor number 0.', () => {
    expect(getLevelAndStep('()()').level).toBe(0);
  });

  test('((( results to floor number 3.', () => {
    expect(getLevelAndStep('(((').level).toBe(3);
  });

  test('(()(()( results to floor number 3.', () => {
    expect(getLevelAndStep('(()(()(').level).toBe(3);
  });

  test('))((((( results to floor number 3.', () => {
    expect(getLevelAndStep('))(((((').level).toBe(3);
  });

  test('()) results to floor number -1.', () => {
    expect(getLevelAndStep('())').level).toBe(-1);
  });

  test('))( results to floor number -1.', () => {
    expect(getLevelAndStep('))(').level).toBe(-1);
  });

  test('))) results to floor number -3.', () => {
    expect(getLevelAndStep(')))').level).toBe(-3);
  });

  test(')())()) results to floor number -3.', () => {
    expect(getLevelAndStep(')())())').level).toBe(-3);
  });
});

describe('Day 01. Test the step of entering basement level.', () => {
  test(') results to step 1', () => {
    expect(getLevelAndStep(')').baseOnStep).toBe(1);
  });
  test('()()) results to step 1', () => {
    expect(getLevelAndStep('()())').baseOnStep).toBe(5);
  });
});

