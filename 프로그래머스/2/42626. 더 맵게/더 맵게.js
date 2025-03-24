class PQ {
    // 최대힙이지만 음수를 삽입하여 사용하기에 상관없음.
    constructor() {
        this.pq = [null];
    }
    length() {
        return this.pq.length;
    }
    insert(element) {
        this.pq.push(element);
        let currentIndex = this.pq.length - 1;
        let parentIndex = Math.floor(currentIndex / 2);
        while (
            parentIndex !== 0 &&
            this.pq[currentIndex] > this.pq[parentIndex]
        ) {
            [this.pq[parentIndex], this.pq[currentIndex]] = [this.pq[currentIndex], this.pq[parentIndex]]
            currentIndex = parentIndex;
            parentIndex = Math.floor(currentIndex / 2)
        }
    }
    pop() {
        if (this.pq.length === 2) return this.pq.pop();
        const returnValue = this.pq[1];
        this.pq[1] = this.pq.pop();
        let currentIndex = 1;
        let leftIndex = 2;
        let rightIndex = 3;
        while (
            this.pq[currentIndex] < this.pq[leftIndex] ||
            this.pq[currentIndex] < this.pq[rightIndex]
        ) {
            if (this.pq[rightIndex] > this.pq[leftIndex]) {
                [this.pq[currentIndex],this.pq[rightIndex]] = [this.pq[rightIndex],this.pq[currentIndex]]
                currentIndex = rightIndex;
            } else {
                [this.pq[currentIndex],this.pq[leftIndex]] = [this.pq[leftIndex],this.pq[currentIndex]]
                currentIndex = leftIndex;
            }
            leftIndex = currentIndex * 2;
            rightIndex = leftIndex + 1;
        }
        return returnValue;
    }
}

function solution(scoville, K) {
    let answer = 0;
    const pq = new PQ();
    for (scv of scoville) {
        pq.insert(-1 * scv);
    }
    while (pq.length() > 1 && -pq.pq[1] < K) {
        const a = pq.pop();
        const b = pq.pop();
        answer ++;
        pq.insert(a + 2 * b) // 음수 + 음수기에 상관없음.
    }
    return -pq.pq[1] >= K ? answer : -1;
}