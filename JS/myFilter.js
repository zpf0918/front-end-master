Array.prototype.myFilter = function (callbackFn, thisArg) {
  const results = [];

  for (let i = 0; i < this.length; i++) {
    const bool = Object.hasOwn(this, i) && callbackFn.call(thisArg, this[i], i, this);
    if (bool) {
      results.push(this[i])
    }
  }

  return results;
};