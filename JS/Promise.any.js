/**
 * @param {Array} iterable
 * @return {Promise}
 */
export default function promiseAny(iterable) {
  return new Promise((resolve, reject) => {
    let length = iterable.length;
    if (length === 0) {
      reject(new AggregateError([]))
      return;
    }

    const errorList = [];

    iterable.forEach((promise, index) => {
      Promise.resolve(promise).then(value => {
        resolve(value);
      }, reason => {
        length--
        errorList[index] = reason;
        if (length === 0) {
          reject(new AggregateError(errorList));
        }
      })
    })
  })
}