var trapRainWater = function(heightMap) {
    class MinHeap {
        constructor() { this.heap = []; }
        push(val) {
            this.heap.push(val);
            this._bubbleUp(this.heap.length - 1);
        }
        pop() {
            if (this.heap.length === 1) return this.heap.pop();
            const top = this.heap[0];
            this.heap[0] = this.heap.pop();
            this._bubbleDown(0);
            return top;
        }
        isEmpty() { return this.heap.length === 0; }
        _bubbleUp(i) {
            while (i > 0) {
                let p = Math.floor((i - 1) / 2);
                if (this.heap[p][0] <= this.heap[i][0]) break;
                [this.heap[p], this.heap[i]] = [this.heap[i], this.heap[p]];
                i = p;
            }
        }
        _bubbleDown(i) {
            let n = this.heap.length;
            while (true) {
                let l = 2 * i + 1, r = 2 * i + 2, s = i;
                if (l < n && this.heap[l][0] < this.heap[s][0]) s = l;
                if (r < n && this.heap[r][0] < this.heap[s][0]) s = r;
                if (s === i) break;
                [this.heap[i], this.heap[s]] = [this.heap[s], this.heap[i]];
                i = s;
            }
        }
    }

    let m = heightMap.length, n = heightMap[0].length;
    if (m < 3 || n < 3) return 0;
    let heap = new MinHeap();
    let visited = Array.from({length: m}, () => Array(n).fill(false));

    for (let i = 0; i < m; i++) {
        heap.push([heightMap[i][0], i, 0]);
        heap.push([heightMap[i][n-1], i, n-1]);
        visited[i][0] = visited[i][n-1] = true;
    }
    for (let j = 1; j < n-1; j++) {
        heap.push([heightMap[0][j], 0, j]);
        heap.push([heightMap[m-1][j], m-1, j]);
        visited[0][j] = visited[m-1][j] = true;
    }

    let dirs = [[1,0],[-1,0],[0,1],[0,-1]];
    let res = 0, maxH = 0;
    while (!heap.isEmpty()) {
        let [h, i, j] = heap.pop();
        maxH = Math.max(maxH, h);
        for (let [dx, dy] of dirs) {
            let x = i + dx, y = j + dy;
            if (x >= 0 && y >= 0 && x < m && y < n && !visited[x][y]) {
                visited[x][y] = true;
                if (heightMap[x][y] < maxH) res += maxH - heightMap[x][y];
                heap.push([heightMap[x][y], x, y]);
            }
        }
    }
    return res;
};
