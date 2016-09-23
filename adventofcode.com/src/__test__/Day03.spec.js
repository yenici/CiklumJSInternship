/* global require describe, test, expect, toBe: true */

const { Day03 } = require('../Day03');

describe('Day 03. NewYearLights class tests.', () => {
  test('">" delivers presents to 2 houses', () => {
    const day03 = new Day03();
    expect(day03.move('>').getVisitedHousesCount()).toBe(2);
  });
  test('"*" throws an error', () => {
    const day03 = new Day03();
    expect(() => {
      day03.move('*').getVisitedHousesCount();
    })
      .toThrowError(/Day03. Wrong instruction/);
  });
  test('"^>v<" delivers presents to 4 houses in a square', () => {
    const day03 = new Day03();
    expect(day03.moveByRoute('^>v<').getVisitedHousesCount()).toBe(4);
  });
  test('"^v^v^v^v^v" delivers a bunch of presents to only 2 houses', () => {
    const day03 = new Day03();
    expect(day03.moveByRoute('^v^v^v^v^v').getVisitedHousesCount()).toBe(2);
  });
  test('Route "^v^v^v^v^v" from file delivers a bunch of presents to only 2 houses', () => {
    const day03 = new Day03();
    expect(day03.moveByRouteFromFile('./src/__test__/Day03.spec.txt').getVisitedHousesCount()).toBe(2);
  });
  test('Santa & Robo-Santa: "^v" delivers presents to 3 houses', () => {
    const day03 = new Day03(2);
    expect(day03.moveByRoute('^v').getVisitedHousesCount()).toBe(3);
  });
  test('Santa & Robo-Santa: "^>v<" delivers presents to 3 houses', () => {
    const day03 = new Day03(2);
    expect(day03.moveByRoute('^>v<').getVisitedHousesCount()).toBe(3);
  });
  test('Santa & Robo-Santa: "^v^v^v^v^v" delivers presents to 11 houses', () => {
    const day03 = new Day03(2);
    expect(day03.moveByRoute('^v^v^v^v^v').getVisitedHousesCount()).toBe(11);
  });
});
