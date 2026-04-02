var maximumAmount = function(coins) {
    const m = coins.length, n = coins[0].length;
    const dp = Array.from({ length: m }, () =>
        Array.from({ length: n }, () => Array(3).fill(-Infinity))
    );

    dp[0][0][0] = coins[0][0];
    if (coins[0][0] < 0) dp[0][0][1] = 0;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            for (let k = 0; k < 3; k++) {
                if (dp[i][j][k] === -Infinity) continue;

                const dirs = [[i + 1, j], [i, j + 1]];
                for (let [ni, nj] of dirs) {
                    if (ni >= m || nj >= n) continue;

                    let val = coins[ni][nj];

                    dp[ni][nj][k] = Math.max(dp[ni][nj][k], dp[i][j][k] + val);

                    if (val < 0 && k < 2) {
                        dp[ni][nj][k + 1] = Math.max(dp[ni][nj][k + 1], dp[i][j][k]);
                    }
                }
            }
        }
    }

    return Math.max(...dp[m - 1][n - 1]);
};