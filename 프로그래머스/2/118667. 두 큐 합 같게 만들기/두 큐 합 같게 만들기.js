class Queue {
    constructor() {
        this.qObj = new Map();
        this.front = 0;
        this.back = -1;
    }
    
    push(element) {
        this.back++
        this.qObj.set(this.back, element);
    }
    
    length() {
        return this.back - this.front + 1
    }
    
    popleft() {
        const returnValue = this.qObj.get(this.front)
        this.qObj.delete(this.front)
        this.front ++
        return returnValue;
    }
    
    init(elements) {
        for (const element of elements) {
            this.back ++
            this.qObj.set(this.back, element)
        }
    }
    
    queue() {
        return this.qObj
    }
}

function solution(queue1, queue2) {
    var answer = 0;
    let sum1 = 0;
    let sum2 = 0;
    for (const ele1 of queue1) {sum1 += ele1}
    for (const ele2 of queue2) {sum2 += ele2}
    const target = parseInt((sum1 + sum2) / 2)
    if (2 * target !== sum1 + sum2) {
        answer = -1
        return answer
    }
    const q1 = new Queue()
    const q2 = new Queue()
    q1.init(queue1)
    q2.init(queue2)
    // q1의 총 합이 target보다 크면 뺀다.
    // q2의 총 합이 target보다 작다면 q2에서 하나를 가져온다.
    // 단, 둘 중 하나의 사이즈가 1이 되었는데도 거기서도 하나 더 빼려는 상황이 나온다? 그러면 불가능한 상황으로 판단.
    while (true) {
        if (sum1 > target) {
            answer ++
            const q1PopleftValue = q1.popleft()
            sum1 -= q1PopleftValue;
            sum2 += q1PopleftValue;
            q2.push(q1PopleftValue);
        } else if (sum1 === target) {
            break
        } else {
            answer ++
            const q2PopleftValue = q2.popleft()
            sum1 += q2PopleftValue;
            sum2 -= q2PopleftValue;
            q1.push(q2PopleftValue);
        }
        if (q1.length() === 0 || q1.length() === 0) {
            answer = -1
            break
        }
        if (answer > queue1.length * 4) {
            return -1
        }
    }
    
    return answer;
}