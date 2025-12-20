var minDeletionSize = function (strs) {
  const rows = strs.length;
  const cols = strs[0].length;
  let ans = 0;

  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows - 1; r++) {
      if (strs[r][c] > strs[r + 1][c]) {
        ans++;
        break;
      }
    }
  }

  return ans;
};
