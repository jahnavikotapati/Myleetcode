var maxPathScore = function(grid, k) {
    const m = grid.length;
    const n = grid[0].length;

    // dp[i][j][c]
    const dp = Array.from({ length: m }, () =>
        Array.from({ length: n }, () =>
            Array(k + 1).fill(-Infinity)
        )
    );

    dp[0][0][0] = 0;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {

            for (let c = 0; c <= k; c++) {

                if (i === 0 && j === 0) continue;

                const cost = grid[i][j] === 0 ? 0 : 1;
                const score = grid[i][j];

                if (c - cost < 0) continue;

                let best = -Infinity;

                if (i > 0 && dp[i - 1][j][c - cost] !== -Infinity) {
                    best = Math.max(best, dp[i - 1][j][c - cost] + score);
                }

                if (j > 0 && dp[i][j - 1][c - cost] !== -Infinity) {
                    best = Math.max(best, dp[i][j - 1][c - cost] + score);
                }

                dp[i][j][c] = best;
            }
        }
    }

    let ans = Math.max(...dp[m - 1][n - 1]);

    return ans === -Infinity ? -1 : ans;
};