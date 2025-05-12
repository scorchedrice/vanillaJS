function solution(routes) {
    var answer = 0;
    let matrix = [...routes];
    matrix.sort((a,b) => a[1]-b[1])
    while (matrix.length) {
        const pivot = matrix[0];
        const pivotStart = pivot[0];
        const pivotEnd = pivot[1];
        const hello = [0];
        const newMatrix = [];
        for (let i = 1; i < matrix.length; i++) {
            if (pivotEnd >= matrix[i][0]) {
                hello.push(i)
            } else {
                newMatrix.push(matrix[i])
            }
        }
        matrix = [...newMatrix]
        answer ++
    }
    return answer;
}