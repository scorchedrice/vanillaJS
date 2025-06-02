function solution(n, q, ans) {
    // var answer = 0;
    // n은 30 이하, 10 이상
    // 길이는 10 이하 (반복 돌릴만함)
    // q[i]는 길이 5로 고정 => 가장 큰 경우의 수도 10임. 5C2
    const allSet = new Set();
    const pivot = [];
    for (let i = 1; i < n+1; i++) {
        pivot.push(i)
    }
    const pick = 5;
    
    function dfs(lst, current) {
        if (lst.length === pick) {
            allSet.add(lst)
            return
        }
        if (current >= n) {
            return
        }
        const nextlst = [...lst];
        nextlst.push(pivot[current])
        dfs(lst, current+1, pick)
        dfs(nextlst, current+1, pick)
    }
    
    dfs([], 0);
    const allSetArray = Array.from(allSet);
    let answerCandidate = 0;
    for (candidate of allSetArray) {
        let qCnt = 0;
        for (let i = 0; i < q.length; i ++) {
            let cnt = 0;
            for (let j = 0; j < 5; j++) {
                if (candidate.includes(q[i][j])) {
                    cnt ++
                }
                if (cnt > ans[i]) {
                    break
                }
                if (j === 4 && cnt === ans[i]) {
                    qCnt ++
                }
            }
        }
        if (qCnt === q.length) {
            answerCandidate ++
            // console.log(qCnt, candidate)
        }
    }
    
    
    return answerCandidate;
}