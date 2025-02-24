class Queue {
    constructor() {
        this.qMap = new Map();
        this.front = 0;
        this.back = -1;
    }
    
    size() {
        return this.back - this.front + 1;
    }
    
    popleft() {
        const returnValue = this.qMap.get(this.front);
        this.qMap.delete(this.front);
        this.front ++
        return returnValue;
    }
    
    push(element) {
        this.back ++
        this.qMap.set(this.back, element)
    }
}

function solution(maps) {
    let answer = [];
    let matrix = [];
    for (map of maps) {
        const line = map.split('');
        matrix.push(line)
    }
    // console.log(matrix)
    
    const di = [0,0,-1,1];
    const dj = [-1,1,0,0];
    
    function checkIndex(i, j) {
        if (0 <= i && i < maps.length && 0 <= j && j < maps[0].length && matrix[i][j] !== 'X') {
            return true
        } else {
            return false
        }
    }
    
    function bfs(si, sj) {
        const qi = new Queue();
        const qj = new Queue();
        let ans = 0;
        ans += parseInt(matrix[si][sj])
        matrix[si][sj] = 'X'
        qi.push(si);
        qj.push(sj);
        
        while (qi.size() > 0) {
            const ci = qi.popleft();
            const cj = qj.popleft();
            for (let dir = 0; dir < 4; dir ++) {
                const ni = ci + di[dir];
                const nj = cj + dj[dir];
                if (checkIndex(ni, nj)) {
                    ans += parseInt(matrix[ni][nj])
                    matrix[ni][nj] = 'X'
                    qi.push(ni)
                    qj.push(nj)
                }
            }
        }
        return ans
    }
    
    for (let i = 0; i < maps.length; i ++) {
        for (let j = 0; j < maps[0].length; j ++) {
            if (matrix[i][j] !== 'X') {
                const numb = bfs(i,j);
                answer.push(numb)
            }
        }
    }
    
    if (answer.length === 0) {
        return [-1]
    } else {
        answer.sort((a,b) => a-b)
        return answer
    }
}