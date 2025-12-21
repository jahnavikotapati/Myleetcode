var minDeletionSize = function (strs) {
  const n = strs.length;
  const m = strs[0].length;
  const ok = new Array(n - 1).fill(false);
  let res = 0;

  for (let c = 0; c < m; c++) {
    let bad = false;

    for (let i = 0; i < n - 1; i++) {
      if (!ok[i] && strs[i][c] > strs[i + 1][c]) {
        bad = true;
        break;
      }
    }

    if (bad) {
      res++;
      continue;
    }

    for (let i = 0; i < n - 1; i++) {
      if (!ok[i] && strs[i][c] < strs[i + 1][c]) {
        ok[i] = true;
      }
    }
  }

  return res;
};
