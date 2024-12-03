const targets = [[4,5],[4,8],[10,14],[11,13],[5,12],[3,7],[1,4]]
const shotDownRange = new Map();
// 미사일 발사 위치가 '정수'라는 보장이 없음.
// 따라서 matrix를 사용하기보단, 개구간 s,e를 보고 이를 판단하는 것이 중요
// s와e는 정수로 표현된다. 즉, 0,1 이라면 0.5인 부분을 쏜다 생각하면 계산 편리
// targets의 길이는 500,000
// s와 e의 최대 값은 100,000,000으로 단순 연산으론 구하기 어렵다

// 타겟을 받으면서 즉각즉각 계산이 가능한가?
// 이런식으로 진행해야 범위를 크게 벗어나지 않으면서 연산 가능할 듯
function shotDownRangeFunnel(origin_range, new_range) {
  // 기존 격추 범위, 새로운 격추 범위를 비교하고 겹친다면 true, 아니라면 false도출
  if (origin_range[0] < new_range[0] < origin_range[1] || origin_range[0] < new_range[0] < origin_range[1]) {
    let a;
    let b;
    if (origin_range[0] < new_range[0]) {
      a = new_range[0];
    } else {
      a = new_range[1];
    }
    if (origin_range[1] > new_range[1]) {
      b = new_range[1];
    } else {
      b = origin_range[1];
    }
    return [a,b]
  }
  return false
}

function shotDownRangeUpdate(origin_range, type, answer) {
  // funnel함수가 true라면 해당 값을 update하는 과정을 거치고
  // false라면 새로운 값을 더하는 과정을 진행한다.
  if (type !== false) {
    for ([key, value] of shotDownRange.entries()) {
      if (value === origin_range) {
        shotDownRange.set(key, type)
        return;
      }
    }
  }
  shotDownRange.set(answer+1, )
}

function solution(targets) {
  var answer = 1;
  shotDownRange.set(1,targets[0]);
  for (let targetIndex = 1; targetIndex < targets.length; targetIndex ++) {
    const test = shotDownRangeUpdate(targets[0],[1,1], answer);
  }
  return answer;
}

solution(targets)