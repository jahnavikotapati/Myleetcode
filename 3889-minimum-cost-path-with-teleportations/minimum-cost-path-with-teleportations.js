/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number}
 */
function minCost(grid, k) {
  const m = grid.length, n = grid[0].length;
  const N = m * n;
  const INF = 1e30;

  // Flatten grid values for speed
  const val = new Array(N);
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      val[i * n + j] = grid[i][j];
    }
  }

  // Base layer: dp with 0 teleports (only right/down)
  let dpPrev = new Array(N).fill(INF);
  dpPrev[0] = 0; // starting cost excludes grid[0][0]

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const idx = i * n + j;
      if (idx === 0) continue;
      let best = INF;
      if (i > 0) best = Math.min(best, dpPrev[idx - n]);
      if (j > 0) best = Math.min(best, dpPrev[idx - 1]);
      dpPrev[idx] = best + val[idx];
    }
  }

  let ans = dpPrev[N - 1];

  // Binary search: first index with arr[pos] >= x
  function lowerBound(arr, x) {
    let lo = 0, hi = arr.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (arr[mid] >= x) hi = mid;
      else lo = mid + 1;
    }
    return lo;
  }

  for (let t = 1; t <= k; t++) {
    // Build map: value -> min dpPrev among cells with that value
    const map = new Map();
    for (let idx = 0; idx < N; idx++) {
      const cost = dpPrev[idx];
      if (cost >= INF) continue;
      const v = val[idx];
      const cur = map.get(v);
      if (cur === undefined || cost < cur) map.set(v, cost);
    }

    // If nothing reachable, no point continuing
    if (map.size === 0) break;

    const values = Array.from(map.keys()).sort((a, b) => a - b);
    const sufMin = new Array(values.length);

    // suffix min over dpPrev grouped by value, from high to low
    let running = INF;
    for (let i = values.length - 1; i >= 0; i--) {
      running = Math.min(running, map.get(values[i]));
      sufMin[i] = running;
    }

    // Init dpCur with teleport candidates (using exactly one more teleport from dpPrev)
    const dpCur = new Array(N).fill(INF);
    for (let idx = 0; idx < N; idx++) {
      const v = val[idx];
      const pos = lowerBound(values, v); // first value >= v
      if (pos < values.length) dpCur[idx] = sufMin[pos];
    }

    // Then relax using normal moves inside this layer (right/down)
    dpCur[0] = Math.min(dpCur[0], 0); // start always reachable with cost 0
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        const idx = i * n + j;
        if (idx === 0) continue;

        let best = dpCur[idx];
        if (i > 0) best = Math.min(best, dpCur[idx - n] + val[idx]);
        if (j > 0) best = Math.min(best, dpCur[idx - 1] + val[idx]);
        dpCur[idx] = best;
      }
    }

    dpPrev = dpCur;
    ans = Math.min(ans, dpPrev[N - 1]);
  }

  return ans;
}
