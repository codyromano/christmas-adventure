/*
console.log('validator did load');

function is2DArray(anyData) {
  if (!Array.isArray(anyData)) {
    return false;
  }
  if (!anyData.every(Array.isArray)) {
    return false;
  }
  return true;
}

module.exports = {
  onConstruct(width, height, coords) {
    if (![width, height].every(Number.isInteger)) {
      throw new TypeError('width and height must be integers');
    }
    if (!is2DArray(coords)) {
      throw new TypeError('coords must be a 2D array of integers')
    }
  }
};
*/
module.exports = {
  testFn: function() {}
};
