// stack의 구현 (list)
class Stack {
  constructor() {
    this.items = [];
  }

  push(element) {
    this.items.push(element);
  }

  pop() {
    if (this.items.length === 0) {
      return false;
    }
    return this.items.pop();
  }
}
