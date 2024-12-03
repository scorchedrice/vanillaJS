// const input = require('fs').readFileSync('/dev/stdin').toString().split(' ');
let input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');

const N = Number(input.shift());
const [A, Pa, B, Pb] = input[0].split(' ').map(Number);

let maxPower = 0;
let maxX = 0;
let maxY = 0;

for (let x = 0; x <= Math.floor(N/Pa); x++) {
    const y = Math.floor((N-x * Pa) / Pb);
    if (maxPower < A*x + B*y) {
        maxX = x;
        maxY = y;
        maxPower = A*x + B*y;
    }
}
// console.log(maxPower)
console.log(maxX, maxY)