#include <string>
#include <vector>
#include <set>

using namespace std;

vector<int> solution(vector<int> numbers) {
    vector<int> answer;
    set<int> s;
    
    for (int i = 0; i < numbers.size(); i++) {
        for (int j = 0; j < numbers.size(); j++) {
            if (i == j) continue;
            s.insert(numbers[i] + numbers[j]);
        }
    }
    
    for (int x : s) {
        answer.push_back(x);
    }
    
    return answer;
}