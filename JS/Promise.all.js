/**
 * @param {Array} iterable
 * @return {Promise<Array>}
 */
export default function promiseAll(iterable) {
  return new Promise((resolve, reject) => {
    let length = iterable.length;
    if (length === 0) return resolve([]);
    const result = [];

    iterable.forEach((promise, index) => {
      Promise.resolve(promise).then(value => {
        result[index] = value;
        length--;
        if (length === 0) {
          resolve(result);
        }
      }, reason => {
        reject(reason);
      })
    })
  })
}