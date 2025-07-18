class MinHeap {
    constructor() { this.heap = []; }
    push(val) {
        this.heap.push(val);
        let i = this.heap.length - 1;
        while (i > 0) {
            let p = Math.floor((i - 1) / 2);
            if (this.heap[p] <= this.heap[i]) break;
            [this.heap[i], this.heap[p]] = [this.heap[p], this.heap[i]];
            i = p;
        }
    }
    pop() {
        const top = this.heap[0];
        const last = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = last;
            let i = 0;
            while (true) {
                let l = 2 * i + 1, r = 2 * i + 2, smallest = i;
                if (l < this.heap.length && this.heap[l] < this.heap[smallest]) smallest = l;
                if (r < this.heap.length && this.heap[r] < this.heap[smallest]) smallest = r;
                if (smallest === i) break;
                [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
                i = smallest;
            }
        }
        return top;
    }
    size() { return this.heap.length; }
    top() { return this.heap[0]; }
}

class MaxHeap {
    constructor() { this.heap = new MinHeap(); }
    push(val) { this.heap.push(-val); }
    pop() { return -this.heap.pop(); }
    size() { return this.heap.size(); }
    top() { return -this.heap.top(); }
}

var minimumDifference = function(nums) {
    const n = nums.length / 3;

    // LEFT: max heap for n smallest prefix sums
    const maxHeap = new MaxHeap();
    let leftSum = 0;
    const left = Array(nums.length).fill(0);
    for (let i = 0; i < 2 * n; i++) {
        maxHeap.push(nums[i]);
        leftSum += nums[i];
        if (maxHeap.size() > n) {
            leftSum -= maxHeap.pop();
        }
        if (maxHeap.size() === n) {
            left[i] = leftSum;
        }
    }

    // RIGHT: min heap for n largest suffix sums
    const minHeap = new MinHeap();
    let rightSum = 0;
    const right = Array(nums.length).fill(0);
    for (let i = nums.length - 1; i >= n; i--) {
        minHeap.push(nums[i]);
        rightSum += nums[i];
        if (minHeap.size() > n) {
            rightSum -= minHeap.pop();
        }
        if (minHeap.size() === n) {
            right[i] = rightSum;
        }
    }

    let ans = Infinity;
    for (let i = n - 1; i < 2 * n; i++) {
        ans = Math.min(ans, left[i] - right[i + 1]);
    }

    return ans;
};
