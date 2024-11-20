// const input = require('fs').readFileSync('/dev/stdin').toString().split(' ');
let input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');

// javaScript 봄버맨
// R, C, N 모두 200 이하의 수
// 완전 탐색이 유효할 것인가.

let RCN = input.splice(0,1)[0]
RCN = RCN.split(' ').map((number) => Number(number))
input = input.map((str) => (str.split('')))

const matrixMap = new Map()

for (let i = 0; i < RCN[0]; i++ ) {
    for (let j = 0; j < RCN[1]; j++ ) {
        // console.log(input[i][j])
        if (input[i][j] === 'O') {
            // console.log([i,j])
            matrixMap.set(`${i} ${j}`, 2)
        }
    }
}
const endTime = RCN[2];
// 다음의 반복문으로 시간을 보낸다.
const bombCandidate = new Set();
for (let nowTime = 0; nowTime < endTime-1; nowTime++) {
    for (let i = 0; i < RCN[0]; i++) {
        for (let j = 0; j < RCN[1]; j++) {
            // 배열은 참조값을 비교하므로 [0,0] === [0,0] => false 와 같은 상황이 발생할 수 있다.
            matrixMap.has(`${i} ${j}`) ? matrixMap.set(`${i} ${j}`, matrixMap.get(`${i} ${j}`) -1) : matrixMap.set(`${i} ${j}`, 3);
            if (matrixMap.get(`${i} ${j}`) === 0) {
                bombCandidate.add([i,j])
            }
        }
    }
    if (bombCandidate.size !== 0) {
        for (candidate of bombCandidate) {
            const iIndex = candidate[0]
            const jIndex = candidate[1]
            const dirs = [[iIndex, jIndex], [iIndex-1, jIndex], [iIndex+1, jIndex], [iIndex, jIndex-1], [iIndex, jIndex+1]]
            for (dir of dirs) {
                if (dir[0] >= 0 && RCN[0] > dir[0] && dir[1] >= 0 && dir[1] <= RCN[1]) {
                    // 이곳에 matrixMap 에 존재한다면 이 값을 지우는 로직 구현
                    if (matrixMap.has(`${dir[0]} ${dir[1]}`)) {
                        matrixMap.delete(`${dir[0]} ${dir[1]}`)
                    }
                }
            }
        }
        bombCandidate.clear()
    }
}
for (let i = 0; i < RCN[0]; i++ ) {
    for (let j = 0; j < RCN[1]; j++ ) {
        // console.log(input[i][j])
        if (matrixMap.has(`${i} ${j}`)) {
            input[i][j] = 'O'
        } else {
            input[i][j] = '.'
        }
    }
}

for (let i = 0; i < RCN[0]; i++) {
    console.log(input[i].join(''));
}
// console.log('------')

// for (let i = 0; i < RCN[0]; i++ ) {
//     for (let j = 0; j < RCN[1]; j++ ) {
//         // console.log(input[i][j])
//         if (matrixMap.has(`${i} ${j}`)) {
//             input[i][j] = 'O'
//         } else {
//             input[i][j] = '.'
//         }
//     }
// }
//
// for (let i = 0; i < RCN[0]; i++) {
//     console.log(input[i].join(''));
// }
// console.log('------')
