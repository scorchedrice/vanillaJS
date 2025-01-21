function solution(triangle) {
    let answer = 0;
    const bottomLayer = triangle.length - 1
    const dp = [...triangle]
    
    for (let i = triangle.length - 2; i >= 0; i--) {
        for (let j = 0; j < dp[i].length; j++) {
            dp[i][j] += Math.max(dp[i+1][j+1], dp[i+1][j])
        }
    }
    
    answer = dp[0][0]

    return answer;
}