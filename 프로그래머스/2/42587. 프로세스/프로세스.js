class Queue {
    constructor() {
        this.qObj = new Map()
        this.front = 0
        this.back = -1
    }
    
    push(element) {
        this.back ++
        this.qObj.set(this.back, element)
    }
    
    popleft() {
        const returnValue = this.qObj.get(this.front)
        this.front ++
        return returnValue
    }
    
    size() {
        return this.back - this.front + 1
    }
}

function solution(priorities, location) {
    var answer = 0;
    const pObj = new Map()
    const q = new Queue()
    
    // 1. 초기설정
    for (let i = 0; i < priorities.length; i++) {
        if (i === location) {
            q.push([priorities[i], true])
        } else {
            q.push([priorities[i], false])
        }
        if (pObj.has(priorities[i])) {
            pObj.set(priorities[i], pObj.get(priorities[i]) + 1)
        } else {
            pObj.set(priorities[i], 1)
        }
    }
    // console.log(q,pObj)
    // console.log(Array.from(pObj.keys()).sort((a,b) => b - a))
    
    // 2. 반복의 시작
    let rank = 1;
    while (true) {
        const popleftValue = q.popleft()
        const MaxPrior = Array.from(pObj.keys()).sort((a,b) => b - a)[0]
        // 2-1. 우선순위가 높으며, 내가 알고자하는 값이면
        if (popleftValue[0] === MaxPrior && popleftValue[1] === true) {
                // console.log(rank)
                return rank
        } else if (popleftValue[0] === MaxPrior) {
         // 2-2. 우선순위가 높은데, 내가 알고자하는 값은 아니라면
            rank ++
            pObj.set(MaxPrior, pObj.get(MaxPrior) - 1)
            if (pObj.get(MaxPrior) === 0) {
                pObj.delete(MaxPrior)
            }
        } else {
            q.push(popleftValue)
        }
    }
    return answer;
}