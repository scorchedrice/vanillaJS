function solution(arr) {
    var answer = [];
    let oneCnt = 0;
    let zeroCnt = 0;
    let matrix = [...arr]
    
    // 1. 갯수 세기
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (arr[i][j] === 1) oneCnt ++
            if (arr[i][j] === 0) zeroCnt ++
        }
    }
    if (oneCnt === 0) return [1,0]
    if (zeroCnt === 0) return [0,1]
    
    // 2. 큰 블럭 순으로 사이즈 조절하기
    
    function cntCalculator(size, si, sj) {
        let one = 0;
        let zero = 0;
        const visitedHistory = [];
        for (let i = si; i < si + size; i ++) {
            for (let j = sj; j < sj + size; j ++) {
                if (matrix[i][j] === 1) one ++
                if (matrix[i][j] === 0) zero ++
                if (matrix[i][j] === 9) return
                if (one !== 0 && zero !== 0) return
                visitedHistory.push([i,j])
            }
        }
        // 여기까지 이상이 없다 => 통과임. 그래서 visited 기록
        for (history of visitedHistory) {
            matrix[history[0]][history[1]] = 9
        }
        if (zero === 0) oneCnt = oneCnt - size * size + 1
        if (one === 0) zeroCnt = zeroCnt - size * size + 1
        return
    }
    
    for (let size = arr.length / 2; size > 1; size = size / 2) {
        for (let si = 0; si < arr.length; si += size) {
            for (let sj = 0; sj < arr.length; sj += size) {
                cntCalculator(size, si, sj)
                // console.log(matrix)
                // console.log(zeroCnt, oneCnt)
            }
        }
    }
    return [zeroCnt, oneCnt];
}