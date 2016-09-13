const calculateArea = require('./../Day02').calculateArea;
const calculateTotalArea = require('./../Day02').calculateTotalArea;

const calculateLength = require('./../Day02').calculateLength;
const calculateTotalLength = require('./../Day02').calculateTotalLength;

/* global describe, test, expect, toBe: true */

describe('Day 02. Test calculations of a dimension', () => {
  test('A present with dimensions 2x3x4', () => {
    expect(calculateArea('2x3x4')).toBe(58);
  });
  test('A present with dimensions 1x1x10', () => {
    expect(calculateArea('1x1x10')).toBe(43);
  });
});

describe('Day 02. Test calculations from a file', () => {
  test('Dimensions from ./src/__test__/Day02.spec.txt', () => {
    expect(calculateTotalArea('./src/__test__/Day02.spec.txt')).toBe(101);
  });
});

describe('Day 02. Test calculations of a ribbon\'s length', () => {
  test('A present with dimensions 2x3x4', () => {
    expect(calculateLength('2x3x4')).toBe(34);
  });
  test('A present with dimensions 1x1x10', () => {
    expect(calculateLength('1x1x10')).toBe(14);
  });
});

describe('Day 02. Test calculations of a ribbon\'s length from a file', () => {
  test('Dimensions from ./src/__test__/Day02.spec.txt', () => {
    expect(calculateTotalLength('./src/__test__/Day02.spec.txt')).toBe(48);
  });
});
