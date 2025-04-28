function timeConvert(time) {
    const [hour, min] = time.split(':').map((numb) => Number(numb));
    return 60 * hour + min
}

function solution(plans) {
    const answer = [];
    
    const sortedPlans = plans.sort((a,b) => {
        return (timeConvert(a[1]) - timeConvert(b[1]))
    })
    
    const stack = [];
    
    for (let i = 0; i < sortedPlans.length-1; i++) {
        let [name, start, time] = sortedPlans[i];
        start = timeConvert(start);
        time = Number(time)
        const nextStart = timeConvert(sortedPlans[i+1][1]);
        let remains = nextStart - start;
        if (remains >= time) {
            // 다음 시간대까지 시간이 충분한 경우 (여유가 있는 경우)
            answer.push(name); // 현 과제 종료
            remains -= time;
            
            // remains남은 것 만큼 남은 업무 진행
            while (remains > 0 && stack.length > 0) {
                const [stackName, stackTime] = stack.pop();
                if (remains >= stackTime) {
                    answer.push(stackName); // 남아있던 것도 완료
                    remains -= stackTime;
                } else {
                    stack.push([stackName, stackTime - remains]) // remains만큼 깎고 다시 push
                    remains = 0
                }
            }
        } else {
            // 다음시간대까지 충분한 여유가 없으면 새로운 과제를 해야함
            stack.push([name, time - remains]) // 해당 이름, 얼마나 시간을 사용했는지 push
        }
    }
    
    answer.push(sortedPlans[sortedPlans.length-1][0]) // 마지막 과제는 무조건 해결
    // 이제 스택들을 순차적으로 처리할시간
    while (stack.length > 0) {
        const nextSub = stack.pop()[0];
        // console.log('why',nextSub)
        answer.push(nextSub)
    }
    
    return answer;
}