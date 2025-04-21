function solution(board) {
    var answer = 0;
    const matrix = [];
    board.forEach((line) => matrix.push(line.split('')));
    let cntX = 0;
    let cntO = 0; // O의 갯수가 X 이상이여야하며, 이를 어긋난 경우엔 return -1
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (matrix[i][j] === 'O') {
                cntO ++
            } else if (matrix[i][j] === 'X') {
                cntX ++
            }
        }
    }
    if (cntX > cntO) return 0
    if (cntO - cntX > 1) return 0
    
    // 여기서부턴 성공한 이후에도 수행한 경우를 필터링한다.
    // 1행, 2행, 3행, 1열, 2열, 3열, 슬래시, 역슬래시 순으로 확인하는 과정을 거친다.
    let success = []; // 1 보다 큰 성공 횟수가 존재할 수 없다.
    for (let i = 0; i < 3; i ++) {
        const a = matrix[i][0];
        const b = matrix[i][1];
        const c = matrix[i][2];
        if (a !== '.' && a === b && b === c) {
            console.log(a,b,c)
            success.push(a)
        }
    }
    for (let j = 0; j < 3; j++) {
        const a = matrix[0][j];
        const b = matrix[1][j]
        const c = matrix[2][j]
        if (a !== '.' && a === b && b === c) {
            success.push(a)
        }
    }
    
    if (matrix[0][0] !== '.' && matrix[0][0] === matrix[1][1] && matrix[1][1] === matrix[2][2]) {
        success.push(matrix[0][0])
    }
        
    if (matrix[0][2] !== '.' && matrix[0][2] === matrix[1][1] && matrix[1][1] === matrix[2][0]) {
        success.push(matrix[0][2])
    }
    
    if (cntO > cntX) {
        if (success[0] === 'X') return 0
    }
    
    if (success.length >= 2 && success[0] !== success[1]) return 0
    if (success.length >= 1 && success[0] === 'O') {
        if (cntO === cntX + 1) {
            return 1
        }
    }
    if (success.length >= 1 && success[0] === 'X') {
        if (cntO === cntX) return 1
    }
    if (success.length === 0) {
        if (cntO === cntX || cntO - cntX >= 0 && 1 >= cntO - cntX) {
            return 1
        }
    }
    
    return answer;
}