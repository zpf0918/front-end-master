let person = {
  name: 'Tom',
  age: 12
};

function defineProperty(obj, key, val) {
    if (typeof val === 'object') {
      Observer(val);
    }
  
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: function () {
        console.log('get');
        return val;
      },
      set: function (newVal) {
        console.log(newVal, 'set')
        if (typeof newVal === 'object') {
          Observer(newVal);
        }
        val = newVal;
      }
    })
}

function Observer(obj) {
  if (typeof obj !== 'object' || obj === null) return;
  
  Object.keys(obj).forEach(key => {
    defineProperty(obj, key, obj[key]);
  })
}

Observer(person);
person.age = {
  a: 1
};

person.age.a = 2