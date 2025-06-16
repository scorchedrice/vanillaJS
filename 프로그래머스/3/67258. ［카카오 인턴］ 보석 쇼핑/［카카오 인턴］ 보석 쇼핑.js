function solution(gems) {
    var answer = [];
    // gem의 종류 개수
    const gemTypes = new Set(gems)
    
    // 우선 초기값 셋팅이 필요함.
    let front = 0
    let end = 0
    let cntMin = gems.length
    const gemMap = new Map()
    
    // 1. end값을 증가시키며 시작지점을 찾는다.
    // 시작지점은 gemType의 개수와 map에 등록한 것의 개수가 동일한 최초의 상황이다.
    while (end < gems.length) {
        if (gemMap.has(gems[end])) {
            gemMap.set(gems[end], gemMap.get(gems[end]) + 1)
        } else {
            gemMap.set(gems[end], 1)
        }
        if (gemMap.size === gemTypes.size) break
        end ++
    }
    console.log(front, end)
    cntMin = end - front + 1
    if (cntMin === gemTypes.size) {
        answer = [front + 1, end + 1]
        return answer
    }
    answer = [front + 1, end + 1]
    
    // 2. 이후 front와 end를 이동시키며 최적의 값을 판단해야한다.
    // front를 한칸 앞당긴 이후 더 짧은 길이의 경우에서 충족하는 경우가 있는지 판단한다.
    // 2.1 front를 당겨도 gemTypes.size === gemMap.size ? front하나 더 당겨
    // 해당 값이 1 이상이라면 빠져도 이상 없으니까!
    while (true) {
        while (true) {
            if (gemMap.get(gems[front]) > 1) {
                gemMap.set(gems[front], gemMap.get(gems[front]) -1)
                front ++
            } else {
                break
            }
        }
        if (cntMin > (end - front + 1)) {
            cntMin = end - front + 1
            answer = [front + 1, end + 1]
        }
        if (end+1 === gems.length) {
            break
        }
        end ++
        gemMap.set(gems[end], gemMap.get(gems[end]) + 1)
    }
        
    console.log(front, end)
        
    
    return answer;
}