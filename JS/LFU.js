class LFUCache {
  constructor(capacity) {
      this.keyToVal = new Map();
      this.keyToFreq = new Map();
      this.freqToKeys = new Map();
      this.minFreq = 0;
      this.cap = capacity;
  }

  removeMinFreqKey() {
      const list = this.freqToKeys.get(this.minFreq);
      const deleteKey = list.shift();
      if (list.length === 0) {
          this.freqToKeys.delete(this.minFreq);
      }
      this.keyToVal.delete(deleteKey);
      this.keyToFreq.delete(deleteKey);
  }

  increaseFreq(key) {
      const freq = this.keyToFreq.get(key);
      this.keyToFreq.set(key, freq + 1);
      const index = this.freqToKeys.get(freq).findIndex(item => item === key);
      this.freqToKeys.get(freq).splice(index, 1);
      if (this.freqToKeys.has(freq + 1)) {
          this.freqToKeys.get(freq + 1).push(key);
      } else {
          this.freqToKeys.set(freq + 1, [key]);
      }
      if (this.freqToKeys.get(freq).length === 0) {
          this.freqToKeys.delete(freq);
          if (freq === this.minFreq) {
              this.minFreq++;
          }
      }
  }

  get(key) {
      if (!this.keyToVal.has(key)) return -1;
      this.increaseFreq(key);
      return this.keyToVal.get(key);
  }

  put(key, val) {
      if (this.keyToVal.has(key)) {
          this.keyToVal.set(key, val);
          this.increaseFreq(key);
          return;
      }

      if (this.cap <= this.keyToVal.size) {
          this.removeMinFreqKey();
      }

      this.keyToVal.set(key, val);
      this.keyToFreq.set(key, 1);
      if (!this.freqToKeys.has(1)) {
          this.freqToKeys.set(1, [key]);
      }  else {
          this.freqToKeys.set(1, this.freqToKeys.get(1).concat(key));
      }
      this.minFreq = 1;
  }
}