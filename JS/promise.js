// Promise 实现

const isFunction = value => typeof value === 'function'

const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class MyPromise {
  constructor(handler) {
    if (!isFunction(handler)) {
      throw new Error('handler must be is a function')
    }

    this._status = PENDING
    this._value = undefined

    this._fulfilledQueues = []
    this._rejectedQueues = []

    try {
      handler(this._resolve.bind(this), this._reject.bind(this))
    } catch(err) {
      this._reject(err)
    }
  }

  _resolve(val) {
    if (this._status !== PENDING) return
    const run = () => {
      this._status = FULFILLED
      this._value = val
      let cb
      while (cb = this._fulfilledQueues.shift()) {
        cb(this._value)
      }
    }
    // 模拟微任务
    setTimeout(run, 0)
  }

  _reject(err) {
    if (this._status !== PENDING) return
    const run = () => {
      this._status = REJECTED
      this._value = err
      let cb
      while (cb = this._rejectedQueues.shift()) {
        cb(this._value)
      }
    }
    // 模拟微任务
    setTimeout(run, 0)
  }

  then(onFulfilled, onRejected) {
    const { _status, _value } = this

    return new MyPromise((resolveNext, rejectNext) => {
      const fulfill = value => {
        try {
          if (!isFunction(onFulfilled)) {
            resolveNext(value)
          } else {
            let res = onFulfilled(value)

            if (res instanceof MyPromise) {
              res.then(resolveNext, rejectNext)
            } else {
              resolveNext(res)
            }
          }
        } catch(err) {
          rejectNext(err)
        }
      }
  
      const reject = error => {
        try {
          if (!isFunction(onRejected)) {
            rejectNext(error)
          } else {
            let res = onRejected(error)
            if (res instanceof MyPromise) {
              res.then(resolveNext, rejectNext)
            } else {
              resolveNext(res)
            }
          }
        } catch(err) {
          rejectNext(err)
        }
      }

      switch(_status) {
        case PENDING:
          this._fulfilledQueues.push(onFulfilled)
          this._rejectedQueues.push(onRejected)
          break
        case FULFILLED:
          fulfill(_value)
          break
        case REJECTED:
          reject(_value)
          break
      }
    })
  }

  catch(onRejected) {
    return this.then(undefined, onRejected)
  }

  static resolve(value) {
    if (value instanceof MyPromise) return value
    return new MyPromise(resolve => resolve(value))
  }

  static reject(error) {
    if (err instanceof MyPromise) return error
    return new Promise((resolve, reject) => reject(error))
  }

  static race() {}

  static all(list) {
  }

  static finally() {}
}

const handler = (resolve, reject) => {
  // setTimeout(() => resolve(1), 1000)
  reject(1)
}

const promise = new MyPromise(handler)

promise.catch(err => {
  console.log(err, 'okokoko')
})
