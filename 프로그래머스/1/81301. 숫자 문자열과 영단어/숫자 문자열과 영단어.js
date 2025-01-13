const numberObject = {
    zero : 0,
    one : 1,
    two : 2,
    three : 3,
    four : 4,
    five : 5,
    six : 6,
    seven : 7,
    eight : 8,
    nine : 9,
}

function solution(s) {
    var answer = 0;
    let newS = s;
    for ([a, b] of Object.entries(numberObject)) {
        newS = newS.replaceAll(a,b)
    }
    answer = parseInt(newS)
    return answer;
}