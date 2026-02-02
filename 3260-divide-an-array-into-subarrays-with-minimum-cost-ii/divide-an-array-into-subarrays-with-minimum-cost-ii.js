var minimumCost = (function () {

  class MinMaxHeap3013 {
    constructor(cmp) {
      this.a = [];
      this.cmp = cmp;
      this.del = new Map();
      this.sz = 0;
    }

    push(x) {
      this.a.push(x);
      this._up(this.a.length - 1);
      this.sz++;
    }

    pop() {
      this._clean();
      const res = this.a[0];
      this._swap(0, this.a.length - 1);
      this.a.pop();
      this._down(0);
      this.sz--;
      return res;
    }

    peek() {
      this._clean();
      return this.a[0];
    }

    remove(x) {
      this.del.set(x, (this.del.get(x) || 0) + 1);
      this.sz--;
    }

    _clean() {
      while (this.a.length) {
        const x = this.a[0];
        if (this.del.has(x)) {
          this.del.set(x, this.del.get(x) - 1);
          if (this.del.get(x) === 0) this.del.delete(x);
          this._swap(0, this.a.length - 1);
          this.a.pop();
          this._down(0);
        } else break;
      }
    }

    _up(i) {
      while (i > 0) {
        const p = (i - 1) >> 1;
        if (this.cmp(this.a[i], this.a[p])) {
          this._swap(i, p);
          i = p;
        } else break;
      }
    }

    _down(i) {
      while (true) {
        let b = i;
        const l = i * 2 + 1;
        const r = i * 2 + 2;
        if (l < this.a.length && this.cmp(this.a[l], this.a[b])) b = l;
        if (r < this.a.length && this.cmp(this.a[r], this.a[b])) b = r;
        if (b !== i) {
          this._swap(i, b);
          i = b;
        } else break;
      }
    }

    _swap(i, j) {
      [this.a[i], this.a[j]] = [this.a[j], this.a[i]];
    }
  }

  return function (nums, k, dist) {
    const n = nums.length;
    const need = k - 2;

    const small = new MinMaxHeap3013((a, b) => a > b); // maxHeap
    const large = new MinMaxHeap3013((a, b) => a < b); // minHeap

    let sum = 0;
    let ans = Infinity;

    // initial window
    for (let i = 2; i <= Math.min(dist + 1, n - 1); i++) {
      small.push(nums[i]);
      sum += nums[i];
    }

    while (small.sz > need) {
      const x = small.pop();
      sum -= x;
      large.push(x);
    }

    for (let i = 1; i <= n - 2; i++) {
      if (small.sz === need) {
        ans = Math.min(ans, nums[0] + nums[i] + sum);
      }

      // remove outgoing
      const out = nums[i + 1];
      if (small.sz && out <= small.peek()) {
        small.remove(out);
        sum -= out;
      } else {
        large.remove(out);
      }

      // add incoming
      const inIdx = i + dist + 1;
      if (inIdx < n) {
        const x = nums[inIdx];
        if (small.sz && x <= small.peek()) {
          small.push(x);
          sum += x;
        } else {
          large.push(x);
        }
      }

      // rebalance
      while (small.sz < need && large.sz) {
        const x = large.pop();
        small.push(x);
        sum += x;
      }
      while (small.sz > need) {
        const x = small.pop();
        sum -= x;
        large.push(x);
      }
    }

    return ans;
  };
})();
