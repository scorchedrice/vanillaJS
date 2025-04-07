// const input = require('fs').readFileSync('/dev/stdin').toString().split(' ');
let input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

class Heap {
    constructor() {
        this.pq = [null];
    }
    size() {
        return this.pq.length;
    }
    insert(element) {
        this.pq.push(element);
        let currentIndex = this.pq.length-1;
        let parentIndex = Math.floor(currentIndex * 0.5);
        while (
            parentIndex !== 0 && this.pq[currentIndex] > this.pq[parentIndex]
        ) {
            // 부모보다 자식이 크다? 그러면 부모의 자리로 올라가야한다.
            [this.pq[parentIndex], this.pq[currentIndex]] = [this.pq[currentIndex], this.pq[parentIndex]]
            currentIndex = parentIndex;
            parentIndex = Math.floor(0.5 * currentIndex);
        }
    }
    heappop() {
        // only root node => 해당 노드 출력
        if (this.size() === 2) return this.pq.pop();
        // root node외의 것이 있다면(두개 이상의 노드 존재)
        // 해당 노드를 잠시 저장해두고, 재배열 로직을 수행한다.
        const returnValue = this.pq[1];
        this.pq[1] = this.pq.pop(); // 마지막 값을 임시로 root로 할당. 이후 재배치 시작.
        let currentIndex = 1;
        let left = 2;
        let right = 3;
        while (
            this.pq[currentIndex] < this.pq[left] || this.pq[currentIndex] < this.pq[right]
        ) {
            if (this.pq[right] > this.pq[left]) {
                [this.pq[right], this.pq[currentIndex]] = [this.pq[currentIndex], this.pq[right]]
                currentIndex = right;
            } else {
                [this.pq[left], this.pq[currentIndex]] = [this.pq[currentIndex], this.pq[left]]
                currentIndex = left;
            }
            left = currentIndex * 2;
            right = left + 1;
        }
        return returnValue;
    }
}

const [N, K] = input.splice(0,1)[0].split(' ').map((numb) => Number(numb));
const jewels = input.splice(0,N).map(jewel => jewel.split(' ').map(numb => Number(numb))).sort((a,b) => a[0]-b[0]);
const bags = input.splice(0,K).map(bag => Number(bag)).sort((a,b) => a-b);

const pq = new Heap();
let j = 0;
let result = 0;
for (let i = 0; i < K; i++) {
    // 가방을 선택하고, 해당 가방에 넣을 수 있는 보석을 모두 넣는다.
    while (j < N && jewels[j][0] <= bags[i]) {
        pq.insert(jewels[j][1]);
        j++;
    }
    if (pq.size() >= 2) {
        result += pq.heappop();
    }
}
console.log(result)
