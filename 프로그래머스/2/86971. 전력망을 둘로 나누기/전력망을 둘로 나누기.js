function solution(n, wires) {
    var answer = 987654321;
    const matrix = new Map()
    for (wire of wires) {
        const a = wire[0]
        const b = wire[1]
        if (matrix.has(a)) {
            const pivotA = matrix.get(a)
            pivotA.push(b)
            matrix.set(a, pivotA)
        } else {
            matrix.set(a,[b])
        }
        
        if (matrix.has(b)) {
            const pivotB = matrix.get(b)
            pivotB.push(a)
            matrix.set(b, pivotB)
        } else {
            matrix.set(b,[a])
        }
        
    }
    
    function bfs(a,b,s) {
        const q = [s]
        let ans = 0;
        const visited = [0]
        for (let i = 0; i < n; i++) {
            visited.push(0)
        }
        visited[s] = 1
        while (q.length > 0) {
            const c = q.shift()
            const nextCandidate = matrix.get(c)
            for (candidate of nextCandidate) {
                if (visited[candidate] === 0) {
                    if (c === a && candidate === b) continue                        
                    if (c === b && candidate === a) continue
                    ans ++
                    visited[candidate] = 1
                    q.push(candidate)
                }
            }
        }
        return ans
    }
    
    for (let wire of wires) {
        const pivotA = bfs(wire[0], wire[1], wire[0])
        const pivotB = bfs(wire[0], wire[1], wire[1])
        if (Math.abs(pivotA - pivotB) < answer) {
            answer = Math.abs(pivotA - pivotB)
        }
    }
    return answer;
}