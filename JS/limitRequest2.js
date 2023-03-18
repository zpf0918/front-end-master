// 限制并发数，比如一共10个请求，最大并发数是3，每次最多发起3个请求，当三个请求完成后，再发起下一次的请求

async function limitRequests(requests, maxConcurrency) {
  const results = new Array(requests.length);
  const requestPool = requests.map((request, index) => ({ request, index }));

  while (requestPool.length > 0) {
    const inFlightRequests = [];
    while (inFlightRequests.length < maxConcurrency && requestPool.length > 0) {
      const { request, index } = requestPool.shift();
      const promise = request();
      inFlightRequests.push({ promise, index });
    }
    const resolvedPromises = await Promise.all(inFlightRequests.map(({ promise }) => promise));
    resolvedPromises.forEach((result, i) => {
      const { index } = inFlightRequests[i];
      results[index] = result;
    });
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

// function request() {
//   const waitTime = Math.floor(Math.random() * 5000) + 1000;
//   // console.log(`Starting request with wait time ${waitTime}ms`);
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       // console.log(`Finished request with wait time ${waitTime}ms`);
//       resolve();
//     }, waitTime);
//   });
// }

limitRequests(requestList, 3).then(val => {
  console.log(val, 'okok')
});
