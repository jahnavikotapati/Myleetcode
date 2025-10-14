function hasIncreasingSubarrays(nums, k) {
  const n = nums.length;
  const good = new Array(n).fill(false);
  for (let i = 0; i <= n - k; i++) {
    let ok = true;
    for (let j = 0; j < k - 1; j++) {
      if (!(nums[i + j] < nums[i + j + 1])) { ok = false; break; }
    }
    good[i] = ok;
  }
  for (let i = 0; i <= n - 2 * k; i++) {
    if (good[i] && good[i + k]) return true;
  }
  return false;
}
