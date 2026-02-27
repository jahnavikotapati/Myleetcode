var minOperations = function (s, k) {
  const n = s.length;
  let z0 = 0;
  for (let c of s) if (c === '0') z0++;

  if (z0 === 0) return 0;

  if (k === n) {
    if (z0 === n) return 1;
    return -1;
  }

  const SENT = n + 2;
  const parentEven = new Int32Array(n + 3);
  const parentOdd = new Int32Array(n + 3);
  for (let i = 0; i <= n + 2; i++) {
    parentEven[i] = i;
    parentOdd[i] = i;
  }

  function find(parent, x) {
    let r = x;
    while (r <= n && parent[r] !== r) r = parent[r];
    while (x <= n && parent[x] !== x) {
      const p = parent[x];
      parent[x] = r;
      x = p;
    }
    return r <= n ? r : SENT;
  }

  function remove(parent, x) {
    parent[x] = find(parent, x + 2);
  }

  const dist = new Int32Array(n + 1);
  dist.fill(-1);
  const q = new Int32Array(n + 1);
  let h = 0, t = 0;

  dist[z0] = 0;
  q[t++] = z0;
  if ((z0 & 1) === 0) remove(parentEven, z0);
  else remove(parentOdd, z0);

  while (h < t) {
    const z = q[h++];
    const d = dist[z];

    const L = Math.max(0, z + k - n);
    const U = Math.min(k, z);
    const lo = z + k - 2 * U;
    const hi = z + k - 2 * L;

    const parent = ((z + k) & 1) === 0 ? parentEven : parentOdd;
    let start = lo;
    if ((start & 1) !== ((z + k) & 1)) start++;

    for (let x = find(parent, start); x <= hi; x = find(parent, x)) {
      dist[x] = d + 1;
      if (x === 0) return dist[x];
      q[t++] = x;
      remove(parent, x);
    }
  }

  return -1;
};