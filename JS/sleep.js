function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}


function example() {
  console.log('start');
  sleep(3000);
  console.log('end');
}

example();
