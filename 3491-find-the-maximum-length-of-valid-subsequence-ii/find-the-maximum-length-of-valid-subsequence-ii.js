function maximumLength(nums, k) {
  const n = nums.length;
  const dp = Array(n).fill(0).map(() => new Map());
  let maxLen = 1;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      const mod = (nums[j] + nums[i]) % k;

      const prevLen = dp[j].get(mod) || 1; 
      const newLen = prevLen + 1;

      const currentLen = dp[i].get(mod) || 0;
      if (newLen > currentLen) {
        dp[i].set(mod, newLen);
        maxLen = Math.max(maxLen, newLen);
      }
    }
  }

  return maxLen;
}
