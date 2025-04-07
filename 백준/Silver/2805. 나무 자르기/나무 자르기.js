// const input = require('fs').readFileSync('/dev/stdin').toString().split(' ');
let input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const [N,M] = input.splice(0,1)[0].split(' ').map(numb => Number(numb));
let start = 0;
let end = -1;
const trees = input[0].split(' ').map(numb => Number(numb));
trees.forEach((numb) => {
    if (end < numb) {
        end = numb
    }
})
let mid;
let result = 0;
while (end >= start) {
    mid = Math.floor(0.5 * (start + end));
    // console.log(start, end, mid)
    let sumOfTrees = 0;
    for (tree of trees) {
        const diff = tree - mid;
        if (diff > 0) {
            sumOfTrees += diff;
        }
    }
    // console.log('sumOfTrees', sumOfTrees)
    if (M <= sumOfTrees) {
        if (mid > result) {
            result = mid;
        }
    }
    if (sumOfTrees >= M) {
        start = mid + 1;
    } else {
        end = mid - 1;
    }
}
console.log(result)