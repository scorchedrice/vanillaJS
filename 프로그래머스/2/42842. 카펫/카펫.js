// function divideNumber(brown, yellow) {
//     let pivot = brown + yellow;
//     const returnValue = [];
//     while (pivot !== 1) {
//         for (let i = 2; i < brown + yellow; i++) {
//             if (pivot % i === 0) {
//                 pivot = pivot / i
//                 returnValue.push(i)
//                 break
//             }
//         }
//     }
//     return returnValue
// }

function painting(brown, yellow) {
    // 노란색이 한줄일때, 두줄일때 ... 이런식으로 증가
    // 이 때 둘러싸는 brown이 갯수가 유효? return
    for (let i = 1; i <= yellow; i++) {
        if (yellow % i === 0) {
            const c = yellow / i
            console.log(c,i)
            if (i * 2 + c * 2 + 4 === brown) return [c+2, i+2]
        }
    }
}

function solution(brown, yellow) {
    var answer = [];
    answer = painting(brown, yellow)
    return answer;
}