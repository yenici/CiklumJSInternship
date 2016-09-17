/* global describe, test, expect, toBe, toThrowError: true */

// TODO: The test are commented because of that feature:
// http://stackoverflow.com/questions/36619383/
//   referenceerror-regeneratorruntime-is-not-defined-but-working-inside-a-scope

// const HamiltonianPath = require('../Day09').HamiltonianPath;

// const compareObj = function compareActions(obj1, obj2) {
//   return Object.keys(obj1).reduce((state, key) => {
//     return state ? (obj1[key] === obj2[key]) : false;
//   }, true);
// };

// describe('Day 09. Test HamiltonianPath.generatePermutations iterator.', () => {
//   test('Get permutations of 0 elements', () => {
//     expect(() => HamiltonianPath.generatePermutations(0))
//       .toThrowError(/HamiltonianPath.generatePermutations. Wrong parameters./);
//   });
//   test('Get iterator for permutations of 1 elements', () => {
//     const iterator = HamiltonianPath.generatePermutations(1);
//     let counter = 0;
//     while (iterator.next()) {
//       counter += 1;
//     }
//     expect(counter).toBe(1);
//   });
//   test('Get iterator for permutations of 5 elements', () => {
//     const iterator = HamiltonianPath.generatePermutations(5);
//     let counter = 0;
//     while (iterator.next()) {
//       counter += 1;
//     }
//     expect(counter).toBe(120);
//   });
// });
//
// describe('Day 09. Find the shortest and the longest route.', () => {
//   test('The shortest path', () => {
//     const hp = new HamiltonianPath();
//     hp.addPathesFromFile('./src/__test__/Day09.spec.txt');
//     expect(hp.findRoute().shortestDistance).toBe(605);
//   });
//   test('The longest path', () => {
//     const hp = new HamiltonianPath();
//     hp.addPathesFromFile('./src/__test__/Day09.spec.txt');
//     expect(hp.findRoute().longestDistance).toBe(982);
//   });
//   test('The shortest path with optimization', () => {
//     const hp = new HamiltonianPath();
//     hp.addPathesFromFile('./src/__test__/Day09.spec.txt');
//     const solution = hp.findRoute();
//     expect(hp.findShortestRoute().shortestDistance).toBe(solution.shortestDistance);
//   });
// });
