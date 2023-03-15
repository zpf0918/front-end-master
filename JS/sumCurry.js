function sum(...args) {
  let res = args;

  function inner(...innerArgs) {
    res = res.concat(innerArgs);
    return inner;
  }

  inner.sumOf = function () {
    return res.reduce((prev, next) => {
      return prev + next;
    }, 0)
  }

  return inner;
}

const res = sum(1, 2, 3)(4)(5).sumOf();
console.log(res);