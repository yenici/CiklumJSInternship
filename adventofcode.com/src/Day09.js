/**
 *
 * --- Day 9: All in a Single Night ---
 *
 * Every year, Santa manages to deliver all of his presents in a single night.
 *
 * This year, however, he has some new locations to visit; his elves have provided
 * him the distances between every pair of locations. He can start and end at any
 * two (different) locations he wants, but he must visit each location exactly once.
 * What is the shortest distance he can travel to achieve this?
 *
 * For example, given the following distances:
 *
 * London to Dublin = 464
 * London to Belfast = 518
 * Dublin to Belfast = 141
 *
 * The possible routes are therefore:
 *
 * Dublin -> London -> Belfast = 982
 * London -> Dublin -> Belfast = 605
 * London -> Belfast -> Dublin = 659
 * Dublin -> Belfast -> London = 659
 * Belfast -> Dublin -> London = 605
 * Belfast -> London -> Dublin = 982
 *
 * The shortest of these is London -> Dublin -> Belfast = 605,
 * and so the answer is 605 in this example.
 *
 * What is the distance of the shortest route?
 *
 * --- Part Two ---
 *
 * The next year, just to show off, Santa decides to take the route with the
 * longest distance instead.
 *
 * He can still start and end at any two (different) locations he wants, and
 * he still must visit each location exactly once.
 *
 * For example, given the distances above, the longest route would be 982 via
 * (for example) Dublin -> London -> Belfast.
 *
 * What is the distance of the longest route?
 */

/* global require, module: true */

const fs = require('fs');

class HamiltonianPath {
  constructor() {
    // Route Storage:
    //
    // sistTable = Map(
    //   [ city1, {
    //     city2: distCity1ToCity2,
    //     city3: distCity1ToCity3,
    //     ...
    //   } ],
    //   [ city2, {
    //     city1: distCity2ToCity1,
    //     city3: distCity2ToCity3,
    //     ...
    //   } ],
    //   [ city3, {
    //     city1: distCity3ToCity1,
    //     city2: distCity3ToCity2,
    //     ...
    //   } ],
    //   ...
    // )
    // where city[x] - city's name
    this.distTable = new Map();
  }

  /**
   * Adds a path the table of distances
   * Use this method carefully to prevent data integrity corruption
   *
   * @param from
   * @param to
   * @param distance
   */
  setPath(from, to, distance) {
    let dest;
    if (this.distTable.has(from)) {
      dest = this.distTable.get(from);
      dest[to] = distance;
    } else {
      dest = Object.defineProperty({}, to, {
        value: distance,
        configurable: true,
        writable: true,
        enumerable: true,
      });
    }
    this.distTable.set(from, dest);
  }

  /**
   * Adds a path and a reverse path to the table of distances
   *
   * @param from
   * @param to
   * @param distance
   */
  addPath(from, to, distance) {
    this.setPath(from, to, distance);
    this.setPath(to, from, distance);
  }

  /**
   * Adds pathes to the table of distances from the file
   *
   * Record's format:
   *  <FromCityName> to <ToCityName> = <distance>
   *
   * @param filename
   */
  addPathesFromFile(filename) {
    const pathes = fs.readFileSync(filename, 'utf8').split('\n');
    let from;
    let to;
    let distance;
    pathes.forEach(path => {
      [from, , to, , distance] = path.split(' ');
      distance = Number(distance);
      this.addPath(from, to, distance);
    });
  }

  /**
   * Find the shortest and the longest pathes
   *
   * @returns {*}
   */
  findRoute() {
    const cities = [];
    for (const key of this.distTable.keys()) {
      cities.push(key);
    }
    const optimalRoutes = {
      shortestRoute: undefined,
      shortestDistance: undefined,
      longestRoute: undefined,
      longestDistance: undefined,
    };
    for (const path of this.constructor.generatePermutations(cities.length)) {
      const itinerary = path.reduce((route, index) => (
        {
          path: route.path.concat(cities[index]),
          from: cities[index],
          distance: route.distance +
            (route.from ? this.distTable.get(route.from)[cities[index]] : 0),
        }
      ), { path: [], from: undefined, distance: 0 });
      if (optimalRoutes.shortestDistance === undefined
        || itinerary.distance < optimalRoutes.shortestDistance) {
        optimalRoutes.shortestDistance = itinerary.distance;
        optimalRoutes.shortestRoute = itinerary.path;
      }
      if (optimalRoutes.longestDistance === undefined
        || itinerary.distance > optimalRoutes.longestDistance) {
        optimalRoutes.longestDistance = itinerary.distance;
        optimalRoutes.longestRoute = itinerary.path;
      }
    }
    return optimalRoutes;
  }

  /**
   * Find the shortest route.
   * This method is similar to findRoute method but has some
   * optimizations.
   * @returns {*}
   */
  findShortestRoute() {
    const cities = [];
    for (const key of this.distTable.keys()) {
      cities.push(key);
    }
    let shortestRoute = {
      shortestRoute: undefined,
      shortestDistance: Number.POSITIVE_INFINITY,
    };
    for (const path of this.constructor.generatePermutations(cities.length)) {
      const route = {
        path: [],
        distance: 0,
        from: undefined,
      };
      for (let i = 0; i < path.length; i += 1) {
        if (route.from) {
          route.distance += this.distTable.get(route.from)[cities[path[i]]];
        }
        if (route.distance > shortestRoute.shortestDistance) {
          // The current distance of the path is greater than
          // the distance of the shortest path for this moment.
          // There's no reason to continue computations.
          route.distance = Number.POSITIVE_INFINITY;
          break;
        }
        route.from = cities[path[i]];
        route.path.push(route.from);
      }
      if (route.distance < shortestRoute.shortestDistance) {
        shortestRoute = {
          shortestRoute: route.path,
          shortestDistance: route.distance,
        };
      }
    }
    return shortestRoute;
  }
  /**
   * Implementation of Narayana's algorithm
   *
   * The Narayana's algorithm generates the next permutation lexicographically
   * after a given permutation. It changes the given permutation in-place.
   *   1. Find the largest index k such that a[k] < a[k + 1]. If no such index
   *      exists, the permutation is the last permutation.
   *   2. Find the largest index l greater than k such that a[k] < a[l].
   *   3. Swap the value of a[k] with that of a[l].
   *   4. Reverse the sequence from a[k + 1] up to and including the final
   *      element a[n].
   * Links:
   *   https://en.wikipedia.org/wiki/Permutation
   *   http://www.sciencedirect.com/science/article/pii/0097316571900070
   *
   * @param n - number of elements in a permutation
   */
  static* generatePermutations(n) {
    if (n > 1) {
      let items = Array.from(new Array(n).keys());
      yield items;
      let k;
      let l;
      let done = false;
      const swap = function swap(i, j) {
        const temp = items[i];
        items[i] = items[j];
        items[j] = temp;
      };
      while (!done) {
        // Search for j: items[j] < items[j+1] > ... items[n-1]
        for (k = n - 2; k >= 0 && items[k] > items[k + 1]; k -= 1);
        if (k === -1) {
          done = true;
        } else {
          // Search for min l: items[k] < items[l]
          for (l = n - 1; l > k + 1 && items[k] > items[l]; l -= 1);
          swap(k, l);
          // Reverse items from k+1 to n-1
          items = items.slice(0, k + 1).concat(items.slice(k + 1).reverse());
          yield items;
        }
      }
    } else if (n === 1) {
      yield [1];
    } else {
      throw Object.create({ message: 'HamiltonianPath.generatePermutations. Wrong parameters.' });
    }
  }
}

module.exports = {
  HamiltonianPath,
};
