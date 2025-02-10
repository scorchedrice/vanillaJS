class Queue {
    constructor() {
        this.qObj = new Map();
        this.front = 0;
        this.back = -1
    }
    
    push(element) {
        this.back ++
        this.qObj.set(this.back, element)
    }
    
    popleft() {
        const returnValue = this.qObj.get(this.front);
        this.qObj.delete(this.front)
        this.front ++
        return returnValue
    }
    
    size() {
        return this.back - this.front + 1
    }
}

function solution(n, computers) {
    let answer = 0;
    // i번 컴퓨터의 정보를 보고싶다 => matrix[i]
    // 1. 보기 편하게 map 활용
    const computerMaps = new Map()
    const visitedMaps = new Map()
    for (let i = 0; i < n; i++) {
        computerMaps.set(i, computers[i])
        visitedMaps.set(i, false); // false : 방문한 적 없다.
    }
    
    // 2. 
    function bfs(s) {
        // bfs는 0부터 시작
        const q = new Queue();
        q.push(s); // 큐에 삽입
        visitedMaps.set(s, true); // 방문기록
        while (q.size() > 0) {
            const now = q.popleft(); // 큐에서 하나 빼고
            const nextCandidate = computerMaps.get(now); // 다음 후보를 추린 후 반복문
            // console.log(nextCandidate)
            for (let a = 0; a < n; a++) {
                // 나자신 제외하고, 방문기록이 없는 경우
                if (a !== now && nextCandidate[a] === 1 && visitedMaps.get(a) === false) {
                    q.push(a); // 위의 조건문을 모두 통과 => 넘어갈 자격이 있음.
                    // console.log('need to paint', a)
                    visitedMaps.set(a, true);
                }
            }
        }
        // while문의 종료 => bfs종료 => answer ++
        answer ++
        return;
    }
    // console.log(visitedMaps)
    for (let nd = 0; nd < n; nd ++) {
        if (visitedMaps.get(nd) === false) {
            // console.log('visited', visitedMaps.get(nd))
            bfs(nd)
        }
    }
    
    return answer;
}