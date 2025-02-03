function solution(s) {
    const newS = s.slice(2, s.length - 2).split('},{')
    const cntMap = new Map();
    
    for (tuple of newS) {
        const tupleList = tuple.split(',').map((a) => parseInt(a))
        for (numb of tupleList) {
            if (cntMap.has(numb)) {
                cntMap.set(numb, cntMap.get(numb) + 1)
            } else {
                cntMap.set(numb, 1)
            }
        }
    }
    
    const cntValue = [...cntMap.entries()]
    
    cntValue.sort((a,b) => b[1] - a[1])

    const answer = [];
    for (value of cntValue) {
        answer.push(value[0])
    }
    return answer;
}