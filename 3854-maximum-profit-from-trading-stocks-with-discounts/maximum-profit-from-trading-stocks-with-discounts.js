/**
 * @param {number} n
 * @param {number[]} present
 * @param {number[]} future
 * @param {number[][]} hierarchy
 * @param {number} budget
 * @return {number}
 */
var maxProfit = function (n, present, future, hierarchy, budget) {
  const children = Array.from({ length: n }, () => []);
  for (const [u, v] of hierarchy) {
    children[u - 1].push(v - 1);
  }

  const NEG = -1e15;

  function knapMerge(a, b) {
    const res = Array(budget + 1).fill(NEG);
    for (let i = 0; i <= budget; i++) {
      if (a[i] <= NEG / 2) continue;
      for (let j = 0; i + j <= budget; j++) {
        if (b[j] <= NEG / 2) continue;
        res[i + j] = Math.max(res[i + j], a[i] + b[j]);
      }
    }
    return res;
  }

  function dfs(u) {
    // base0: u not bought -> children use their dp0
    // base1: u bought     -> children use their dp1
    let base0 = Array(budget + 1).fill(NEG);
    let base1 = Array(budget + 1).fill(NEG);
    base0[0] = 0;
    base1[0] = 0;

    for (const v of children[u]) {
      const [child0, child1] = dfs(v);
      base0 = knapMerge(base0, child0);
      base1 = knapMerge(base1, child1);
    }

    const dp0 = base0.slice(); // parent didn't buy u, and u doesn't buy
    const dp1 = base0.slice(); // parent bought u, and u doesn't buy

    const fullCost = present[u];
    const halfCost = Math.floor(present[u] / 2);

    const fullProfit = future[u] - fullCost;
    const halfProfit = future[u] - halfCost;

    // If u buys, children must come from base1
    for (let b = 0; b + fullCost <= budget; b++) {
      if (base1[b] <= NEG / 2) continue;
      dp0[b + fullCost] = Math.max(dp0[b + fullCost], base1[b] + fullProfit);
    }

    for (let b = 0; b + halfCost <= budget; b++) {
      if (base1[b] <= NEG / 2) continue;
      dp1[b + halfCost] = Math.max(dp1[b + halfCost], base1[b] + halfProfit);
    }

    return [dp0, dp1];
  }

  const [rootDp0] = dfs(0);
  let ans = 0;
  for (let b = 0; b <= budget; b++) ans = Math.max(ans, rootDp0[b]);
  return ans;
};
