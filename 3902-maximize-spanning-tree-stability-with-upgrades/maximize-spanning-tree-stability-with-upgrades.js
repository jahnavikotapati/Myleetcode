function maxStability(n, edges, k) {
  class DSU {
    constructor(n) {
      this.p = Array.from({ length: n }, (_, i) => i);
      this.r = Array(n).fill(0);
      this.c = n;
    }
    find(x) {
      while (this.p[x] !== x) {
        this.p[x] = this.p[this.p[x]];
        x = this.p[x];
      }
      return x;
    }
    union(a, b) {
      a = this.find(a);
      b = this.find(b);
      if (a === b) return false;
      if (this.r[a] < this.r[b]) [a, b] = [b, a];
      this.p[b] = a;
      if (this.r[a] === this.r[b]) this.r[a]++;
      this.c--;
      return true;
    }
  }

  const base = new DSU(n);
  let mustCount = 0;

  for (const [u, v, s, must] of edges) {
    if (must === 1) {
      mustCount++;
      if (!base.union(u, v)) return -1;
    }
  }

  if (mustCount > n - 1) return -1;

  const can = (x) => {
    const dsu = new DSU(n);

    for (const [u, v, s, must] of edges) {
      if (must === 1) {
        if (s < x) return false;
        dsu.union(u, v);
      }
    }

    for (const [u, v, s, must] of edges) {
      if (must === 0 && s >= x) dsu.union(u, v);
    }

    let usedUpgrades = 0;

    for (const [u, v, s, must] of edges) {
      if (must === 0 && s < x && s * 2 >= x) {
        if (dsu.union(u, v)) {
          usedUpgrades++;
          if (usedUpgrades > k) return false;
        }
      }
    }

    return dsu.c === 1;
  };

  let lo = 1, hi = 200000, ans = -1;

  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (can(mid)) {
      ans = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }

  return ans;
}