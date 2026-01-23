var minimumPairRemoval = function(nums) {
  const n = nums.length;
  if (n <= 1) return 0;

  const val = nums.slice();
  const prev = Array(n);
  const next = Array(n);
  const alive = Array(n).fill(true);
  const ver = Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    prev[i] = i - 1;
    next[i] = i + 1 < n ? i + 1 : -1;
  }

  const isViol = (a, b) => a !== -1 && b !== -1 && val[a] > val[b] ? 1 : 0;

  let viol = 0;
  for (let i = 0; i < n - 1; i++) viol += isViol(i, i + 1);
  if (viol === 0) return 0;

  const heap = [];
  const less = (x, y) => x.sum !== y.sum ? x.sum < y.sum : x.key < y.key;

  const push = x => {
    heap.push(x);
    let i = heap.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (!less(heap[i], heap[p])) break;
      [heap[i], heap[p]] = [heap[p], heap[i]];
      i = p;
    }
  };

  const pop = () => {
    if (!heap.length) return null;
    const top = heap[0];
    const last = heap.pop();
    if (heap.length) {
      heap[0] = last;
      let i = 0;
      while (true) {
        let l = i * 2 + 1, r = l + 1, m = i;
        if (l < heap.length && less(heap[l], heap[m])) m = l;
        if (r < heap.length && less(heap[r], heap[m])) m = r;
        if (m === i) break;
        [heap[i], heap[m]] = [heap[m], heap[i]];
        i = m;
      }
    }
    return top;
  };

  for (let i = 0; i < n - 1; i++) {
    push({ sum: val[i] + val[i + 1], key: i, left: i, v: ver[i] });
  }

  let ops = 0;

  while (heap.length) {
    let item = pop();
    while (item) {
      const i = item.left;
      if (!alive[i] || item.v !== ver[i]) { item = pop(); continue; }
      const j = next[i];
      if (j === -1 || !alive[j]) { item = pop(); continue; }
      if (val[i] + val[j] !== item.sum) { item = pop(); continue; }
      break;
    }
    if (!item) break;

    const i = item.left;
    const j = next[i];
    const p = prev[i];
    const k = next[j];

    viol -= isViol(p, i) + isViol(i, j) + isViol(j, k);

    val[i] += val[j];
    alive[j] = false;
    next[i] = k;
    if (k !== -1) prev[k] = i;
    ver[i]++;

    viol += isViol(p, i) + isViol(i, k);
    ops++;

    if (viol === 0) return ops;

    if (k !== -1) push({ sum: val[i] + val[k], key: i, left: i, v: ver[i] });
    if (p !== -1) push({ sum: val[p] + val[i], key: p, left: p, v: ver[p] });
  }

  return ops;
};
