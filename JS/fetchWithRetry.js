function fetchRetry(request, times) {
  return new Promise(async (resolve, reject) => {
    let retryTimes = times;
    while (retryTimes > 0) {
      try {
        const val = await request();
        resolve(val);
        break;
      } catch(err) {
        retryTimes--;
        if (retryTimes === 0) {
          reject(err);
        }
      }
    }
  })
}

const mock = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('error1')
      // resolve('success');
    }, 1000)
  })
}


fetchRetry(mock, 3)
  .then(value => console.log(value))
  .catch(reason => console.log(reason))