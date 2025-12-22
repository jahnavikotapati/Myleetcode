var minDeletionSize = function (strs) {
  const n = strs.length;
  const m = strs[0].length;
  const dp = new Array(m).fill(1);

  for (let j = 0; j < m; j++) {
    for (let i = 0; i < j; i++) {
      let ok = true;
      for (let r = 0; r < n; r++) {
        if (strs[r][i] > strs[r][j]) {
          ok = false;
          break;
        }
      }
      if (ok) {
        dp[j] = Math.max(dp[j], dp[i] + 1);
      }
    }
  }

  let keep = 0;
  for (let v of dp) keep = Math.max(keep, v);

  return m - keep;
};
