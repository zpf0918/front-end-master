function shouldDeepCompare(type) {
  return type === '[object Object]' || type === '[object Array]';
}

function getType(value) {
  return Object.prototype.toString.call(value);
}

function deepEqual(value1, value2) {
  const type1 = getType(value1);
  const type2 = getType(value2);
  
  if (type1 === type2 && shouldDeepCompare(type1) && shouldDeepCompare(type2)) {
    const kvPairs1 = Object.entries(value1);
    const kvPairs2 = Object.entries(value2);

    if (kvPairs1.length !== kvPairs2.length) {
      return false;
    }

    return kvPairs1.every(
      ([k, v]) => Object.hasOwn(value2, k) && deepEqual(v, value2[k])
    )
  }
  
  return Object.is(value1, value2);
}

const obj1= {
  a: 2,
  a: 1,
  b: 2
}

const obj2 = {
  b: 2,
  a: 2,
  a: 1,
}

const res = deepEqual(obj1, obj2)
console.log(res)

