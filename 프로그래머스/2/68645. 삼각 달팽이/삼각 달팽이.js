function checkIndex(i,j,matrix) {
    const n = matrix.length
    if (0 > i || 0 > j || n <= i || n <= j) return false
    if (matrix[i][j] !== 0) return false
    return true
}

function solution(n) {
    let matrix = [];
    for (let i = 0; i < n; i++) {
        const layer = [];
        for (let j = 0; j < n; j++) {
            layer.push(0)
        }
        matrix.push(layer)
    }
    let currentNumber = 1;
    let ci = 0;
    let cj = 0
    
    function left() {
        let validIndex = checkIndex(ci,cj,matrix)
        if (!validIndex) return false
        while (validIndex) {
            matrix[ci][cj] = currentNumber;
            validIndex = checkIndex(ci + 1, cj, matrix)
            currentNumber += 1
            if (validIndex) {
                ci++
            }
        }
        cj ++
        return true
    }
    
    function bot() {
        let validIndex = checkIndex(ci,cj,matrix)
        if (!validIndex) return false
        while (validIndex) {
            matrix[ci][cj] = currentNumber;
            validIndex = checkIndex(ci, cj+1, matrix)
            currentNumber += 1
            if (validIndex) {
                cj++
            }
        }
        ci --
        cj --
        return true
    }
    
    function right() {
        let validIndex = checkIndex(ci,cj,matrix)
        if (!validIndex) return false
        while (validIndex) {
            matrix[ci][cj] = currentNumber;
            validIndex = checkIndex(ci-1, cj-1, matrix)
            currentNumber += 1
            if (validIndex) {
                cj--
                ci--
            }
        }
        ci ++
        return true
    }
    
    while (true) {
        const a = left()
        const b = bot()
        const c = right()
        if (a === false || b === false || c === false) break
    }
    
    let answer = []
    
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] !== 0) {
                answer.push(matrix[i][j])
            }
        }
    }
    
    return answer;
}