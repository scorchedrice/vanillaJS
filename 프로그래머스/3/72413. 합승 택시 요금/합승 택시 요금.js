// n까지 함께가고 분리하는 경로를 설정한다.
// => 그렇다면 분리되는 지점을 어디로 설정하지?


function solution(n, s, a, b, fares) {
    const INF = 987654321;
    // 값들을 적을 매트릭스 작성
    const matrix = [];
    for (let i = 0; i < n+1; i++) {
        const line = [];
        for (let j = 0; j < n+1; j++) {
            if (i === j && i !== 0) {
                line.push(0)
            } else {
                line.push(INF)    
            }
        }
        matrix.push(line)
    }
    // 노드 상태 반영
    for (fare of fares) {
        const [a, b, d] = fare;
        matrix[a][b] = d;
        matrix[b][a] = d;
    }
    
    // k는 경유할 경로, from i to j
    for (let k = 1; k < n+1; k++) {
        for (let i = 1; i < n+1; i++) {
            for (let j = 1; j < n+1; j++) {
                if (i === j) continue
                const value = Math.min(matrix[i][j], matrix[i][k] + matrix[k][j])
                matrix[i][j] = value;
            }
        }
    }
    
    let answer = matrix[s][a] + matrix[s][b];
    // 경유할 노드를 하나씩 pick해보며 비교
    for (let node = 1; node < n + 1; node ++) {
        const pivot = matrix[s][node] + matrix[node][a] + matrix[node][b];
        if (pivot < answer) answer = pivot;
        // console.log(answer)
    }
    
    return answer
}