function debounce(func, wait) {
  let timeoutID = null;
  return function (...args) {
    clearTimeout(timeoutID);

    timeoutID = setTimeout(() => {
      timeoutID = null; // 避免内存泄露
      func.apply(this, args)
    }, wait)
  }
}

let i = 0;
const increment = debounce(() => {
  i++
}, 1000);

increment();
increment();
increment();
increment();
increment();
increment();
setTimeout(() => {
  increment();
}, 500)

// need to explain why 1510s
setTimeout(() => {
  console.log(i, 'i'); // 1
}, 1510)

// 参考资料：
// https://medium.com/@griffinmichl/implementing-debounce-in-javascript-eab51a12311e
// https://css-tricks.com/debouncing-throttling-explained-examples/