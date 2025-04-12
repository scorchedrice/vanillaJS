/**
* 1, 2, 4  .. 누적합을 따라야함.
* 그리고 root는 항상 차있어야하므로 중앙값은 1이여야함.
* 또, 우측에 0을 더할 순 없음. 그러면 자릿수가 달라져 숫자가 달라짐.
* 그리고 길이가 길어졌을 때, 부모가 없는데 자식이 차있는 경우와 같은 케이스를 방지해야함.
*/
function convertBinary(binaryNumber) {
    const pivot = Math.log2(binaryNumber.length+1)
    if (pivot === Math.floor(pivot)) {
        return binaryNumber
    } else {
        let returnValue = binaryNumber;
        while (Math.log2(returnValue.length+1) !== Math.floor(Math.log2(returnValue.length+1))) {
            returnValue = "0" + returnValue
        }
        return returnValue
    }
}

function checkValid(binaryNumber, start, end) {
    const mid = Math.floor((start + end) / 2);
    const leftChild = Math.floor((start + mid - 1) / 2);
    const rightChild = Math.floor((mid + 1 + end) / 2);
    
    if (start >= end) {
        return true
    }
    
    if (binaryNumber[mid] === '0') {
        if (binaryNumber[leftChild] === '1' || binaryNumber[rightChild] === '1') {
            return false
        }
    }
    // 좌측 자식트리, 우측 자식트리 순차확인
    if (!checkValid(binaryNumber, start, mid-1)) return false;
    if (!checkValid(binaryNumber, mid+1, end)) return false;
    return true;
}

function solution(numbers) {
    const answer = [];
    let convertedBinaryNumber;
    for (number of numbers) {
        const binaryNumber = number.toString(2);
        convertedBinaryNumber = convertBinary(binaryNumber)
        const mid = Math.ceil(convertedBinaryNumber.length / 2)-1
        if (convertedBinaryNumber[mid] === "0") {
            answer.push(0);
        } else {
            // 유효한 트리구조인지 판단하는 로직이 들어가야한다.
            if (checkValid(convertedBinaryNumber, 0, convertedBinaryNumber.length-1)) {
                answer.push(1);
            } else {
                answer.push(0);
            }
        }
    }
    
    return answer;
}