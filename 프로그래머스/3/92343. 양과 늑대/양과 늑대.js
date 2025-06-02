function solution(info, edges) {
  const tree = Array.from({ length: info.length }, () => []);
  for (const [from, to] of edges) {
    tree[from].push(to);
  }

  let maxSheep = 0;

  function dfs(sheep, wolf, current, next) {
    if (info[current] === 0) sheep++;
    else wolf++;

    if (wolf >= sheep) return; // 게임 오버
    maxSheep = Math.max(maxSheep, sheep);

    const candidates = [...next];
    // 현재 노드에서 갈 수 있는 자식들 추가
    for (const child of tree[current]) {
      candidates.push(child);
    }

    // 다음으로 갈 수 있는 후보 중 하나씩 선택해서 탐색
    for (let i = 0; i < candidates.length; i++) {
      const nextNode = candidates[i];
      const newNext = candidates.filter((_, idx) => idx !== i);
      dfs(sheep, wolf, nextNode, newNext);
    }
  }

  dfs(0, 0, 0, []);
  return maxSheep;
}
