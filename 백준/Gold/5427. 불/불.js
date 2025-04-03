// const input = require('fs').readFileSync('/dev/stdin').toString().split(' ');
let input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const tc_total = Number(input.splice(0,1)[0]);

/**
 * 불도 움직여야함!
 * 근데 불을 직접 움직이는 것 => 낭비임.
 * 상근이가 가려고 하는 위치에서, 불이 올 수 있는지 판단한다.
 * 판단은 멘헤튼 거리로 하면 된다. 불의 근원지에서 멘헤튼거리로 해당 시간에 접근할 수 있냐.
 * x좌표의 차이, y좌표의 차이가 해당 위치에 도착할 때 까지 불이 걸리는 최단시간이므로, 이를 판단 척도로 사용해야한다.
 */

class Queue {
    constructor() {
        this.front = 0;
        this.back = -1;
        this.qMap = new Map();
    }
    push(element) {
        this.back ++;
        this.qMap.set(this.back, element)
    }
    popleft() {
        const returnValue = this.qMap.get(this.front);
        this.qMap.delete(this.front);
        this.front ++;
        return returnValue;
    }
    size() {
        return this.back - this.front + 1;
    }
}

const di = [0,0,-1,1];
const dj = [-1,1,0,0];

// 해당 좌표까지 불이 도달하는 시간 계산
function fireBfs(fireList, matrix) {
    const visited = matrix.map(row => [...row]);
    for (fire of fireList) {
        const i = fire[0];
        const j = fire[1];
        const qi = new Queue();
        const qj = new Queue();
        qi.push(i);
        qj.push(j);
        visited[i][j] = 0
        while(qi.size() > 0) {
            const ci = qi.popleft();
            const cj = qj.popleft();
            for (let dir = 0; dir < 4; dir ++) {
                const ni = ci+ di[dir];
                const nj = cj + dj[dir];
                if (ni < 0 || nj < 0 || ni >= matrix.length || nj >= matrix[0].length) {
                    continue;
                } else {
                    if (visited[ni][nj] === '.' || visited[ni][nj] === '@' || visited[ni][nj] > visited[ci][cj] + 1) {
                        visited[ni][nj] = visited[ci][cj] + 1;
                        qi.push(ni);
                        qj.push(nj);
                    }
                }
            }
        }
    }
    return visited
}

for (let tc = 0; tc < tc_total; tc ++) {
    const [N, M] = input.splice(0,1)[0].split(' ');
    const shallowMatrix = input.splice(0, M).map((row) => row.split(''));
    const matrix =JSON.parse(JSON.stringify(shallowMatrix))
    const fireList = [];
    let start;
    for (let i = 0; i < M; i++) {
        for (let j = 0; j < N; j++) {
            if (matrix[i][j] === '*') {
                fireList.push([i,j])
            }
            if (matrix[i][j] === '@') {
                start = [i,j]
            }
        }
    }
    const pivot = fireBfs(fireList, matrix)
    function matrixBfs(si, sj) {
        if (si === 0 || si === matrix.length-1 || sj === 0 || sj === matrix[0].length - 1) {
            return 0;
        }
        const qi = new Queue();
        const qj = new Queue();
        qi.push(si);
        qj.push(sj);
        let visited = matrix.map(row => [...row]);
        visited[si][sj] = 0;
        while(qi.size() > 0) {
            const ci = qi.popleft();
            const cj = qj.popleft();
            for (let dir = 0; dir < 4; dir ++) {
                const ni = ci + di[dir];
                const nj = cj + dj[dir];
                if (ni < 0 || nj < 0 || ni >= matrix.length || nj >= matrix[0].length) {
                    continue;
                } else {
                    if (visited[ni][nj] === '.' && (pivot[ni][nj] > visited[ci][cj] + 1 || pivot[ni][nj] === '.')) {
                        if (ni === 0 || ni === matrix.length-1 || nj === 0 || nj === matrix[0].length - 1) {
                            return visited[ci][cj] + 1;
                        }
                        visited[ni][nj] = visited[ci][cj] + 1;
                        qi.push(ni);
                        qj.push(nj);
                    }
                }
            }
        }
        return -1;
    }
    const ans = matrixBfs(start[0], start[1]) + 1;
    if (ans === 0) {
        console.log('IMPOSSIBLE')
    } else {
        console.log(ans);
    }
}