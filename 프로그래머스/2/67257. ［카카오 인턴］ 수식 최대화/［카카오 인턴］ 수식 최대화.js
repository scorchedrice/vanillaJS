// 이건 연산자의 종류를 판단하는 것.
const expSet = new Set()

function divideExp(exp) {
    // exp가 들어오면 사칙연산 (-, +, /, *)들을 기준으로 split 시키는 함수
    let numb = ""
    let ans = []
    for (word of exp) {
        if (word === '-' || word === '+' || word === '*') {
            ans.push(parseInt(numb))
            numb = ""
            ans.push(word)
            expSet.add(word)
        } else {
            numb = numb + word
        }
    }
    ans.push(parseInt(numb))
    return ans
}

function sortExp(t) {
    if (t.length === 3) {
        return [[t[0],t[1], t[2]],[t[0], t[2], t[1]],[t[1], t[0], t[2]],[t[1], t[2], t[0]],[t[2], t[0], t[1]],[t[2], t[1], t[0]]]
    } else if (t.length === 2) {
        return [[t[0], t[1]], [t[1], t[0]]]
    } else {
        return [[t[0]]]
    }
}

function calculator(typeExp, exp) {
    // console.log(exp)
    // 스택 사용
    const ans = []
    let idx = 0;
    while (idx < exp.length) {
        if (typeof exp[idx] === 'number') {
            ans.push(exp[idx])
            idx ++
        } else {
            const mid = exp[idx]
            const end = exp[idx+1]
            if (typeExp === '-' && mid === '-') {
                const front = ans.pop()
                ans.push(front - end)
                idx += 2
            } else if (typeExp === '+' && mid === '+') {
                const front = ans.pop()
                ans.push(front + end)
                idx += 2
            } else if (typeExp === '*' && mid === '*') {
                const front = ans.pop()
                ans.push(front * end)
                idx += 2
            } else {
                ans.push(mid)
                ans.push(end)
                idx += 2
            }
        }
        if (idx >= exp.length) break
    }
    return ans
}

function solution(exp) {
    const dividedExp = divideExp(exp)
    // 식을 쪼개는 것 까지 진행했으니 길이가 1이 될 때 까지 연산을 하자.
    const typeOfExp = Array.from(expSet.values())
    const sorted = sortExp(typeOfExp)
    
    let mxVal = -987654321;
    for (comb of sorted) {
        let copyOfdividedExp = [...dividedExp]
        for (word of comb) {
            copyOfdividedExp = calculator(word, copyOfdividedExp)
        }
        if (Math.abs(copyOfdividedExp[0]) > mxVal) {
            mxVal = Math.abs(copyOfdividedExp[0])
        }
    }
    
    return mxVal;
}