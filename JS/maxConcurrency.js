// 使用promise实现异步并发数控制。例如共有10个请求，最大并发数是3，每次最多都只能发起3个请求，如果这三个请求中有一个先完成，然后把剩下的请求加入到请求队列里，以保证最大的利用率
async function limitRequests(requests, maxConcurrency) {
  const results = new Array(requests.length);
  const requestPool = requests.map((request, index) => ({ request, index }));
  const inFlightRequests = new Set();

  while (requestPool.length > 0 || inFlightRequests.size > 0) {
    while (inFlightRequests.size < maxConcurrency && requestPool.length > 0) {
      console.log(inFlightRequests.size);
      const { request, index } = requestPool.shift();
      const promise = request();
      inFlightRequests.add(promise);
      promise.then(result => {
        results[index] = result;
        console.log(result, 'result')
        inFlightRequests.delete(promise);
      }).catch(error => {
        console.error(error);
        inFlightRequests.delete(promise);
      });
    }

    await Promise.race(inFlightRequests);
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
});