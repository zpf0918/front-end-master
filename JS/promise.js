// promise的状态改变
// then的多次调用
// then方法的异步处理
// then的链式调用


const isFunc = value => typeof value === 'function'

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  constructor(handler) {
    if (!isFunc(handler)) {
      throw new Error('handle must be a function');
    }

    this._status = PENDING;
    this._value = undefined;
    this._reason = undefined;

    this._fulfilledQueues = [];
    this._rejectedQueues = [];

    try {
      handler(this._resolve.bind(this), this._reject.bind(this));
    } catch(err) {
      this._reject(err);
    }
  }

  _resolve(value) {
    if (this._status === PENDING) {
      this._status = FULFILLED;
      this._value = value;
      let cb;
      while (cb = this._fulfilledQueues.shift()) {
        cb(this._value);
      }
    }
  }

  _reject(reason) {
    if (this._status === PENDING) {
      this._status = REJECTED;
      this._reason = reason;
      let cb;
      while (cb = this._rejectedQueues.shift()) {
        cb(this._reason);
      }
    }
  }
  
  then(onResolve, onReject) {
    const realOnResolve = isFunc(onResolve) ? onResolve : value => value;
    const realOnReject = isFunc(onReject) ? onReject : reason => { throw reason };
    
    const promise2 = new MyPromise((resolve, reject) => {
      const fulfilledMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = realOnResolve(this._value);
            resolvePromise(promise2, x, resolve, reject);
          } catch(err) {
            reject(err);
          }
        })
      }

      const rejectedMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = realOnReject(this._reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch(err) {
            reject(err);
          }
        })
      }

      if (this._status === FULFILLED) {
        fulfilledMicrotask();
      } else if (this._status === REJECTED) {
        rejectedMicrotask();
      } else if (this._status === PENDING) {
        this._fulfilledQueues.push(fulfilledMicrotask);
        this._rejectedQueues.push(rejectedMicrotask);
      }
    })

    return promise2;
  }

  catch(onReject) {
    this.then(undefined, onReject);
  }

  finally(fn) {
    return this.then(value => {
      return MyPromise.resolve(fn()).then(() => {
        return value;
      })
    }, err => {
      return MyPromise.resolve(fn(0)).then(() => {
        throw err;
      })
    })
  }

  static resolve(value) {
    if (value instanceof MyPromise) {
      return value;
    }
    return new MyPromise(resolve => {
      resolve(value);
    });
  }

  static reject(reason) {
    return new MyPromise((_, reject) => {
      reject(reason)
    });
  }

  static all(iterable) {
    return new MyPromise((resolve, reject) => {
      let length = iterable.length;
      if (length === 0) return resolve([]);
      const result = new Array(length);
  
      iterable.forEach((promise, index) => {
        MyPromise.resolve(promise).then(value => {
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

  static race(iterable) {
    return new MyPromise((resolve, reject) => {
      const length = iterable.length;
      if (length === 0) {
        return resolve();
      }

      for (let promise of iterable) {
        MyPromise.resolve(promise).then(value => {
          resolve(value);
        }, reason => {
          reject(reason);
        })
      }
    });
  }

  static allSettled(iterable) {
    return new MyPromise((resolve, reject) => {
      let length = iterable.length;
      if (length === 0) return resolve([]);
      const result = new Array(length);
      
      iterable.forEach((promise, index) => {
        MyPromise.resolve(promise).then(value => {
          length--;
          result[index] = {
            status: 'fulfilled',
            value: value
          }
          if (length === 0) {
            resolve(result);
          }
        }, reason => {
          length--;
          result[index] = {
            status: 'rejected',
            reason: reason
          }
          if (length === 0) {
            resolve(result);
          }
        })
      })
    })
  }

  static any(iterable) {
    return new MyPromise((resolve, reject) => {
      let length = iterable.length;
      if (length === 0) {
        return reject(new Error('All promises were rejected'));
      }

      iterable.forEach((promise) => {
        MyPromise.resolve(promise).then(value => {
          resolve(value);
        }, reason => {
          length--;
          if (length === 0) {
            reject('All promises were rejected');
          }
        })
      })
    })
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('Not return self'))
  }
  
  if (x instanceof MyPromise) {
    x.then(resolve, reject)
  } else {
    resolve(x)
  }
}

// 参考: https://juejin.cn/post/6844903665686282253
// 参考: https://juejin.cn/post/6945319439772434469#heading-21

const promiseList = MyPromise.any([
  MyPromise.reject('fail'),
  new MyPromise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, 10);
  }),
  MyPromise.resolve(3),
  4,
])
promiseList.then(res => {
  console.log(res, 'res')
}).catch(error => {
  console.log(error, 'error')
})
