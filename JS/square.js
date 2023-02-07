Array.prototype.square = function () {
  const arr = new Array(this.length);
  for (let i = 0; i < this.length; i++) {
    arr[i] = this[i] * this[i];
  }
  return arr;
};