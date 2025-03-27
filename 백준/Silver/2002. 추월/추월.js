// const input = require('fs').readFileSync('/dev/stdin').toString().split(' ');
let input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const n = parseInt(input.splice(0,1));
const enterCars = input.splice(0,n);
const outCars = input.splice(0,n);

// 터널 내부는 추월도, 차선변경도금지임.
// 들어간 순서보다 앞에있는 모든것들이 추월차량아님?
// 추월을 당하면 뒤로 밀리면 밀렸지 앞으로 갈 수가 없음.

const enterMap = new Map();
const outMap = new Map();
for (let i = 0; i < n; i++) {
    enterMap.set(enterCars[i], i);
}

for (let i = 0; i < n; i++) {
    outMap.set(outCars[i], enterMap.get(outCars[i]));
}

let answer = 0;

for (let i = 0; i < n-1; i++) {
    for (let j = i+1; j < n; j++) {
        if (outMap.get(outCars[i]) > outMap.get(outCars[j])) {
            answer ++
            // console.log(outCars[i])
            break
        }
    }
}
console.log(answer)