var minCost = function(n, edges) {
  const g = Array.from({ length: n }, () => []);

  for (const [u, v, w] of edges) {
    g[u].push([v, w]);
    g[v].push([u, 2 * w]);
  }

  const dist = Array(n).fill(Infinity);
  dist[0] = 0;

  class MinHeap {
    constructor() { this.h = []; }
    push(x) {
      this.h.push(x);
      this._up(this.h.length - 1);
    }
    pop() {
      if (!this.h.length) return null;
      const r = this.h[0];
      const x = this.h.pop();
      if (this.h.length) {
        this.h[0] = x;
        this._down(0);
      }
      return r;
    }
    _up(i) {
      while (i) {
        const p = (i - 1) >> 1;
        if (this.h[p][0] <= this.h[i][0]) break;
        [this.h[p], this.h[i]] = [this.h[i], this.h[p]];
        i = p;
      }
    }
    _down(i) {
      const n = this.h.length;
      while (true) {
        let m = i, l = i * 2 + 1, r = l + 1;
        if (l < n && this.h[l][0] < this.h[m][0]) m = l;
        if (r < n && this.h[r][0] < this.h[m][0]) m = r;
        if (m === i) break;
        [this.h[m], this.h[i]] = [this.h[i], this.h[m]];
        i = m;
      }
    }
  }

  const pq = new MinHeap();
  pq.push([0, 0]);

  while (pq.h.length) {
    const [d, u] = pq.pop();
    if (d > dist[u]) continue;
    if (u === n - 1) return d;

    for (const [v, w] of g[u]) {
      if (dist[v] > d + w) {
        dist[v] = d + w;
        pq.push([dist[v], v]);
      }
    }
  }

  return -1;
};
