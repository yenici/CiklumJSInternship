/* global require: true */

const getLevelAndStep = require('./Day01').getLevelAndStep;
const commands = require('./Day01.json');

const calculateTotalArea = require('./Day02').calculateTotalArea;
const calculateTotalLength = require('./Day02').calculateTotalLength;

console.log('==========   D A Y    1   ========================================');
const result = getLevelAndStep(commands.puzzle);
console.log(`Current level: ${result.level}`);
if (result.baseOnStep) {
  console.log(`The basement level was first entered on step ${result.baseOnStep}`);
} else {
  console.log('The basement level was not visited.');
}

console.log('==========   D A Y    2   ========================================');
console.log(`Total area of wrapping paper: ${calculateTotalArea('./Day02.txt')}`);
console.log(`Total length of ribbon: ${calculateTotalLength('./Day02.txt')}`);

console.log('==========   D A Y    6   ========================================');

console.log('==========   D A Y    9   ========================================');
