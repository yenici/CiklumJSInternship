/* global require: true */

const getLevelAndStep = require('./Day01').getLevelAndStep;
const commands = require('./Day01.json');

const calculateTotalArea = require('./Day02').calculateTotalArea;
const calculateTotalLength = require('./Day02').calculateTotalLength;

const Day03 = require('./Day03').Day03;

const NewYearLights = require('./Day06').NewYearLights;
const NewYearLightsWithBrightness = require('./Day06').NewYearLightsWithBrightness;

const HamiltonianPath = require('./Day09').HamiltonianPath;

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

console.log('==========   D A Y    3   ========================================');
const santa = new Day03();
santa.moveByRouteFromFile('./Day03.txt');
console.log(`How many houses receive at least one present? ${santa.getVisitedHousesCount()}`);
const roboSanta = new Day03(2);
roboSanta.moveByRouteFromFile('./Day03.txt');
console.log(`Santa + Rob-Santa: How many houses receive at least one present? ${roboSanta.getVisitedHousesCount()}`);

console.log('==========   D A Y    6   ========================================');
const newYearLights = new NewYearLights();
console.log('Processing of actions started...');
newYearLights.processActionsChain('./Day06.txt');
console.log(`${newYearLights.countLights()} lights are lit.`);
const newYearLightsWithBrightness = new NewYearLightsWithBrightness();
console.log('Processing of actions started...');
newYearLightsWithBrightness.processActionsChain('./Day06.txt');
console.log('The total brightness of all lights combined after following Santa\'s instructions is');
console.log(newYearLightsWithBrightness.countLights());

console.log('==========   D A Y    9   ========================================');
const hamiltonianPath = new HamiltonianPath();
hamiltonianPath.addPathesFromFile('./Day09.txt');
const shortestPath = hamiltonianPath.findShortestRoute();
console.log('\tThe shortest path (findShortestRoute method):');
console.log(`Path: ${shortestPath.shortestRoute}`);
console.log(`Distance: ${shortestPath.shortestDistance}`);
const paths = hamiltonianPath.findRoute();
console.log('\tThe shortest path (findRoute method):');
console.log(`Path: ${paths.shortestRoute}`);
console.log(`Distance: ${paths.shortestDistance}`);
console.log('\tThe longest path (findRoute method):');
console.log(`Path: ${paths.longestRoute}`);
console.log(`Distance: ${paths.longestDistance}`);
