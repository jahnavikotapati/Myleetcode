var maximumTotalDamage = function(power) {
    const map = new Map()
    for (const p of power) map.set(p, (map.get(p) || 0) + p)
    const vals = Array.from(map.keys()).sort((a, b) => a - b)
    const n = vals.length
    const dp = new Array(n).fill(0)
    dp[0] = map.get(vals[0])
    for (let i = 1; i < n; i++) {
        let j = i - 1
        while (j >= 0 && vals[i] - vals[j] <= 2) j--
        dp[i] = Math.max(dp[i - 1], map.get(vals[i]) + (j >= 0 ? dp[j] : 0))
    }
    return dp[n - 1]
}
