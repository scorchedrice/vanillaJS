class Queue {
    constructor() {
        this.front = 0;
        this.back = -1;
        this.qMap = new Map();
    }
    push(element) {
        this.back++
        this.qMap.set(this.back, element);
    }
    popleft() {
        const popLeftValue = this.qMap.get(this.front)
        this.qMap.delete(this.front)
        this.front++
        return popLeftValue;
    }
    length() {
        return this.back - this.front + 1
    }
}

// 북동남서


function solution(board) {
    var answer = 0;
    
    const di = [-1,0,1,0];
    const dj = [0,1,0,-1];
    
    let start;
    let goal;
    
    const matrix = [];
    for (let i = 0; i < board.length; i++) {
        const divided = board[i].split('');
        if (!start || !goal) {
            for (let j = 0; j < divided.length; j++) {
                const checkBoard = divided[j];
                if (checkBoard === 'G') goal = [i,j]
                if (checkBoard === 'R') start = [i,j]
            }    
        }
        matrix.push(divided);
    }
    
    function checkIndex(i,j) {
        if (0 <= i && i < board.length) {
            if (0<= j && j < board[0].length) {
                return true   
            }
        }
        return false
    }
    
    function checkD(i,j) {
        if (matrix[i][j] === 'D')  {
            return false 
        } else {
            return true    
        }
    }
    
    function bfs() {
        const Qi = new Queue()
        const Qj = new Queue()
        Qi.push(start[0])
        Qj.push(start[1])
        let paper = [...matrix];
        paper[start[0]][start[1]] = 0;
        while (Qi.length() > 0) {
            const Ci = Qi.popleft();
            const Cj = Qj.popleft(); 
            for (let dir = 0; dir < 4; dir ++) {
                // 쭉 미끄러져 가보자.
                let Ni = Ci + di[dir];
                let Nj = Cj + dj[dir];
                while (true) {
                    if (checkIndex(Ni,Nj) === false) {
                        break;
                    }
                    if (checkD(Ni,Nj) === false) {
                        break
                    }
                    Ni = Ni + di[dir];
                    Nj = Nj + dj[dir];
                }
                Ni = Ni - di[dir];
                Nj = Nj - dj[dir];
                if (paper[Ni][Nj] === '.' || paper[Ni][Nj] ==='G') {
                    paper[Ni][Nj] = paper[Ci][Cj] + 1;
                    if (Ni === goal[0] && Nj === goal[1]) {
                        // console.log(paper)
                        // console.log(paper[Ni][Nj])
                        return paper[Ni][Nj]
                    };
                    Qi.push(Ni)
                    Qj.push(Nj)    
                }
            }
        }
        // console.log(paper)
        return -1
    }
    answer = bfs();
    return answer;
}