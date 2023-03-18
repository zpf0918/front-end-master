class Node {
  constructor(key, val) {
    this.prev = null;
    this.next = null;
    this.key = key;
    this.val = val;
  }
}

class DoubleList {
  constructor() {
    this.head = new Node(0, 0);
    this.tail = new Node(0, 0);

    this.head.next = this.tail;
    this.tail.prev = this.head;

    this.size = 0;
  }

  addLast(x) {
    x.next = this.tail;
    x.prev = this.tail.prev;
    this.tail.prev.next = x;
    this.tail.prev = x;
    this.size++;
  }

  remove(x) {
    x.prev.next = x.next;
    x.next.prev = x.prev;
    x.prev = null;
    x.next = null;
    this.size--;
  }

  removeFirst() {
    if (this.head.next === this.tail) return -1;
    let first = this.head.next;
    this.remove(first);
    return first;
  }
}

class LRUCache {
  constructor(capability) {
    this.map = new Map();
    this.cache = new DoubleList();
    this.cap  = capability;
  }

  makeRecently(key) {
    let x = this.map.get(key);
    this.cache.remove(x);
    this.cache.addLast(x);
  }

  addRecently(key, val) {
    let x = new Node(key, val);
    this.map.set(key, x);
    this.cache.addLast(x);
  }

  deleteKey(key) {
    let node = this.map.get(key);
    this.map.delete(key);
    this.cache.remove(node);
  }

  removeLeastRecently() {
    let node = this.cache.removeFirst();
    this.map.delete(node.key);
  }

  get(key) {
    if (!this.map.has(key)) {
      return -1;
    }
    this.makeRecently(key);
    return this.map.get(key).val;
  }

  put(key, val) {
    if (this.map.get(key)) {
      this.deleteKey(key);
      this.addRecently(key, val);
      return;
    }
    
    if (this.cap === this.cache.size) {
      this.removeLeastRecently();
    }

    this.addRecently(key, val);
  }
}