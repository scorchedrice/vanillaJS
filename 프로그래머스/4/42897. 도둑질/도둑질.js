// 집이 굉장히 많음. => 최적화할 수 있는 방법을 찾아야함.
/**
1. 첫번째, 두번째 집을 터는 경우를 나눠 DP 수행
- 이 때 첫번째 집을 터는 경우엔 마지막 집을 털 수 없음.
2. 4번째 집을 털 때, 최대값이 첫번째 + 네번째 인 경우들이 존재함.
- DP로 수행해야함.
3. 첫번째가 800이고 두번째가 0이라면, 모두가 800을 선택할거임. 근데 마지막이 1000으로 0인 곳을 털다가 마지막을 터는게 이득인 경우도 존재함.
- 첫번째를 무조건 터는 경우 + 두번째를 무조건 터는 경우
*/

function solution(money) {
    if (money.length === 3) {
        return Math.max(...money)
    }
    
    const dp1 = [money[0], Math.max(money[0], money[1])];
    const dp2 = [0, money[1]];
    let firstAns = Math.max(...dp1);
    let secondAns = Math.max(...dp2);
    for (let i = 2; i < money.length; i++) {
        if (i !== money.length-1) {
            dp1.push(Math.max(dp1[i-2] + money[i], dp1[i-1]));
            if (Math.max(dp1[i-2] + money[i], dp1[i-1]) > firstAns) firstAns = Math.max(dp1[i-2] + money[i], dp1[i-1])
            dp2.push(Math.max(dp2[i-2] + money[i], dp2[i-1]));
            if (Math.max(dp2[i-2] + money[i], dp2[i-1]) > secondAns) secondAns = Math.max(dp2[i-2] + money[i], dp2[i-1])
        } else {
            dp2.push(Math.max(dp2[i-2] + money[i], dp2[i-1]));
            if (Math.max(dp2[i-2] + money[i], dp2[i-1]) > secondAns) secondAns = Math.max(dp2[i-2] + money[i], dp2[i-1])
        }
    }
    
    return Math.max(firstAns, secondAns);
}