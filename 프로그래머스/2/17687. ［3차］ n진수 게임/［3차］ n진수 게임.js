function numbConverter(word) {
    if (word === 'a') return 'A'
    if (word === 'b') return 'B'
    if (word === 'c') return 'C'
    if (word === 'd') return 'D'
    if (word === 'e') return 'E'
    if (word === 'f') return 'F'
    return word
}

function solution(n, t, m, p) {
    // n : 진법
    // t : 미리 구해야하는 숫자의 개수
    // m : 인원
    // p : 나의 순서
    var answer = ""
    
    // 순서를 의미하는 변수로, 참여하는 인원 + 1과 ord과 동일해지면 ord를 1로 초기화하는 로직을 구현해야한다.
    // 또 ord와 p가 동일하다면 answer에 값을 넣어야한다.
    let ord = 1;
    
    // 진행되고 있는 숫자이다. 이를 변환하여 연산을 진행한다.
    let numb = 0;
    
    // 정답의 길이가 t 만큼 된다면 반복문이 종료되도록 한다.
    while (true) {
        // 주어진 진법으로 변환한 값
        const convertNumb = numb.toString(n)
        
        for (word of convertNumb) {
            if (ord === p) {
                answer += (numbConverter(word))
                if (answer.length === t) return answer
            }
            // ord + 혹은 초기화 작업
            ord ++
            if (ord === m+1) {
                ord = 1
            }
        }
        
        numb ++
    }
    
    return answer;
}