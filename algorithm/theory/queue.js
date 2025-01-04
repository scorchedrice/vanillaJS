// queue의 구현

// 1. 시간복잡도를 고려한 큐
class Queue {
  constructor() {
    this.qObj = new Map();
    this.front = 0;
    this.back = -1;
  }

  length() {
    if (this.qObj.get(this.back) === undefined) {
      return 0
    }
    return this.back - this.front + 1
  }

  push(element) {
    this.back ++
    this.qObj.set(this.back, element)
  }

  popleft() {
    if (this.length() === 0) {
      return false
    }
    const firstValue = this.qObj.get(this.front)
    this.front ++
    return firstValue;
  }
}