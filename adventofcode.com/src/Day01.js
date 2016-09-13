/**
 * Created by Dmytro on 9/11/2016.
 */
/* global mmodule, require, modules: true */

exports.solution = function solution(commands) {
  return commands.split('').reduce((previousValue, currentValue, currentIndex) => {
    const value = {
      level: previousValue.level,
      baseOnStep: previousValue.baseOnStep,
    };
    if (currentValue === '(') value.level += 1;
    if (currentValue === ')') value.level -= 1;
    if (!value.baseOnStep && value.level === -1) {
      value.baseOnStep = currentIndex + 1; // The numeration of the steps starts from 0
    }
    return value;
  }, { level: 0, baseOnStep: undefined });
};
