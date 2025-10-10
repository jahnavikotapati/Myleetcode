var maximumEnergy = function(energy, k) {
    let n = energy.length
    let dp = Array(n).fill(0)
    let ans = -Infinity
    for (let i = n - 1; i >= 0; i--) {
        dp[i] = energy[i]
        if (i + k < n) dp[i] += dp[i + k]
        ans = Math.max(ans, dp[i])
    }
    return ans
};
