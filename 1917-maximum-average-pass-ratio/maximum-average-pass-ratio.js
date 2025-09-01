/**
 * @param {number[][]} classes
 * @param {number} extraStudents
 * @return {number}
 */
var maxAverageRatio = function(classes, extraStudents) {
    // Function to calculate the gain if we add one student
    function gain(p, t) {
        return (p + 1) / (t + 1) - p / t;
    }

    // --- Max Heap implementation ---
    class MaxHeap {
        constructor() {
            this.data = [];
        }
        size() {
            return this.data.length;
        }
        push(val) {
            this.data.push(val);
            this._siftUp(this.data.length - 1);
        }
        pop() {
            if (this.data.length === 1) return this.data.pop();
            const top = this.data[0];
            this.data[0] = this.data.pop();
            this._siftDown(0);
            return top;
        }
        _siftUp(i) {
            const { data } = this;
            while (i > 0) {
                let parent = Math.floor((i - 1) / 2);
                if (data[parent][0] >= data[i][0]) break;
                [data[parent], data[i]] = [data[i], data[parent]];
                i = parent;
            }
        }
        _siftDown(i) {
            const { data } = this;
            let n = data.length;
            while (true) {
                let left = 2 * i + 1;
                let right = 2 * i + 2;
                let largest = i;
                if (left < n && data[left][0] > data[largest][0]) largest = left;
                if (right < n && data[right][0] > data[largest][0]) largest = right;
                if (largest === i) break;
                [data[i], data[largest]] = [data[largest], data[i]];
                i = largest;
            }
        }
    }

    // Initialize heap with all classes
    let heap = new MaxHeap();
    for (let [p, t] of classes) {
        heap.push([gain(p, t), p, t]);
    }

    // Assign extra students greedily
    while (extraStudents-- > 0) {
        let [g, p, t] = heap.pop();
        p++;
        t++;
        heap.push([gain(p, t), p, t]);
    }

    // Calculate final average ratio
    let total = 0;
    while (heap.size() > 0) {
        let [g, p, t] = heap.pop();
        total += p / t;
    }

    return total / classes.length;
};
