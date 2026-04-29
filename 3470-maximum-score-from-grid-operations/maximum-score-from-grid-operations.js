var maximumScore = function(grid) {
    const n = grid.length;
    const NEG = -1e30;

    const pref = Array.from({ length: n }, () => Array(n + 1).fill(0));

    for (let c = 0; c < n; c++) {
        for (let r = 0; r < n; r++) {
            pref[c][r + 1] = pref[c][r] + grid[r][c];
        }
    }

    const sum = (col, from, to) => {
        if (to <= from) return 0;
        return pref[col][to] - pref[col][from];
    };

    let dp = Array.from({ length: n + 1 }, () => Array(n + 1).fill(NEG));

    // left boundary height = 0, current column height can be anything
    for (let h = 0; h <= n; h++) {
        dp[0][h] = 0;
    }

    for (let col = 0; col < n; col++) {
        const ndp = Array.from({ length: n + 1 }, () => Array(n + 1).fill(NEG));

        for (let mid = 0; mid <= n; mid++) {
            const prefixMax = Array(n + 1).fill(NEG);
            let best = NEG;

            for (let left = 0; left <= n; left++) {
                best = Math.max(best, dp[left][mid]);
                prefixMax[left] = best;
            }

            const suffixMax = Array(n + 1).fill(NEG);
            best = NEG;

            for (let left = n; left >= 0; left--) {
                suffixMax[left] = best;
                best = Math.max(
                    best,
                    dp[left][mid] + sum(col, mid, left)
                );
            }

            const maxRight = col === n - 1 ? 0 : n;

            for (let right = 0; right <= maxRight; right++) {
                const option1 = prefixMax[right] + sum(col, mid, right);
                const option2 = suffixMax[right];

                ndp[mid][right] = Math.max(option1, option2);
            }
        }

        dp = ndp;
    }

    let ans = 0;

    for (let left = 0; left <= n; left++) {
        for (let mid = 0; mid <= n; mid++) {
            ans = Math.max(ans, dp[left][mid]);
        }
    }

    return ans;
};