/**
 * @param {Array} iterable
 * @return {Promise<{status: 'fulfilled', value: *}|{status: 'rejected', reason: *}>}
 */
export default function promiseAllSettled(iterable) {
  return new Promise((resolve, reject) => {
    let length = iterable.length;
    if (length === 0) return resolve([]);

    const result = [];
    iterable.forEach((promise, index) => {
      Promise.resolve(promise).then(value => {
        length--;
        result[index] = {
          status: 'fulfilled',
          value
        }
        if (length === 0) {
          resolve(result);
        }
      }, reason => {
        length--;
        result[index] = {
          status: 'rejected',
          reason
        }
        if (length === 0) {
          resolve(result);
        }
      })
    })
  })
}