let person = {
  name: 'Tom',
  age: 12,
  family: {
    p1: 1,
    p2: 2
  }
};


let handler = {
  get (obj, key) {
    console.log('trigger get');
    return key in obj ? obj[key] : 66;
  },
  set (obj, key, val) {
    console.log('trigger set')
    obj[key] = val
    return true
  }
}

let proxyObj = new Proxy(person, handler);

// https://juejin.cn/post/7069397770766909476#heading-5