/**
 * @param {Array} iterable
 * @return {Promise}
 */
export default function promiseRace(iterable) {
  return new Promise((resolve, reject) => {
    const length = iterable.length;
    if (length === 0) {
      return resolve();
    }
    
    iterable.forEach(promise => {
      Promise.resolve(promise).then(value => {
        resolve(value)
      }, reason => {
        reject(reason)
      })
    })
  })
}