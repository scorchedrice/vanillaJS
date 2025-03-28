// const input = require('fs').readFileSync('/dev/stdin').toString().split(' ');
let input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const [N, C] = input.splice(0,1)[0].split(' ').map((numb) => parseInt(numb));

const matrix = [...input].map(num => Number(num)).sort((a,b) => a - b);
let start = 1;
let end = matrix[matrix.length-1] - matrix[0];
let cnt = 0;
while (true) {
    if (start > end) {
        console.log(end)
        break
    }
    const mid = Math.floor((end + start) / 2);
    // mid에 해당하는 거리의 집들에 공유기를 설치할 수 있느냐
    let setCnt = 1;
    let prev = matrix[0];
    for (let i = 1; i < matrix.length; i++) {
        if (matrix[i] - prev >= mid) {
            setCnt ++;
            prev = matrix[i];
        }
        if (setCnt >= C) {
            break;
        }
    }
    if (setCnt >= C) {
        start = mid + 1;
    } else {
        end = mid - 1;
    }
    cnt ++
}