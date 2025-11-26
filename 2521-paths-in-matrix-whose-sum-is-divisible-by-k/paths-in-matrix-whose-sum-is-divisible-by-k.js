var numberOfPaths = function(grid, k) {
    const m = grid.length, n = grid[0].length, MOD = 1000000007;
    let dp = Array.from({ length: n }, () => Array(k).fill(0));
    for (let i = 0; i < m; i++) {
        const newRow = Array.from({ length: n }, () => Array(k).fill(0));
        for (let j = 0; j < n; j++) {
            if (i === 0 && j === 0) {
                newRow[0][grid[0][0] % k] = 1;
                continue;
            }
            if (i > 0) {
                for (let r = 0; r < k; r++) {
                    const ways = dp[j][r];
                    if (ways === 0) continue;
                    const nr = (r + grid[i][j]) % k;
                    newRow[j][nr] = (newRow[j][nr] + ways) % MOD;
                }
            }
            if (j > 0) {
                for (let r = 0; r < k; r++) {
                    const ways = newRow[j - 1][r];
                    if (ways === 0) continue;
                    const nr = (r + grid[i][j]) % k;
                    newRow[j][nr] = (newRow[j][nr] + ways) % MOD;
                }
            }
        }
        dp = newRow;
    }
    return dp[n - 1][0];
};
