function solution(A,B){
    var answer = 0;
    const sortedA = A.sort((a,b) => a-b)
    const sortedB = B.sort((a,b) => a-b)
    for (let i = 0; i < A.length; i++) {
        answer += sortedA[i] * sortedB[A.length - i - 1]
    }
    return answer;
}