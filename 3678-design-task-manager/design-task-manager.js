class TaskManager {
  constructor(tasks) {
    this.taskMap = new Map();
    this.heap = [];
    for (let [u, t, p] of tasks) this.add(u, t, p);
  }

  add(userId, taskId, priority) {
    this.taskMap.set(taskId, [userId, priority]);
    this.heap.push([priority, taskId]);
    this._heapifyUp(this.heap.length - 1);
  }

  edit(taskId, newPriority) {
    if (!this.taskMap.has(taskId)) return;
    let [u] = this.taskMap.get(taskId);
    this.taskMap.set(taskId, [u, newPriority]);
    this.heap.push([newPriority, taskId]);
    this._heapifyUp(this.heap.length - 1);
  }

  rmv(taskId) {
    this.taskMap.delete(taskId);
  }

  execTop() {
    while (this.heap.length) {
      let [p, t] = this.heap[0];
      this._popHeap();
      if (this.taskMap.has(t) && this.taskMap.get(t)[1] === p) {
        let [u] = this.taskMap.get(t);
        this.taskMap.delete(t);
        return u;
      }
    }
    return -1;
  }

  _heapifyUp(i) {
    while (i > 0) {
      let p = Math.floor((i - 1) / 2);
      if (this._compare(this.heap[i], this.heap[p]) > 0) {
        [this.heap[i], this.heap[p]] = [this.heap[p], this.heap[i]];
        i = p;
      } else break;
    }
  }

  _popHeap() {
    let last = this.heap.pop();
    if (!this.heap.length) return last;
    let top = this.heap[0];
    this.heap[0] = last;
    this._heapifyDown(0);
    return top;
  }

  _heapifyDown(i) {
    let n = this.heap.length;
    while (true) {
      let l = 2 * i + 1, r = 2 * i + 2, largest = i;
      if (l < n && this._compare(this.heap[l], this.heap[largest]) > 0) largest = l;
      if (r < n && this._compare(this.heap[r], this.heap[largest]) > 0) largest = r;
      if (largest !== i) {
        [this.heap[i], this.heap[largest]] = [this.heap[largest], this.heap[i]];
        i = largest;
      } else break;
    }
  }

  _compare(a, b) {
    if (a[0] === b[0]) return a[1] - b[1];
    return a[0] - b[0];
  }
}
