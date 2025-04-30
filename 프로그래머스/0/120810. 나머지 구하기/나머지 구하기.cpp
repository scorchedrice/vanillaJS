#include <string>
#include <vector>
#include <cmath>

using namespace std;

int solution(int num1, int num2) {
    int answer = -1;
    answer = num1 - num2*floor(num1/num2);
    return answer;
}