class Node {
  constructor(value = null, nxt_pointer = null) {
    this.value = value;
    this.nxt_pointer = nxt_pointer;
  }
}

class LinkedList {
  constructor() {
    this.hd = null;
    this.tl = null;
    this.n = 0;
  }

  append(value) {
    const node = new Node(value);
    if (this.hd === null) {
      this.hd = node;
      this.tl = node;          // always keep tl in sync
    } else {
      this.tl.nxt_pointer = node;
      this.tl = node;
    }
    this.n++;
  }

  prepend(value) {
    const node = new Node(value, this.hd);
    this.hd = node;
    if (this.tl === null) this.tl = node;   // was empty
    this.n++;
  }

  // Removes and returns the LAST element (true pop)
  pop() {
    if (this.hd === null) return undefined;

    let removed;
    if (this.hd === this.tl) {             // single element
      removed = this.hd.value;
      this.hd = null;
      this.tl = null;
    } else {
      // Walk to second-to-last
      let prev = this.hd;
      while (prev.nxt_pointer !== this.tl) {
        prev = prev.nxt_pointer;
      }
      removed = this.tl.value;
      prev.nxt_pointer = null;
      this.tl = prev;
    }
    this.n--;
    return removed;
  }

  // Removes and returns the FIRST element
  shift() {
    if (this.hd === null) return undefined;
    const removed = this.hd.value;
    this.hd = this.hd.nxt_pointer;
    if (this.hd === null) this.tl = null;  // list is now empty
    this.n--;
    return removed;
  }

  at(index, what = "value") {
    if (index < 0 || index >= this.n) return undefined;   // fix: >= not >
    let current = this.hd;
    for (let i = 0; i < index; i++) current = current.nxt_pointer;
    return what === "value" ? current.value : current;
  }

  removeAt(index) {
    if (index < 0 || index >= this.n) return undefined;
    if (index === 0) return this.shift();
    if (index === this.n - 1) return this.pop();           // keeps tl correct
    const prev = this.at(index - 1, "object");
    prev.nxt_pointer = prev.nxt_pointer.nxt_pointer;
    this.n--;
  }

  insertAt(index, value) {
    if (index < 0 || index > this.n) return undefined;
    if (index === 0) return this.prepend(value);
    if (index === this.n) return this.append(value);
    const prev = this.at(index - 1, "object");
    prev.nxt_pointer = new Node(value, prev.nxt_pointer);
    this.n++;
  }

  toString() {
    let current = this.hd;
    while (current !== null) {
      process.stdout.write(`{${current.value}} -> `);
      current = current.nxt_pointer;
    }
    console.log("null");
  }

  size()    { return this.n; }
  head()    { return this.hd?.value ?? undefined; }
  tail()    { return this.tl?.value ?? undefined; }

  contains(value) { return this.findIndex(value) !== -1; }

  findIndex(value) {
    let current = this.hd;
    for (let i = 0; i < this.n; i++, current = current.nxt_pointer)
      if (current.value == value) return i;
    return -1;
  }

  containsKey(key) {
    let current = this.hd;
    while (current !== null) {
      if (current.value?.key === key) return current.value.value;
      current = current.nxt_pointer;
    }
    return false;
  }
}

export { LinkedList };