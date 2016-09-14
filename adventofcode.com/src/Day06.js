/**
 * --- Day 6: Probably a Fire Hazard ---
 *
 * Because your neighbors keep defeating you in the holiday house decorating contest year after
 * year, you've decided to deploy one million lights in a 1000x1000 grid.
 *
 * Furthermore, because you've been especially nice this year, Santa has mailed you instructions on
 * how to display the ideal lighting configuration.
 *
 * Lights in your grid are numbered from 0 to 999 in each direction; the lights at each corner are
 * at 0,0, 0,999, 999,999, and 999,0. The instructions include whether to turn on, turn off, or
 * toggle various inclusive ranges given as coordinate pairs. Each coordinate pair represents
 * opposite corners of a rectangle, inclusive; a coordinate pair like 0,0 through 2,2 therefore
 * refers to 9 lights in a 3x3 square. The lights all start turned off.
 *
 * To defeat your neighbors this year, all you have to do is set up your lights by doing the
 * instructions Santa sent you in order.
 *
 * For example:
 *
 * turn on 0,0 through 999,999 would turn on (or leave on) every light.
 *
 * toggle 0,0 through 999,0 would toggle the first line of 1000 lights, turning off the ones that
 * were on, and turning on the ones that were off.
 *
 * turn off 499,499 through 500,500 would turn off (or leave off) the middle four lights.
 *
 * After following the instructions, how many lights are lit?
 *
 *
 * --- Part Two ---
 *
 * You just finish implementing your winning light pattern when you realize you
 * mistranslated Santa's message from Ancient Nordic Elvish.
 *
 * The light grid you bought actually has individual brightness controls; each
 * light can have a brightness of zero or more. The lights all start at zero.
 *
 * The phrase turn on actually means that you should increase the brightness of
 * those lights by 1.
 *
 * The phrase turn off actually means that you should decrease the brightness
 * of those lights by 1, to a minimum of zero.
 *
 * The phrase toggle actually means that you should increase the brightness of
 * those lights by 2.
 *
 * What is the total brightness of all lights combined after following Santa's
 * instructions?
 *
 * For example:
 *
 * turn on 0,0 through 0,0 would increase the total brightness by 1.
 * toggle 0,0 through 999,999 would increase the total brightness by 2000000.
 *
 */

/* global require, module: true */

const fs = require('fs');

class NewYearLights {
  constructor(dimensionX = 1000, dimensionY = 1000) {
    this.state = Array(dimensionX).fill(false).map(() => Array(dimensionY).fill(0));
  }
  changeState(instruction) {
    const action = NewYearLights.actionParser(instruction);
    for (let x = action.startX; x <= action.endX; x += 1) {
      for (let y = action.startY; y <= action.endY; y += 1) {
        this.state[x][y] = this.constructor[action.command](this.state[x][y]);
      }
    }
  }
  processActionsChain(filename) {
    const actions = fs.readFileSync(filename, 'utf8').split('\n');
    actions.forEach(action => this.changeState(action));
  }
  countLights() {
    return this.state.reduce(
      (cnt1, line) => cnt1 + line.reduce(
        (cnt2, light) => cnt2 + light, 0),
      0);
  }
  toRawString() {
    return this.state.reduce((str1, current1) =>
      `${str1}${current1.reduce((str2, current2) =>
        `${str2}${current2}`, '')}`, '');
  }
  static actionParser(instruction) {
    const regex = /^(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)$/;
    const parsedInstruction = instruction.match(regex);
    let action;
    if (parsedInstruction !== null && parsedInstruction.length === 6) {
      action = {
        command: parsedInstruction[1].replace(/ o/, 'O'),
      };
      [action.startX, action.startY, action.endX, action.endY] =
        parsedInstruction.slice(2, 6).map(Number);
    } else {
      throw Object.create({ message: `Incorrect instruction: ${instruction}` });
    }
    return action;
  }
  static turnOn() {
    return 1;
  }
  static turnOff() {
    return 0;
  }
  static toggle(light) {
    return light === 0 ? 1 : 0;
  }
}

class NewYearLightsWithBrightness extends NewYearLights {
  /* eslint no-useless-constructor: "warn" */
  constructor(dimensionX, dimensionY) {
    super(dimensionX, dimensionY);
  }
  static turnOn(level) {
    return level + 1;
  }
  static turnOff(level) {
    return level === 0 ? 0 : level - 1;
  }
  static toggle(level) {
    return level + 2;
  }
}

module.exports = {
  NewYearLights,
  NewYearLightsWithBrightness,
};
