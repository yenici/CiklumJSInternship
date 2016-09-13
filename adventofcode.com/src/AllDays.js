/**
 * Created by Dmytro on 9/13/2016.
 */

/* global require: true */

const day01 = require('./Day01');
const commands = require('./Day01.json');

console.log('==========   D A Y    1   ========================================');
const result = day01.solution(commands.puzzle);
console.log(`Current level: ${result.level}`);
if (result.baseOnStep) {
  console.log(`The basement level was first entered on step ${result.baseOnStep}`);
} else {
  console.log('The basement level was not visited.');
}
