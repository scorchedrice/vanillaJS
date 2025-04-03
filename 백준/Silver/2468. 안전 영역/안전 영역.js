// const input = require('fs').readFileSync('/dev/stdin').toString().split(' ');
let input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const N = parseInt(input.splice(0,1)[0]);

class Queue {
    constructor() {
        this.front = 0;
        this.back = -1;
        this.qMap = new Map();
    }
    push(element) {
        this.back ++
        this.qMap.set(this.back, element);
    }
    popleft() {
        const rv = this.qMap.get(this.front);
        this.qMap.delete(this.front);
        this.front ++
        return rv;
    }
    length() {
        return this.back - this.front + 1;
    }
}

const di = [0,0,-1,1];
const dj = [1,-1,0,0];


let mx = -1; // 최대 높이
let mn = 101; // 최소높이
let ans = 1;
const matrix = [];
for (let i = 0; i < N; i++) {
    const line = input[i].split(' ').map((n) => Number(n))
    for (height of line) {
        if (height > mx) mx = height;
        if (height < mn) mn = height;
    }
    matrix.push(line)
}

for (let h = mn; h < mx; h++) {
    let visited = matrix.map(row => [...row]);
    function bfs(si, sj) {
        const qi = new Queue();
        const qj = new Queue();
        qi.push(si);
        qj.push(sj);
        visited[si][sj] = -1;
        while (qi.length() > 0) {
            const ci = qi.popleft();
            const cj = qj.popleft();
            for (let i = 0; i < 4; i ++) {
                const ni = ci + di[i];
                const nj = cj + dj[i];
                if (checkIndex(ni, nj)) {
                    if (visited[ni][nj] > h) {
                        visited[ni][nj] = -1;
                        qi.push(ni);
                        qj.push(nj);
                    }
                }
            }
        }
    }
    let cnt = 0;
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (visited[i][j] > h) {
                bfs(i, j);
                cnt ++
            }
        }
    }
    if (ans < cnt) {
        ans = cnt
    }
}

console.log(ans)

function checkIndex(i, j) {
    if (i < 0 || i >= N || j < 0 || j >= N) return false;
    return true;
}

