function solution(n, w, num) {
    let answer = 0;
    const boxLayer = [];
    const lastLayer = Math.ceil(n/w);
    
    let firstBox = 1;
    
    for (let i = 0; i < lastLayer; i++) {
        let line = [];
        for (let j = firstBox; j < firstBox + w; j++) {
            if (j <= n) {
                line.push(j)    
            }
        }
        firstBox += w;
        
        if (i / 2 === Math.floor(i/2)) {
             const memory = [];
            if (line.length !== w) {
                for (let k = 0; k < w - line.length; k++) {
                    memory.push(0)
                }
            }
            boxLayer.push([...line, ...memory])
        } else {
            const memory = [];
            if (line.length !== w) {
                for (let k = 0; k < w - line.length; k++) {
                    memory.push(0)
                }
            }
            line.sort((a, b) => b-a)
            boxLayer.push([...memory, ...line])
        }
    }
    
    function findIndex(numb) {
        for (let i = 0;  i < lastLayer; i++) {
            for (let j = 0; j < w; j++) {
                if (boxLayer[i][j] === numb) {
                    return [i, j]
                }
            }
        }
    }
    
    const targetBox = findIndex(num)
    console.log(boxLayer)
    
    if (boxLayer[lastLayer-1][targetBox[1]] === 0) {
        return lastLayer - targetBox[0] - 1
    } else {
        return lastLayer - targetBox[0]
    }
    
    return answer;
}