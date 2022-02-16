import "core-js/stable";
import "regenerator-runtime/runtime";

import add from './add';
import mul from './mul';

const addArr = (...arr) =>
  arr.reduce((acc, cur) => add(acc, cur));

const mulArr = (...arr) =>
  arr.reduce((acc, cur) => mul(acc, cur));

export { addArr as add, mulArr as mul };
