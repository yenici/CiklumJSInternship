/* global describe, test, expect, toBe, toThrowError: true */

const HamiltonianPath = require('../Day09').HamiltonianPath;

// const compareObj = function compareActions(obj1, obj2) {
//   return Object.keys(obj1).reduce((state, key) => {
//     return state ? (obj1[key] === obj2[key]) : false;
//   }, true);
// };

describe('Day 09. Test HamiltonianPath.getCombinations method.', () => {
  test('Get permutations of 0 elements', () => {
    expect(() => HamiltonianPath.getCombinations(0))
      .toThrowError(/HamiltonianPath.getCombinations. Wrong parameters./);
  });
  test('Get permutations of 1 elements', () => {
    expect(HamiltonianPath.getCombinations(1).length).toBe(1);
  });
  test('Get permutations of 5 elements', () => {
    expect(HamiltonianPath.getCombinations(5).length).toBe(120);
  });
});

describe('Day 09. Find the shortest and the longest route.', () => {
  test('The shortest path', () => {
    const hp = new HamiltonianPath();
    hp.addPathesFromFile('./src/__test__/Day09.spec.txt');
    expect(hp.findRoute().shortestDistance).toBe(605);
  });
  test('The longest path', () => {
    const hp = new HamiltonianPath();
    hp.addPathesFromFile('./src/__test__/Day09.spec.txt');
    expect(hp.findRoute().longestDistance).toBe(982);
  });
  test('The shortest path with optimization', () => {
    const hp = new HamiltonianPath();
    hp.addPathesFromFile('./src/__test__/Day09.spec.txt');
    const solution = hp.findRoute();
    expect(hp.findShortestRoute().shortestDistance).toBe(solution.shortestDistance);
  });
});
