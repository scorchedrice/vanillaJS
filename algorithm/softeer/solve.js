const readline = require('readline');
const rl = readline.createInterface({
  input : process.stdin,
  output : process.stdout,
});


const inputData = [];
rl.on('line', input => {
  inputData.push(input)
})

rl.on('close', () => {
  // n,m => matrix size
  const [n,m] = inputData.shift().split(' ').map(Number);
  let matrix = inputData.splice(0,n).map((line) => line.split(' ').map(Number));
  // 공격 명령을 index에 맞게 변환
  const attackOrder = inputData.map((ord) => ord.split(' ').map((num) => Number(num) - 1));
  // 공격 명령 리스트 길이만큼 공격 진행.
  //console.log('before attack')
  //console.log(matrix)
  for (attack of attackOrder) {
    // 요정들의 정보를 담는 hashMap 초기셋팅과정
    const flyInfo = new Map();
    for (let i = attack[0]; i <= attack[1]; i++) {
      flyInfo.set(i, 1)
    }
    // 0열부터 공격 진행
    for (let j = 0; j < m; j++) {
      for (let i = attack[0]; i <= attack[1]; i++) {
        if (flyInfo.get(i) === 1 && matrix[i][j] === 1) {
          matrix[i][j] = 0
          flyInfo.set(i,0)
        }
      }
    }
  }
  //console.log('after attack')
  //console.log(matrix)
  let ans = 0;
  for (let i = 0; i < n; i ++) {
    for (let j = 0; j < m; j++) {
      if (matrix[i][j] === 1) {
        ans ++
      }
    }
  }
  console.log(ans)
  process.exit();
})