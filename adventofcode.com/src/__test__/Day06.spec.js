/* global describe, test, expect, toBe, toThrowError: true */

const NewYearLights = require('./../Day06').NewYearLights;
const NewYearLightsWithBrightness =
  require('./../Day06').NewYearLightsWithBrightness;

const compareActions = function compareActions(act1, act2) {
  return Object.keys(act1).reduce((state, key) => {
    return state ? (act1[key] === act2[key]) : false;
  }, true);
};

describe('Day 06. NewYearLights class tests.', () => {
  test('Class creation, 1 x 1', () => {
    const nyl = new NewYearLights(1, 1);
    expect(nyl.toRawString()).toBe('0');
  });
  test('Class creation, 3 x 2', () => {
    const nyl = new NewYearLights(3, 2);
    expect(nyl.toRawString()).toBe('000000');
  });
  test('Class, turnOn(0)', () => {
    expect(NewYearLights.turnOn(0)).toBe(1);
  });
  test('Class, turnOn(1)', () => {
    expect(NewYearLights.turnOn(1)).toBe(1);
  });
  test('Class, turnOff(0)', () => {
    expect(NewYearLights.turnOff(0)).toBe(0);
  });
  test('Class, turnOff(1)', () => {
    expect(NewYearLights.turnOff(1)).toBe(0);
  });
  test('Class, toggle(0)', () => {
    expect(NewYearLights.toggle(0)).toBe(1);
  });
  test('Class, toggle(1)', () => {
    expect(NewYearLights.toggle(1)).toBe(0);
  });
  test('actionParser, \'toggle 461,550 through 564,900\'', () => {
    expect(compareActions(
      NewYearLights.actionParser('toggle 461,550 through 564,900'),
      {
        command: 'toggle',
        startX: 461,
        startY: 550,
        endX: 564,
        endY: 900,
      }
    )).toBe(true);
  });
  test('actionParser, \'turn off 812,389 through 865,874\'', () => {
    expect(compareActions(
      NewYearLights.actionParser('turn off 812,389 through 865,874'),
      {
        command: 'turnOff',
        startX: 812,
        startY: 389,
        endX: 865,
        endY: 874,
      }
    )).toBe(true);
  });
  test('actionParser, \'turn on 599,989 through 806,993\'', () => {
    expect(compareActions(
      NewYearLights.actionParser('turn on 599,989 through 806,993'),
      {
        command: 'turnOn',
        startX: 599,
        startY: 989,
        endX: 806,
        endY: 993,
      }
    )).toBe(true);
  });
  test('actionParser, \'turn in 599,989 through 806,993\'', () => {
    expect(() => {
      NewYearLights.actionParser('turn in 599,989 through 806,993');
      toThrowError(/Incorrect instruction:/);
    });
  });
  test('Object 3x3, turn on 1,2 through 1,2', () => {
    const nyl = new NewYearLights(3, 3);
    nyl.changeState('turn on 1,2 through 1,2');
    expect(nyl.toRawString()).toBe('000001000');
  });
  test('Object 3x3, turn on 0,0 through 2,2', () => {
    const nyl = new NewYearLights(3, 3);
    nyl.changeState('turn on 0,0 through 2,2');
    expect(nyl.toRawString()).toBe('111111111');
  });
  test('Object 3x3, turn on 0,0 through 2,2 THAN turn off 1,1 through 2,2', () => {
    const nyl = new NewYearLights(3, 3);
    nyl.changeState('turn on 0,0 through 2,2');
    nyl.changeState('turn off 1,1 through 2,2');
    expect(nyl.toRawString()).toBe('111100100');
  });
  test('Object 3x3, turn on 0,0 through 1,1 THAN toggle 1,1 through 2,2', () => {
    const nyl = new NewYearLights(3, 3);
    nyl.changeState('turn on 0,0 through 1,1');
    nyl.changeState('toggle 1,1 through 2,2');
    expect(nyl.toRawString()).toBe('110101011');
  });
  test('Object 3x3, turn in 1,1 through 2,2 Incorrect instruction', () => {
    const nyl = new NewYearLights(3, 3);
    expect(() => {
      nyl.changeState('turn in 1,1 through 2,2');
      toThrowError(/Incorrect instruction:/);
    });
  });
  test('Object 3x3, countLights when all lights are turned off', () => {
    const nyl = new NewYearLights(3, 3);
    expect(nyl.countLights()).toBe(0);
  });
  test('Object 3x3, countLights when turn on 0,0 through 1,1 THAN toggle 1,1 through 2,2',
    () => {
      const nyl = new NewYearLights(3, 3);
      nyl.changeState('turn on 0,0 through 1,1');
      nyl.changeState('toggle 1,1 through 2,2');
      expect(nyl.countLights()).toBe(6);
    });
  test('processActionsChain', () => {
    const nyl = new NewYearLights();
    nyl.processActionsChain('./src/__test__/Day06.spec.txt');
    expect(nyl.countLights()).toBe(1000000 - 1000 - 4);
  });
});

describe('Day 06. NewYearLightsWithBrightness class tests.', () => {
  test('NewYearLightsWithBrightness turnOn test', () => {
    expect(NewYearLightsWithBrightness.turnOn(0)).toBe(1);
  });
  test('NewYearLightsWithBrightness turnOff test 0 to 0', () => {
    expect(NewYearLightsWithBrightness.turnOff(0)).toBe(0);
  });
  test('NewYearLightsWithBrightness turnOff test 1 to 0', () => {
    expect(NewYearLightsWithBrightness.turnOff(1)).toBe(0);
  });
  test('NewYearLightsWithBrightness toggle test 0 to 2', () => {
    expect(NewYearLightsWithBrightness.toggle(0)).toBe(2);
  });
  test('Create NewYearLightsWithBrightness class test', () => {
    const nylwb = new NewYearLightsWithBrightness(3, 3);
    expect(nylwb.countLights()).toBe(0);
  });
  test('NewYearLightsWithBrightness turnOn test', () => {
    const nylwb = new NewYearLightsWithBrightness(3, 3);
    nylwb.changeState('turn on 1,1 through 2,2');
    nylwb.changeState('turn on 1,1 through 2,2');
    expect(nylwb.countLights()).toBe(8);
  });
  test('NewYearLightsWithBrightness turnOn/turnOff test', () => {
    const nylwb = new NewYearLightsWithBrightness(3, 3);
    nylwb.changeState('turn on 1,1 through 2,2');
    nylwb.changeState('turn off 1,1 through 2,2');
    expect(nylwb.countLights()).toBe(0);
  });
});
