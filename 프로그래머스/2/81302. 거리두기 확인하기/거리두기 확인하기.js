const checkPointOne = [[1,0], [-1,0], [0,1], [0,-1]]
const checkPointTwo = [[2,0], [-2,0], [0,2], [0,-2]]
const checkPointCross = [[1,1], [1,-1], [-1,1], [-1,-1]]

function checkIndex(i,j) {
    if (0 > i || 0 > j || 4 < i || 4 < j) {
        return false
    }
    return true
}

function checkNeighbor(i,j, matrix) {
    for (pivot1 of checkPointOne) {
        const ni = i + pivot1[0]
        const nj = j + pivot1[1]
        if (checkIndex(ni,nj) && matrix[ni][nj] === 'P') {
            return false
        }
    }
    
    for (pivot2 of checkPointTwo) {
        const ni = i + pivot2[0]
        const nj = j + pivot2[1]
        if (checkIndex(ni,nj) && matrix[ni][nj] === 'P') {
            const midI = parseInt((ni + i) / 2)
            const midJ = parseInt((nj + j) / 2)
            if (matrix[midI][midJ] !== 'X') {
                return false
            }
        }   
    }
    
    for (pivot3 of checkPointCross) {
        const ni = i + pivot3[0];
        const nj = j + pivot3[1];
        if (checkIndex(ni,nj) && matrix[ni][nj] === 'P') {
            const road1 = [i + pivot3[0], j]
            const road2 = [i, j + pivot3[1]]
            if (matrix[road1[0]][road1[1]] === "X" && matrix[road2[0]][road2[1]] === "X") {
                continue
            } else {
                return false
            }
        }
    }
    return true
}

function solution(places) {
    var answer = [];
    for (place of places) {
        let pivot = true;
        const matrix = place.map(a => a.split(''))
        for (let i = 0; i < 5; i++) {
            if (pivot === false) {break}
            for (let j = 0; j < 5; j++) {
                if (pivot === false) {break}
                if (matrix[i][j] === 'P') {
                    pivot = checkNeighbor(i,j,matrix)
                }
            }
        }
        answer.push(Number(pivot))
    }
    return answer;
}