// const input = require('fs').readFileSync('/dev/stdin').toString().split(' ');
let input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const N = parseInt(input[0]);
if (N === 1) {
    console.log(10);
    return;
};

const NMap = new Map();
NMap.set(1, [1,1,1,1,1,1,1,1,1,1]);

function getSum(nValue) {
    const pivot = NMap.get(nValue-1);
    const returnArr = [];
    for (let i = 0; i < 10; i++) {
        let memory = 0;
        for (let j = i; j < 10; j++) {
            memory += pivot[j];
        }
        returnArr.push(memory % 10007)
    }
    NMap.set(nValue, returnArr);
    return returnArr;
}

for (let i = 2; i <= N; i++) {
    getSum(i);
}

const returnValue = NMap.get(N);
let answer = 0;
for (let i = 0; i < 10; i++) {
    answer = answer + returnValue[i];
}
answer = answer % 10007;
console.log(answer)
