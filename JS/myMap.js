Array.prototype.myMap = function (callbackFn, thisArg) {
  const length = this.length;
  const array = new Array(length);

  for (let i = 0; i < length; i++) {
    if (Object.hasOwn(this, i)) {
      array[i] = callbackFn.call(thisArg, this[i], i, this);
    }
  }

  return array;
}


const usesThis = function (element) {
  console.log(this)
  return element * this;
};

// const arr = [1,2,3,4].myMap(usesThis, 10);
// console.log(arr)

console.log(usesThis.call(10, 2))
