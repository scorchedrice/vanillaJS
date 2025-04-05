// const input = require('fs').readFileSync('/dev/stdin').toString().split(' ');
let input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = input.splice(0,1)[0].split(' ').map((numb) => Number(numb));

const matrix = [];
let end = -1;
let start = 1;

for (let i = 0; i < N; i++) {
    const target = Number(input[i])
    if (input[i] > end) {
        end = target;
    }
    matrix.push(target)
}
let result = -1;
while (end >= start) {
    const mid = Math.floor(0.5 * (start + end));
    // console.log('mid!', mid, 'start and end', start, end)
    let ans = 0;
    for (num of matrix) {
        ans += Math.floor(num / mid);
        // ans가 크게 나온다 => 너무 잘게 쪼갰다. => 크기를 키워야한다.
    }
    // ans가 M보다 작은 숫자이다. => 더 작아져야한다 사이즈가.
    if (ans < M) {
        end = mid - 1;
    } else if (ans >= M) {
        // 갯수가 더 크다면, 각각의 사이즈를 키워볼 시도를 해야한다.
        // 그리고 일단 저장을 해둔다.
        start = mid+1;
        result = mid;
    }

}
console.log(result);