function longestBalanced(nums) {
  const n = nums.length;
  const m = n + 1;
  const INF = 1e9;

  class SegTree {
    constructor(size) {
      this.size = size;
      this.minv = new Int32Array(size * 4);
      this.maxv = new Int32Array(size * 4);
      this.lazy = new Int32Array(size * 4);
    }
    apply(node, d) {
      this.minv[node] += d;
      this.maxv[node] += d;
      this.lazy[node] += d;
    }
    push(node) {
      const d = this.lazy[node];
      if (d !== 0) {
        this.apply(node * 2, d);
        this.apply(node * 2 + 1, d);
        this.lazy[node] = 0;
      }
    }
    pull(node) {
      this.minv[node] = Math.min(this.minv[node * 2], this.minv[node * 2 + 1]);
      this.maxv[node] = Math.max(this.maxv[node * 2], this.maxv[node * 2 + 1]);
    }
    rangeAdd(l, r, d) {
      if (l > r) return;
      this._rangeAdd(1, 0, this.size - 1, l, r, d);
    }
    _rangeAdd(node, l, r, ql, qr, d) {
      if (qr < l || r < ql) return;
      if (ql <= l && r <= qr) {
        this.apply(node, d);
        return;
      }
      this.push(node);
      const mid = (l + r) >> 1;
      this._rangeAdd(node * 2, l, mid, ql, qr, d);
      this._rangeAdd(node * 2 + 1, mid + 1, r, ql, qr, d);
      this.pull(node);
    }
    pointQuery(idx) {
      return this._pointQuery(1, 0, this.size - 1, idx);
    }
    _pointQuery(node, l, r, idx) {
      if (l === r) return this.minv[node];
      this.push(node);
      const mid = (l + r) >> 1;
      return idx <= mid
        ? this._pointQuery(node * 2, l, mid, idx)
        : this._pointQuery(node * 2 + 1, mid + 1, r, idx);
    }
    findFirst(l, r, t) {
      if (l > r) return INF;
      return this._findFirst(1, 0, this.size - 1, l, r, t);
    }
    _findFirst(node, l, r, ql, qr, t) {
      if (qr < l || r < ql) return INF;
      if (t < this.minv[node] || t > this.maxv[node]) return INF;
      if (l === r) return l;
      this.push(node);
      const mid = (l + r) >> 1;
      const left = this._findFirst(node * 2, l, mid, ql, qr, t);
      return left !== INF
        ? left
        : this._findFirst(node * 2 + 1, mid + 1, r, ql, qr, t);
    }
  }

  const st = new SegTree(m);
  const last = new Int32Array(100001);
  let ans = 0;

  for (let i = 1; i <= n; i++) {
    const x = nums[i - 1];
    const s = (x & 1) === 0 ? 1 : -1;
    const p = last[x];
    if (p !== 0) st.rangeAdd(p, n, -s);
    st.rangeAdd(i, n, s);
    last[x] = i;
    const v = st.pointQuery(i);
    const j = st.findFirst(0, i - 1, v);
    if (j !== INF) ans = Math.max(ans, i - j);
  }

  return ans;
}
