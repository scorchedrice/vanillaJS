// 유효한지, 유효하지 않다면 UV로 분리
function divideUV(str) {
    let numb = 0;
    let isFirst = true;
    let isFinish = false;
    let isMinus = false;
    let U = ""
    let V = ""
    for (word of str) {
        if (isFinish && word === "(") {
            V += word
            numb ++ 
        } else if (isFinish && word === ")") {
            V += word
            numb --
        } else if (word === "(") {
            numb ++
            U += word
        } else {
            numb --
            U += word
        }
        
        if (numb < 0) isMinus = true
        if (isFirst) {
            isFirst = false
        } else {
            if (numb === 0) isFinish = true;
        }
    }
    if (isMinus === false) return [true, true]
    return [U,V]
}

function checkValid(str) {
    let numb = 0;
    for (word of str) {
        if (word === "(") {
            numb ++
        } else {
            numb --
            if (numb < 0) return false
        }
    }
    return true
}

function solution(p) {
    var answer = '';
    
    // 1. 입력이 빈 문자열인 경우
    if (p === "") return ""
    
    // 2. 균형잡힌 괄호 문자열 u,v로 분리
    // 그 와중에 그냥 바꿀 필요가 없는 경우는 true를 반환하기에 그냥 그 값을 반환
    let [u,v] = divideUV(p)
    if (u === true && v === true) {
        return p
    }
    if (!checkValid(u)) {
        let str = ""
        str += "(" + solution(v) + ")"
        for (let i = 1; i < u.length - 1; i++) {
            if (u[i] === "(") str += ")"
            if (u[i] === ")") str += "("
        }
        return str
    } else {
        return u + solution(v)
    }
    
    
    // return answer;
}