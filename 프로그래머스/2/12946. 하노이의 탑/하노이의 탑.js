let hanois = [[[1,3]], [[1,2], [1,3], [2,3]]]

// 3을 향해 쌓는 탑을 2로 쌓도록 변형시키는 함수
function convertFirst(prev) {
    // 시작지점 1 => 1
    // 도착지점 3 => 2
    const returnValue = []
    for (move of prev) {
        const memory = []
        if (move[0] === 3) {
            memory.push(2)
        } else if (move[0] === 2) {
            memory.push(3)
        } else {
            memory.push(1)
        }
        
        if (move[1] === 3) {
            memory.push(2)
        } else if (move[1] === 2) {
            memory.push(3)
        } else {
            memory.push(1)
        }
        returnValue.push(memory)
    }
    return returnValue 
}

// 3을 향하는 탑을 쌓는 함수 (단 시작지점이 2가 되어야한다.)
function convertSecond(prev) {
    // 시작지점 1 => 2
    const returnValue = []
    for (move of prev) {
        const memory = []
        if (move[0] === 3) {
            memory.push(3)
        } else if (move[0] === 2) {
            memory.push(1)
        } else {
            memory.push(2)
        }
        
        if (move[1] === 3) {
            memory.push(3)
        } else if (move[1] === 2) {
            memory.push(1)
        } else {
            memory.push(2)
        }
        returnValue.push(memory)
    }
    return returnValue
}

function converter(n) {
    const prev = hanois[n-2]
    const firstStep = convertFirst(prev)
    const secondStep = [1,3]
    const thirdStep = convertSecond(prev)
    const ans = []
    ans.push(...firstStep)
    ans.push(secondStep)
    ans.push(...thirdStep)
    return ans
}

function setMatrix() {
    for (let i = 3; i < 16; i++) {
        hanois.push(converter(i))
    }
}

function solution(n) {
    var answer = [[]];
    setMatrix();
    // console.log(hanois[4])
    answer = hanois[n-1]
    return answer;
}