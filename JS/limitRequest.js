// 使用promise实现异步并发数控制。例如共有10个请求，最大并发数是3，每次最多都只能发起3个请求，如果这三个请求中有一个先完成，然后把剩下的请求加入到请求队列里，以保证最大的利用率
function limitRequests(requests, maxConcurrency) {
  let results = new Array(requests.length);
  let requestPool = requests.map((request, index) => ({ request, index }));
  let inFlightList = new Set();

  return new Promise(async (resolve, reject) => {
    while (requestPool.length > 0 || inFlightList.size > 0) {
      while (inFlightList.size <= maxConcurrency && requestPool.length > 0) {
        const { request, index } = requestPool.shift();
        const promise = request();
        inFlightList.add(promise);
        promise.then(value => {
          results[index] = value;
          inFlightList.delete(promise);
        }).catch(reason => {
          inFlightList.delete(promise);
          reject(reason)
        })
      }

      // 这里必须写catch， 而且需要写一个空函数 不然执行起来会报错 这里reject和上面reject是一个效果
      // 在使用limitRequests时也需要一个catch方法
      await Promise.race(inFlightList).catch(error => {})
    }
    resolve(results);
  })
}

// 第二种写法 更加好理解
async function limitRequests2(requests, maxConcurrency) {
  let results = new Array(requests.length);
  let requestPool = requests.map((request, index) => ({ request, index }));
  let inFlightList = new Set();

  while (requestPool.length > 0 || inFlightList.size > 0) {
    while (inFlightList.size <= maxConcurrency && requestPool.length > 0) {
      const { request, index } = requestPool.shift();
      const promise = request();
      inFlightList.add(promise);
      promise.then(value => {
        results[index] = value;
        inFlightList.delete(promise);
      }).catch(reason => {
        inFlightList.delete(promise);
      })
    }

    // 在使用limitRequests时也需要一个catch方法
    try {
      await Promise.race(inFlightList);
    } catch(err) {
      throw err;
    }
  }

  return results;
}

const requestList = [
  () => new Promise((resolve) => setTimeout(() => resolve("Request 1"), 100)),
  () => new Promise((resolve) => setTimeout(() => resolve("Request 2"), 200)),
  () => new Promise((resolve) => setTimeout(() => resolve("Request 3"), 50)),
  () => new Promise((resolve) => setTimeout(() => resolve("Request 4"), 300)),
  () => new Promise((resolve) => setTimeout(() => resolve("Request 5"), 150)),
  () => new Promise((resolve) => setTimeout(() => resolve("Request 6"), 400)),
  () => new Promise((resolve) => setTimeout(() => resolve("Request 7"), 250)),
  () => new Promise((resolve) => setTimeout(() => resolve("Request 8"), 100)),
  () => new Promise((resolve) => setTimeout(() => resolve("Request 9"), 200)),
  () => new Promise((resolve) => setTimeout(() => resolve("Request 10"), 500)),
]

limitRequests(requestList, 3).then(val => {
  console.log(val, 'okok')
}).catch(err => {});