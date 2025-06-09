// const input = require('fs').readFileSync('/dev/stdin').toString().split(' ');
let input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

const n = parseInt(input.splice(0,1)[0]);

// 하나하나 카운트하면 시간초과 (2^31)

const sorted = input.map((item) => item.split(" ")).map((a) => [Number(a[0]), Number(a[1])]).sort((x,y) => x[1]-y[1]||x[0]-y[0])

let prev = 0;
let answer = 0;

for (let i = 0; i < sorted.length; i++) {
  const target = sorted[i];
  const targetStart = target[0];
  const targetEnd = target[1];
  if (prev <= targetStart) {
    prev = targetEnd
    answer ++
  }
}

console.log(answer);