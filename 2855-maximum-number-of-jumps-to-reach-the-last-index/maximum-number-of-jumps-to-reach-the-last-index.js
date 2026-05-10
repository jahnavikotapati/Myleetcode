var maximumJumps = function(nums, target) {
    const n = nums.length;
    const dp = new Array(n).fill(-Infinity);
    dp[0] = 0;

    for (let i = 0; i < n; i++) {
        if (dp[i] === -Infinity) continue;

        for (let j = i + 1; j < n; j++) {
            if (Math.abs(nums[j] - nums[i]) <= target) {
                dp[j] = Math.max(dp[j], dp[i] + 1);
            }
        }
    }

    return dp[n - 1] === -Infinity ? -1 : dp[n - 1];
};