// const input = require('fs').readFileSync('/dev/stdin').toString().split(' ');
let input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const n = parseInt(input.splice(0,1));
const target = input.splice(0,1).map((numb) => numb.split(' ').map((num) => parseInt(num)))[0];
const m = parseInt(input.splice(0,1));

const matrix = new Map();

for (let i = 0; i < m; i++) {
    const [x,y] = input[i].split(' ').map((numb) => parseInt(numb))
    if (matrix.has(x)) {
        const arr = matrix.get(x);
        arr.push(y)
        matrix.set(x, arr)
    } else {
        matrix.set(x, [y])
    }
    if (matrix.has(y)) {
        const arr = matrix.get(y);
        arr.push(x)
        matrix.set(y, arr)
    } else {
        matrix.set(y,[x]);
    }
}

class Queue {
    constructor() {
        this.front = 0;
        this.back = -1;
        this.qMap = new Map();
    }
    push(element) {
        this.back++;
        this.qMap.set(this.back, element);
    }
    popleft() {
        const returnValue = this.qMap.get(this.front);
        this.qMap.delete(this.front);
        this.front++;
        return returnValue;
    }
    length() {
        return this.back - this.front + 1;
    }
}

function bfs(start, end) {
    const q = new Queue();
    q.push(start);
    const visited = [0];
    for (let i = 0; i < n; i++) {
        visited.push(0)
    }
    visited[start] = 1;
    while (q.length() > 0) {
        const current = q.popleft();
        const nextCandidates = matrix.get(current);
        for (nextCandidate of nextCandidates) {
            if (visited[nextCandidate] === 0) {
                q.push(nextCandidate)
                visited[nextCandidate] = visited[current] + 1;
                if (nextCandidate === end) {
                    return visited[nextCandidate] - 1
                }
            }
        }
    }
    return -1;
}

const result = bfs(target[0], target[1])
console.log(result)
