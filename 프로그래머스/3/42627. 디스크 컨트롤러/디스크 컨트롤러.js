// 우선순위 순서
// 1. 작업 소요시간이 짧은 것 
// 2. 작업의 요청 시각이 빠른 것
// 3. 작업의 번호가 작은 것

class MinHeap {
    constructor() {
        this.pq = [null];
        // pq는 [[소요시간, 요청시각, 번호]...] 형태로 저장될거임.
    }
    swap(a,b) {
        [this.pq[a], this.pq[b]] = [this.pq[b], this.pq[a]];
    }
    insert(work) {
        this.pq.push(work) // 일단 작업을 pq에 삽입
        // 여기서부터 부모 노드와 비교하며 진행해야함.
        let currentIndex = this.pq.length-1;
        let parentIndex = Math.floor(currentIndex/2);
        while (true) {
            if (parentIndex < 1) {
                return;
            }
            if (this.pq[parentIndex][0] > this.pq[currentIndex][0]) {
                // 첫번째 우선순위 기준인, 소요시간을 비교했을 때 바꿔야하는 이유가 있다면 swap
                this.swap(parentIndex, currentIndex);
                currentIndex = parentIndex;
                parentIndex = Math.floor(currentIndex/2);
            } else if (this.pq[parentIndex][0] === this.pq[currentIndex][0]
                        && this.pq[parentIndex][1] > this.pq[currentIndex][1]
                      ) {
                // 두번째 우선순위 (첫번째가 동점인 경우에 진행함)
                this.swap(parentIndex, currentIndex);
                currentIndex = parentIndex;
                parentIndex = Math.floor(currentIndex/2);
            } else if (this.pq[parentIndex][0] === this.pq[currentIndex][0]
                        && this.pq[parentIndex][1] === this.pq[currentIndex][1]
                        && this.pq[parentIndex][2] > this.pq[currentIndex][2]
                      ) {
                // 세번째 우선순위 (첫번째, 두번째가 동률인 경우 비교한다.
                this.swap(parentIndex, currentIndex);
                currentIndex = parentIndex;
                parentIndex = Math.floor(currentIndex/2);
            } else {
                return // 위의 조건을 뛰어 넘었다 => 바꿀 필요가 없다 => 현 위치
            }
        }
    }
    popleft() {
        if (this.pq.length === 1) {
            return
        } else if (this.pq.length === 2) {
            return this.pq.pop();
        }
        const returnValue = this.pq[1];
        this.pq[1] = this.pq.pop(); // 마지막 항목 임의로 상단 배치
        let currentIndex = 1;
        let leftChildIndex = 2;
        let rightChildIndex = 3;
        while (rightChildIndex < this.pq.length && leftChildIndex < this.pq.length) {
            if (this.pq[currentIndex][0] > this.pq[leftChildIndex][0] ||
                this.pq[currentIndex][0] > this.pq[rightChildIndex][0]
               ) {
                // 자식노드보다 현 위치 노드 소요시간이 더 길다면 우선순위가 밀려야함.
                if (this.pq[leftChildIndex][0] < this.pq[rightChildIndex][0]) {
                    // 우측 노드의 소요시간이 더 길다면, 우선순위가 더 높은것은 좌측임
                    this.swap(leftChildIndex, currentIndex);
                    currentIndex = leftChildIndex;
                    leftChildIndex = currentIndex * 2;
                    rightChildIndex = leftChildIndex + 1;
                } else {
                    this.swap(rightChildIndex, currentIndex);
                    currentIndex = rightChildIndex;
                    leftChildIndex = currentIndex * 2;
                    rightChildIndex = leftChildIndex + 1;
                }
            } else if (this.pq[currentIndex][0] === this.pq[leftChildIndex][0] &&
                        this.pq[currentIndex][0] === this.pq[rightChildIndex][0] &&
                        (this.pq[currentIndex][1] > this.pq[leftChildIndex][1] ||
                        this.pq[currentIndex][1] > this.pq[rightChildIndex][1])
                      ) {
                if (this.pq[leftChildIndex][1] < this.pq[rightChildIndex][1]) {
                    // 우측 노드의 소요시간이 더 길다면, 우선순위가 더 높은것은 좌측임
                    this.swap(leftChildIndex, currentIndex);
                    currentIndex = leftChildIndex;
                    leftChildIndex = currentIndex * 2;
                    rightChildIndex = leftChildIndex + 1;
                } else {
                    this.swap(rightChildIndex, currentIndex);
                    currentIndex = rightChildIndex;
                    leftChildIndex = currentIndex * 2;
                    rightChildIndex = leftChildIndex + 1;
                }
            } else if (this.pq[currentIndex][0] === this.pq[leftChildIndex][0] &&
                        this.pq[currentIndex][0] === this.pq[rightChildIndex][0] &&
                        this.pq[currentIndex][1] === this.pq[leftChildIndex][1] &&
                        this.pq[currentIndex][1] === this.pq[rightChildIndex][1] &&
                        (this.pq[currentIndex][2] > this.pq[leftChildIndex][2] ||
                        this.pq[currentIndex][2] > this.pq[rightChildIndex][2])
                      ) {
                if (this.pq[leftChildIndex][1] < this.pq[rightChildIndex][1]) {
                    // 우측 노드의 소요시간이 더 길다면, 우선순위가 더 높은것은 좌측임
                    this.swap(leftChildIndex, currentIndex);
                    currentIndex = leftChildIndex;
                    leftChildIndex = currentIndex * 2;
                    rightChildIndex = leftChildIndex + 1;
                } else {
                    this.swap(rightChildIndex, currentIndex);
                    currentIndex = rightChildIndex;
                    leftChildIndex = currentIndex * 2;
                    rightChildIndex = leftChildIndex + 1;
                }
            } else {
                break
            }
        } // while 문 마지막 괄호
        while (rightChildIndex >= this.pq.length && leftChildIndex < this.pq.length) {
            if (this.pq[currentIndex][0] > this.pq[leftChildIndex][0]
               ) {
                    this.swap(leftChildIndex, currentIndex);
                    currentIndex = leftChildIndex;
                    leftChildIndex = currentIndex * 2;
                    rightChildIndex = leftChildIndex + 1;
            } else if (this.pq[currentIndex][0] === this.pq[leftChildIndex][0] &&
                        this.pq[currentIndex][1] > this.pq[leftChildIndex][1]
                      ) {
                    this.swap(leftChildIndex, currentIndex);
                    currentIndex = leftChildIndex;
                    leftChildIndex = currentIndex * 2;
                    rightChildIndex = leftChildIndex + 1;
            } else if (this.pq[currentIndex][0] === this.pq[leftChildIndex][0] &&
                        this.pq[currentIndex][1] === this.pq[leftChildIndex][1] &&
                        this.pq[currentIndex][2] > this.pq[leftChildIndex][2]
                      ) {
                    this.swap(leftChildIndex, currentIndex);
                    currentIndex = leftChildIndex;
                    leftChildIndex = currentIndex * 2;
                    rightChildIndex = leftChildIndex + 1;
            } else {
                break
            }
        }
        return returnValue
    }
    check() {
        return this.pq[1];
    }
    size() {
        return this.pq.length-1;
    }
}

function solution(jobs) {
    let answer = 0;
    const heap = new MinHeap();
    jobs.sort((a, b) => a[0] - b[0]); // 요청 시간 기준 정렬

    let time = 0;
    let jobIndex = 0;
    let completed = 0;
    const totalJobs = jobs.length;

    while (completed < totalJobs) {
        // 현재 시간에 들어온 작업들을 힙에 넣는다
        while (jobIndex < jobs.length && jobs[jobIndex][0] <= time) {
            heap.insert([jobs[jobIndex][1], jobs[jobIndex][0], jobIndex]);
            jobIndex++;
        }

        if (heap.size() > 0) {
            const [duration, requestTime] = heap.popleft();
            time += duration;
            answer += (time - requestTime);
            completed++;
        } else {
            // 힙이 비어있으면, 다음 작업의 요청 시점으로 점프
            time = jobs[jobIndex][0];
        }
    }

    return Math.floor(answer / totalJobs);
}
