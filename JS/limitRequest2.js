async function limitRequests(requests, maxConcurrency) {
  const results = new Array(requests.length);
  const requestPool = requests.map((request, index) => ({ request, index }));
  const inFlightList = [];

  while (requestPool.length > 0 || inFlightList.length > 0) {
    while (inFlightList.length <= maxConcurrency && requestPool.length > 0) {
      const { request, index } = requestPool.shift();
      const promise = request();
      inFlightList.push({ promise, index});
    }

    try {
      const resolvedPromises = await Promise.all(inFlightList.map(item => item.promise));
      resolvedPromises.forEach((value, i) => {
        const { index } = inFlightList[i];
        results[index] = value;
      })
      inFlightList.length = 0;
    } catch(err) {
      throw err;
    }
  }

  return results;
}

const requestList = [
  () => new Promise((resolve) => setTimeout(() => resolve("Request 1"), 100)),
  () => new Promise((resolve) => setTimeout(() => resolve("Request 2"), 200)),
  () => new Promise((_, reject) => setTimeout(() => reject('fail'), 200)),
  () => new Promise((resolve) => setTimeout(() => resolve("Request 3"), 50)),
  () => new Promise((resolve) => setTimeout(() => resolve("Request 4"), 300)),
  () => new Promise((resolve) => setTimeout(() => resolve("Request 5"), 150)),
  () => new Promise((resolve) => setTimeout(() => resolve("Request 6"), 400)),
  () => new Promise((resolve) => setTimeout(() => resolve("Request 7"), 250)),
  () => new Promise((resolve) => setTimeout(() => resolve("Request 8"), 100)),
  () => new Promise((resolve) => setTimeout(() => resolve("Request 9"), 200)),
  () => new Promise((resolve) => setTimeout(() => resolve("Request 10"), 500)),
]

limitRequests(requestList, 3)
  .then(val => console.log(val))
  .catch(err => console.log(err))