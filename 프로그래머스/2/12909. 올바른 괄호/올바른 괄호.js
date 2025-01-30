function solution(s){
    var answer = true;
    
    let pivot = 0;
    
    for (word of s) {
       if (word === "(") {
           pivot ++
       } else {
           pivot -= 1
       }
        
        if (pivot < 0) {
            return false
        }
    }
    
    if (pivot !== 0)
        return false

    return answer;
}