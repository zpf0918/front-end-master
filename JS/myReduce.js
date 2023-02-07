Array.prototype.myReduce = function (callbackFn, initialValue) {
  const len = this.length;
  const noInitializeValue = initialValue === undefined;
  if (noInitializeValue && len === 0) throw new Error('error');
  let acc, startingIndex;
  if (noInitializeValue) {
    acc = this[0], startingIndex = 1;
  } else {
    acc = initialValue, startingIndex = 0;
  }

  for (let i = startingIndex; i < len; i++) {
    if (Object.hasOwn(this, i)) {
      acc = callbackFn(acc, this[i], i, this);
    }
  }
  return acc;
};